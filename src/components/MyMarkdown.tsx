import remarkGfm from "remark-gfm";
import remarkFrontMatter from "remark-frontmatter";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism, okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "../contexts/theme";
import { memo } from "react";

export const MyMarkDown = memo(
  ({ text }: { text: string }) => {
    const { isDark } = useTheme();

    return (
      <ReactMarkdown
        children={text}
        remarkPlugins={[remarkGfm, remarkFrontMatter, remarkEmoji, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline ? (
              <div className="p-3">
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match ? match[1] : undefined}
                  style={isDark ? okaidia : prism}
                  PreTag="div"
                  showLineNumbers
                  {...props}
                />
              </div>
            ) : (
              <code
                className="text-red-400 bg-red-200/20 px-1 rounded"
                {...props}
              >
                {children}
              </code>
            );
          },
          hr({ className }) {
            return (
              <hr className="my-5 border-b-2 dark:border-white/30 border-black-30"></hr>
            );
          },
          table({ node, children }) {
            return <table className="m-2">{children}</table>;
          },
          th({ node, children, style, isHeader }) {
            // isHeader is true
            return <th className="border">{children}</th>;
          },
          ul({ node, children, className }) {
            console.log(className);
            return (
              <ul
                className={
                  className === "contains-task-list"
                    ? className
                    : "list-disc list-inside ml-5"
                }
              >
                {children}
              </ul>
            );
          },
          ol({ node, children, className }) {
            return (
              <ol
                className={
                  className === "contains-task-list"
                    ? className
                    : "list-decimal list-inside ml-5"
                }
              >
                {children}
              </ol>
            );
          },
          li({ node, children, index, ordered, checked, className }) {
            if (checked != null) {
              console.log(children);
            }
            return <li className=" ">{children}</li>;
          },
          td({ node, children, style, isHeader }) {
            // isHeader is false
            return <td className="border p-1">{children}</td>;
          },
          a({ node, children, href, title }) {
            return (
              <a title={title} href={href} className="text-blue-300 underline">
                {children}
              </a>
            );
          },
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.text == nextProps.text
);
