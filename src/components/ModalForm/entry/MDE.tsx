import flat from "flat";
import dynamic from "next/dynamic";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import _ from "lodash";
import ReactDOMServer from "react-dom/server";
import { MyMarkDown } from "../../MyMarkdown";
import "easymde/dist/easymde.min.css";
import { EntryProps, MarkdownEntry } from "../types";
import fm from "front-matter";
import Custom from "./Custom";
import FocusTrap from "focus-trap-react";
import EasyMDE from "easymde";
import Image from "next/image";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const validFrontmatter = ["course.code", "status", "course.section"];

const FrontMatter = ({ attributes }: { attributes?: unknown }) => {
  const flattened = flat.flatten(attributes);
  return _.isEqual(attributes, {}) ? (
    <></>
  ) : (
    <div className="flex flex-row space-x-2 mb-4">
      {Object.keys(flattened)
        .filter((a) => validFrontmatter.includes(a))
        .map((a ,index) => {
          return (
            <div
            key={index }
              className={`flex rounded bg-blue-500 select-none overflow-hidden frontmatter-badge-${a.replace(
                ".",
                "-"
              )}`}
            >
              <div className="px-1 text-2xs text-white font-bold">{a}</div>
              <div className="px-1 text-2xs text-white bg-white/20">
                {flattened[a]}
              </div>
            </div>
          );
        })}
    </div>
  );
};

const MDE = memo(
  ({
    text: _text,
    onChange,
    onFocus,
    mdeRef,
  }: {
    text: string;
    onChange: (text: string) => void;
    onFocus: () => void;
    mdeRef: React.MutableRefObject<EasyMDE>;
  }) => {
    // const handleToggle = (e: MouseEvent) => {
    //   console.log("toggle", previewBtnRef.current, scrollerElRef.current);
    //   previewBtnRef.current.classList.contains("active")
    //     ? scrollerElRef.current.classList.add("opacity-0")
    //     : scrollerElRef.current.classList.remove("opacity-0");
    // };

    // const previewBtnRef = useRef<HTMLButtonElement>(null);
    // const scrollerElRef = useRef<HTMLDivElement>(null);
    // useLayoutEffect(() => {
    //   setTimeout(() => {
    //     previewBtnRef.current = document.querySelector("button.preview");
    //     previewBtnRef.current?.addEventListener("click", handleToggle);
    //   }, 2000);
    //   return () => {
    //     previewBtnRef.current?.removeEventListener("click", handleToggle);
    //   };
    // }, []);
    return (
      <div>
        <SimpleMDE
          onChange={onChange}
          onFocus={onFocus}
          options={{
            spellChecker: false,
            autofocus: false,
            initialValue: _text,
            // showIcons: ["undo"],
            // side by side has low render performance so disable it
            hideIcons: ["fullscreen", "side-by-side"],
            sideBySideFullscreen: false,
            indentWithTabs: false,
            status: false,
            maxHeight: "500px",
            renderingConfig: {},
            previewRender: () => {
              return ReactDOMServer.renderToString(
                <MyMarkDown text={mdeRef.current.codemirror.getValue()} />
              );
            },
          }}
          getMdeInstance={(instance) => {
            mdeRef.current = instance;
            // scrollerElRef.current =
            //   mdeRef.current.codemirror.getScrollerElement() as HTMLDivElement;
          }}
        />
      </div>
    );
  },
  () => true
);

function Component<T>(props: EntryProps<T>) {
  const [focusTrapActive, setFocusTrapActive] = useState(false);
  const mdeRef = useRef<EasyMDE>();
  const entry = props.entry as MarkdownEntry<T>;
  useEffect(() => {
    if (focusTrapActive) {
      const handleTab = (event: KeyboardEvent) => {
        if (event.key === "Tab" && focusTrapActive) {
          console.log("active");
          // event.stopImmediatePropagation();
          mdeRef.current.codemirror.execCommand("insertSoftTab");
          // mdeRef.current.codemirror.execCommand("indentLess");
        }
      };
      window.addEventListener("keydown", handleTab);
      return () => window.removeEventListener("keydown", handleTab);
    }
  }, [mdeRef.current, focusTrapActive]);

  if (entry.type != "markdown") return <></>;

  return (
    <Custom
      {...props}
      entry={{
        ...entry,
        node: (onChange, data, formData) => {
          const getBadge = () => {
            try {
              return fm(data).attributes;
            } catch (error) {
              return {};
            }
          };
          return window && window.navigator ? (
            <>
              <FocusTrap
                active={focusTrapActive}
                focusTrapOptions={{
                  allowOutsideClick: (e) => {
                    setFocusTrapActive(false);
                    return true;
                  },
                  clickOutsideDeactivates: false,
                }}
              >
                <div>
                  <FrontMatter attributes={getBadge()}></FrontMatter>
                  <MDE
                    mdeRef={mdeRef}
                    text={data}
                    onChange={onChange}
                    onFocus={() => {
                      setFocusTrapActive(true);
                    }}
                  />
                  <a
                    className="markdown-support"
                    title="Markdown Basic"
                    onClick={() => {
                      window.open(
                        "https://www.markdownguide.org/basic-syntax/"
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      strokeWidth={2}
                    >
                      <path d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z" />
                    </svg>
                    <p>Styling with Markdown is supported</p>
                  </a>
                </div>
              </FocusTrap>
            </>
          ) : (
            <></>
          );
        },
      }}
    ></Custom>
  );
};

export default Component;
