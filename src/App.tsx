import React, { useState } from "react";
import BuildRenderer from "./components/BuildRenderer";
import SettingsPanel from "./components/SettingsPanel";
import { IBuildRendererProps } from "./models/IBuildRendererProps";
import { ISettingsPanelProps } from "./models/ISettingsPanelProps";

const App: React.FC<{}> = () => {
  const [element, setElement] = useState<string>("");

  const elementDragged = (element: string) => {
    setElement(element);
  };

  const settingsPanelProps: ISettingsPanelProps = {
    elementDragged: elementDragged,
  };

  const buildRendererProps: IBuildRendererProps = {
    element: element,
  };

  return (
    <div className="grid grid-cols-12">
      <BuildRenderer {...buildRendererProps} />
      <SettingsPanel {...settingsPanelProps} />
    </div>
  );
};

export default App;
