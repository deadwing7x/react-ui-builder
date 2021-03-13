import React from "react";
import { IDisplayCardProps } from "../models/IDisplayCardProps";
import { GrDrag } from "react-icons/gr";

const DisplayCards: React.FC<IDisplayCardProps> = (
  props: IDisplayCardProps
) => {
  const handleMouseDrag = (event: React.MouseEvent) => {
    props.handleMouseMove(event);
  };

  return (
    <div
      className={`mt-4 mb-8 ml-5 mr-5 h-10 flex align-middle bg-white text-gray-500 rounded-sm 
      opacity-75 cursor-pointer hover:opacity-100`}
      draggable
      onDragStart={(event) => handleMouseDrag(event)}
    >
      <div className="mt-3 mr-4 ml-3">
        <GrDrag />
      </div>
      <p className="text-2xl mt-1">{props.name}</p>
    </div>
  );
};

export default DisplayCards;
