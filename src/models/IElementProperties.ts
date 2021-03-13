import { CSSProperties } from "react";
import { ILabelProperties } from "./ILabelProperties";

export interface IElementProperties {
  labelProperties: ILabelProperties | undefined;
  labelStyle: CSSProperties | undefined;
}
