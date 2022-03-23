import flat from "flat";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef } from "react";
import _ from "lodash";
import ReactDOMServer from "react-dom/server";
import { MyMarkDown } from "../../../pages/messages";
import "easymde/dist/easymde.min.css";
import { EntryProps } from "../types";
import fm from "front-matter";
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
  }: {
    text: string;
    onChange: (text: string) => void;
  }) => {
    const mdeRef = useRef<EasyMDE>();
    useEffect(() => {
      const handleTab = (event: KeyboardEvent) => {
        if (
          event.key === "Tab" &&
          mdeRef.current.codemirror
            .getWrapperElement()
            .contains(document.activeElement)
        ) {
          event.stopImmediatePropagation();
          mdeRef.current.codemirror.execCommand("insertSoftTab");
          mdeRef.current.codemirror.execCommand("indentLess");
        }
      };
      window.addEventListener("keydown", handleTab);
      return () => window.removeEventListener("keydown", handleTab);
    }, [mdeRef.current]);
    return (
      <>
        <SimpleMDE
          onChange={onChange}
          options={{
            spellChecker: false,
            autofocus: true,
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
      </>
    );
  },
  () => true
);

const component = ({
  zIndex,
  id,
  entry,
  sectionId,
  data,
  onChange,
}: EntryProps) => {
  const getBadge = () => {
    try {
      return fm(data[sectionId][id] as string).attributes;
    } catch (error) {
      return {};
    }
  };
  return (
    <div>
      {window && window.navigator && (
        <>
          <FrontMatter attributes={getBadge()}></FrontMatter>
          <MDE text={data[sectionId][id] as string} onChange={onChange} />
        </>
      )}
    </div>
  );
};

export default component;
