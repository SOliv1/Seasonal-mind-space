import { createContext } from "react";

export type MindmapNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: string;
};

export type MindmapConnection = {
  from: string;
  to: string;
};

export type MindmapContextType = {
  nodes: MindmapNode[];
  connections: MindmapConnection[];
  selectedNode: string | null;

  addNode: (label: string, x: number, y: number, color?: string) => void;
  updateNode: (id: string, updates: Partial<MindmapNode>) => void;
  removeNode: (id: string) => void;

  addConnection: (from: string, to: string) => void;
  removeConnection: (from: string, to: string) => void;

  selectNode: (id: string | null) => void;
};

export const MindmapContext = createContext<MindmapContextType | null>(null);
