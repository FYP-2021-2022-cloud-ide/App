import { Switch } from "@headlessui/react";
import React, { useState } from "react";

type Props = {
  enabled: boolean;
  onChange: (newValue: boolean) => void;
  text: string;
};

function Toggle({ enabled: _enabled, onChange, text }: Props) {
  const [enabled, setEnabled] = useState(_enabled);

  return (
    <Switch
      checked={enabled}
      onChange={() => {
        onChange(!enabled);
        setEnabled(!enabled);
      }}
      className={`${
        enabled ? "bg-green-400" : "bg-gray-200 dark:bg-gray-600"
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">{text}</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full  transition ease-in-out duration-200`}
      />
    </Switch>
  );
}

// export default React.memo(Toggle, () => true);
export default Toggle;
