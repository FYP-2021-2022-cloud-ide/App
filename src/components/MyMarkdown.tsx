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
    return (
      <div className="react-markdown">
        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
            remarkFrontMatter,
            remarkEmoji,
            remarkMath,
          ]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              console.log(document.body.classList.contains("dark"));
              return !inline ? (
                <SyntaxHighlighter
                  language={match ? match[1] : undefined}
                  style={
                    document.body.classList.contains("dark") ? okaidia : prism
                  }
                  PreTag="div"
                  showLineNumbers
                  {...props}
                >{String(children).replace(/\n$/, "")}</SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a({ node, children, href, title }) {
              return (
                <a title={title} href={href}>
                  {children}
                </a>
              );
            },
          }}
        >{text}</ReactMarkdown>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.text == nextProps.text
);
