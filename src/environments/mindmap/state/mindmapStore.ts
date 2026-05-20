import { create } from "zustand";

export const useMindMapStore = create((set) => ({
  nodes: [],
  connections: [],
  focusedNode: null,
  calmMode: false,

  addNode: ({ x, y, text }) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: Date.now(),
          x,
          y,
          text,
        },
      ],
    })),

  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, ...updates } : n
      ),
    })),

  setFocusedNode: (id) => set(() => ({ focusedNode: id })),
  clearFocus: () => set(() => ({ focusedNode: null })),

  toggleCalmMode: () =>
    set((state) => ({ calmMode: !state.calmMode })),

  resetView: () =>
    set(() => ({
      focusedNode: null,
      calmMode: false,
    })),
}));
