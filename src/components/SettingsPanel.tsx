import React from "react";
import styles from "../styles/SettingsPanel.module.css";
import { IDisplayCardProps } from "../models/IDisplayCardProps";
import DisplayCards from "./DisplayCards";
import { ISettingsPanelProps } from "../models/ISettingsPanelProps";

const SettingsPanel: React.FC<ISettingsPanelProps> = (
  props: ISettingsPanelProps
) => {
  const displayCards: string[] = ["Label", "Input", "Button"];

  const cardMouseDrag = (event: React.MouseEvent, element: string) => {
    props.elementDragged(element);
  };

  return (
    <div className={`col-end-auto col-span-2 ${styles.settingsPanel}`}>
      <div className="ml-4 mr-4 text-white">
        <p className="font-bold text-4xl mt-4">BLOCKS</p>
        <div className="mt-12">
          {displayCards.map((card: string, i: number) => {
            const cardProps: IDisplayCardProps = {
              name: card,
              handleMouseMove: (event: React.MouseEvent) => {
                cardMouseDrag(event, card);
              },
            };
            return <DisplayCards key={i} {...cardProps} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
