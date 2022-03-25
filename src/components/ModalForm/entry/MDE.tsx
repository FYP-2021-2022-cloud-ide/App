import flat from "flat";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef, useState } from "react";
import _ from "lodash";
import ReactDOMServer from "react-dom/server";
import { MyMarkDown } from "../../MyMarkdown";
import "easymde/dist/easymde.min.css";
import { EntryProps, MarkdownEntry } from "../types";
import fm from "front-matter";
import Custom from "./Custom";
import FocusTrap from "focus-trap-react";
import EasyMDE from "easymde";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// import SimpleMDE from "react-simplemde-editor";

const validFrontmatter = ["course.code", "status", "course.section"];

const FrontMatter = ({ attributes }: { attributes?: unknown }) => {
  const flattened = flat.flatten(attributes);
  return _.isEqual(attributes, {}) ? (
    <></>
  ) : (
    <div className="flex flex-row space-x-2 mb-4">
      {Object.keys(flattened)
        .filter((a) => validFrontmatter.includes(a))
        .map((a) => {
          return (
            <div
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
            hideIcons: ["fullscreen"],
            sideBySideFullscreen: false,
            indentWithTabs: false,
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
          }}
        />
      </div>
    );
  },
  () => true
);

const component = (props: EntryProps) => {
  const [focusTrapActive, setFocusTrapActive] = useState(false);
  const mdeRef = useRef<EasyMDE>();
  const entry = props.entry as MarkdownEntry;
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

export default component;
