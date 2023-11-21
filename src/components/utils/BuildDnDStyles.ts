import { CSSProperties } from "react";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

export const BuildDnDStyles = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  primaryColor: string,
  editMode: boolean
): CSSProperties => {
  return {
    padding: `0px 10px 0 10px`,
    margin: `0 0 10px 0`,
    cursor: "pointer",
    ...draggableStyle,
    left: "0 !important",
    border: editMode
      ? `2px dashed ${primaryColor}`
      : `1px solid ${primaryColor}`,
    borderRadius: "10px",
  };
};
