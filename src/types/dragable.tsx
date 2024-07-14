import { ReactNode } from "react";

export interface DnDProps {
  /* id of the draggable element */
  id: string;
  /* children node of the draggable element */
  children: ReactNode;
}
