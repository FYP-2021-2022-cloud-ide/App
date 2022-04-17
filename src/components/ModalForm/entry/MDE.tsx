import flat from "flat";
import dynamic from "next/dynamic";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import ReactDOMServer from "react-dom/server";
import { MyMarkDown } from "../../MyMarkdown";
import "easymde/dist/easymde.min.css";
import { EntryProps, MarkdownEntry } from "../types";
import fm from "front-matter";
import Custom from "./Custom";
import FocusTrap from "focus-trap-react";
import EasyMDE from "easymde";
import { useModalForm } from "../modalFormContext";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const MarkdownSupported = () => {
  return (
    <a
      className="markdown-support"
      title="Markdown Basic"
      onClick={() => {
        window.open("https://www.markdownguide.org/basic-syntax/");
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
    const options = useMemo(() => {
      return {
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
      };
    }, []);
    return (
      <div>
        <SimpleMDE
          onChange={onChange}
          onFocus={onFocus}
          options={options}
          getMdeInstance={(instance) => {
            mdeRef.current = instance;
          }}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.onChange == nextProps.onChange;
  }
);

function Component(props: EntryProps) {
  const [focusTrapActive, setFocusTrapActive] = useState(false);
  const mdeRef = useRef<EasyMDE>();
  const { data, formStructure, changeData } = useModalForm();
  const { sectionId, id } = props;
  const entry = formStructure[sectionId].entries[id] as MarkdownEntry;
  useEffect(() => {
    if (focusTrapActive) {
      const handleTab = (event: KeyboardEvent) => {
        if (event.key === "Tab" && focusTrapActive) {
          // event.stopImmediatePropagation();
          mdeRef.current.codemirror.execCommand("insertSoftTab");
          // mdeRef.current.codemirror.execCommand("indentLess");
        }
      };
      window.addEventListener("keydown", handleTab);
      return () => window.removeEventListener("keydown", handleTab);
    }
  }, [mdeRef.current, focusTrapActive]);

  const onChange = useCallback(() => {
    changeData(mdeRef.current.codemirror.getValue(), sectionId, id);
  }, [changeData]);

  if (entry.type != "markdown") return <></>;

  return (
    <Custom {...props}>
      {window && window.navigator ? (
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
              <MDE
                mdeRef={mdeRef}
                text={data[sectionId][id]}
                onChange={onChange}
                onFocus={() => {
                  setFocusTrapActive(true);
                }}
              />
              <MarkdownSupported></MarkdownSupported>
            </div>
          </FocusTrap>
        </>
      ) : (
        <></>
      )}
    </Custom>
  );
}

export default Component;
