import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Menu, { MenuItem } from "./CardMenu";
import { Template } from "../lib/cnails";
import myToast from "./CustomToast";
import Tilt from "react-parallax-tilt";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useInstructor } from "../pages/course/[sectionId]/instructor";

export const useCleanTilt = (preserve: string = "") => {
  const ref = useRef<Tilt>();
  const cleanStyle = () => {
    const id = setTimeout(() => {
      if (ref.current) {
        //@ts-ignore
        let node = ref.current.wrapperEl.node as HTMLDivElement;
        if (node.getAttribute("style") != preserve) {
          node.setAttribute("style", preserve);
          cleanStyle();
        }
      }
    }, 10);
    return id;
  };
  useLayoutEffect(() => {
    const id = cleanStyle();
    return () => clearTimeout(id);
  });
  return { ref, cleanStyle };
};

interface Props {
  template: Template;
  highlighted?: Boolean;
  onClick?: (template: Template) => void;
  onDelete?: (template: Template) => void;
  // return the newValue
  onToggle?: (template: Template, open: boolean) => void;
  // return the new value
  onToggleActivation?: (template: Template, active: boolean) => void;
  onToggleFreshSave?: (freshSave: boolean) => void;
  onInspect?: (template: Template) => void;
  onWorkspaceCardClick?: (template: Template) => void;
  onUpdate?: (template: Template) => void;
  zIndex?: number;
}

const EmbeddedWorkspaceCard = ({
  template,
  onClick,
}: {
  template: Template;
  onClick: () => void;
}) => {
  return (
    <div
      className="rounded  bg-blue-200/20 dark:bg-black/30 p-2 flex flex-row space-x-2"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <span className="relative flex h-3 w-3">
        {template.containerID && (
          <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${
            template.containerID ? "bg-green-400" : "bg-gray-400"
          }`}
        ></span>
      </span>
      <div className="env-card-content min-h-[32px]">
        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
          Workspace
        </p>
      </div>
    </div>
  );
};

function TemplateCard({
  template,
  highlighted: _highlighted = false,
  onClick,
  onUpdate,
  onDelete,
  onToggle,
  onToggleActivation,
  onInspect,
  onWorkspaceCardClick,
  onToggleFreshSave,
  zIndex,
}: Props) {
  const [useFreshSave, setUseFreshSave] = useState(false);
  const { environments, highlightedEnv, setHighlightedEnv } = useInstructor();
  const { ref, cleanStyle } = useCleanTilt(
    zIndex ? `z-index : ${zIndex};` : ""
  );
  const belong = environments.findIndex(
    (e) => e.id === template.environment_id
  );
  var meunItems: MenuItem[] = [];
  if (onDelete)
    meunItems.push({
      text: "Delete",
      onClick: () => {
        onDelete(template);
      },
    });
  if (onUpdate)
    meunItems.push({
      text: "Update",
      onClick: () => {
        onUpdate(template);
      },
    });
  if (onToggle)
    meunItems.push({
      text: template.containerID ? "Stop workspace" : "Start workspace",
      onClick: () => {
        if (onToggle) {
          onToggle(template, !Boolean(template.containerID));
        }
      },
    });
  // if (onInspect)
  //   meunItems.push({
  //     text: "Inspect",
  //     onClick: () => {
  //       onInspect(template);
  //     },
  //   });
  if (onToggleActivation) {
    meunItems.push({
      text: template.active ? "Unpublish" : "Publish",
      onClick: () => {
        onToggleActivation(template, !template.active);
      },
    });
  }
  if (template.active)
    meunItems.push({
      text: "Share link",
      onClick: () => {
        myToast.success("link to copied to clipboard.");
        navigator.clipboard.writeText(
          "https://codespace.ust.dev/quickAssignmentInit/" + template.id
        );
      },
    });

  useEffect(() => {
    if (highlightedEnv && highlightedEnv.id === template.environment_id) {
      // setHighlighted(false);
      const id = setTimeout(() => {
        setHighlightedEnv(null);
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
  });

  return (
    <Tilt
      onLeave={cleanStyle}
      ref={ref}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      tiltReverse
    >
      <div
        onClick={() => {
          if (onClick) onClick(template);
        }}
        className={`template-card  transition-all duration-300 ease-in ${
          highlightedEnv && highlightedEnv.id === template.environment_id
            ? "bg-yellow-300/80 shadow-yellow-300 shadow-xl"
            : template.active
            ? "bg-white dark:bg-gray-600 shadow-sm"
            : "bg-gray-200 dark:bg-gray-900 shadow-sm"
        }`}
      >
        <div className="env-card-content justify-between w-full">
          <div>
            <div>
              <div className="font-semibold text-sm text-gray-600 dark:text-gray-300  whitespace-nowrap truncate">
                {template.name}
              </div>
            </div>
            {belong != -1 && (
              <div className="text-2xs text-gray-600 dark:text-gray-300 truncate">
                using{" "}
                <span className="font-bold">{environments[belong].name}</span>
              </div>
            )}
            <p className="template-card-des">{template.description}</p>
          </div>
          {template.containerID && (
            <EmbeddedWorkspaceCard
              template={template}
              onClick={() => {
                if (onWorkspaceCardClick) {
                  onWorkspaceCardClick(template);
                }
              }}
            />
          )}
        </div>

        <div className="flex flex-col justify-between h-full items-center">
          <Menu items={meunItems}></Menu>
          <div className="flex flex-col">
            {template.active ? (
              <div title="The template is published.">
                <EyeIcon className="w-5 h-5 text-gray-400 "></EyeIcon>
              </div>
            ) : (
              <div title="The template is not published.">
                <EyeOffIcon className="w-5 h-5 text-gray-400 "></EyeOffIcon>
              </div>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default TemplateCard;
