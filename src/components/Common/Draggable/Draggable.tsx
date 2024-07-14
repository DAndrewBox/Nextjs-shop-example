import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { DnDProps } from "@/types/dragable";
import { DraggableItem } from "./Draggable.styles";

const Draggable = ({ id, children }: DnDProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <DraggableItem ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </DraggableItem>
  );
};

export default Draggable;
