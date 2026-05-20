import { create } from "zustand";
import type { SeasonName } from "../colors/seasonPalettes";

export interface MindMapNode {
  id: string;
  x: number;
  y: number;
  text: string;
}

export interface MindMapConnection {
  id: string;
  from: string;
  to: string;
  label: string;
}

export interface MindMapStore {
  nodes: MindMapNode[];
  connections: MindMapConnection[];
  pendingConnectionStart: string | null;
  focusedNode: string | null;
  season: SeasonName;
  calmMode: boolean;

  startConnection: (nodeId: string) => void;
  completeConnection: (targetNodeId: string) => void;
  cancelConnection: () => void;
  setFocusedNode: (id: string | null) => void;

  addNode: (node: Omit<MindMapNode, "id">) => void;
  updateNode: (nodeId: string, updates: Partial<Omit<MindMapNode, "id">>) => void;

  reset: () => void;
  calm: () => void;
  toggleSeason: () => void;
}

export const useMindMapStore = create<MindMapStore>((set) => ({
  nodes: [],
  connections: [],
  pendingConnectionStart: null,
  focusedNode: null,
  season: "spring",
  calmMode: false,

  startConnection: (nodeId) =>
    set({ pendingConnectionStart: nodeId }),

  completeConnection: (targetNodeId) =>
    set((state) => {
      if (!state.pendingConnectionStart) return state;

      const newConnection: MindMapConnection = {
        id: (Math.random() + 1).toString(36).substring(2),
        from: state.pendingConnectionStart,
        to: targetNodeId,
        label: "",
      };

      return {
        connections: [...state.connections, newConnection],
        pendingConnectionStart: null,
      };
    }),

  cancelConnection: () =>
    set({ pendingConnectionStart: null }),

  setFocusedNode: (id) =>
    set({ focusedNode: id }),

  addNode: (node) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        { ...node, id: (Math.random() + 1).toString(36).substring(2) },
      ],
    })),

  updateNode: (nodeId, updates) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      ),
    })),

  reset: () =>
    set({
      nodes: [],
      connections: [],
      pendingConnectionStart: null,
      focusedNode: null,
      season: "spring",
      calmMode: false,
    }),

  calm: () =>
    set((state) => ({
      focusedNode: null,
      pendingConnectionStart: null,
      calmMode: !state.calmMode,
    })),

  toggleSeason: () =>
    set((state) => {
      const seasons: SeasonName[] = ["spring", "summer", "autumn", "winter"];
      const currentIndex = seasons.indexOf(state.season);
      const nextSeason = seasons[(currentIndex + 1) % seasons.length];

      return {
        season: nextSeason,
        calmMode: false,
      };
    }),
}));
