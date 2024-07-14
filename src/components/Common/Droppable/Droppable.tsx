import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { DnDProps } from "@/types/dragable";

const Droppable = ({ id, children }: DnDProps) => {
  const { setNodeRef } = useDroppable({ id });

  return <span ref={setNodeRef}>{children}</span>;
};

export default Droppable;
