import { useCallback, useState, type ReactNode } from "react";
import {
  MindmapContext,
  type MindmapConnection,
  type MindmapNode,
} from "./mindmapContext";

type MindmapProviderProps = {
  children: ReactNode;
};

export function MindmapProvider({ children }: MindmapProviderProps) {
  const [nodes, setNodes] = useState<MindmapNode[]>([]);
  const [connections, setConnections] = useState<MindmapConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const addNode = useCallback(
    (label: string, x: number, y: number, color = "#A3C4F3") => {
      setNodes((prev) => [
        ...prev,
        { id: crypto.randomUUID(), label, x, y, color },
      ]);
    },
    []
  );

  const updateNode = useCallback(
    (id: string, updates: Partial<MindmapNode>) => {
      setNodes((prev) =>
        prev.map((node) => (node.id === id ? { ...node, ...updates } : node))
      );
    },
    []
  );

  const removeNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setConnections((prev) =>
      prev.filter((connection) => connection.from !== id && connection.to !== id)
    );
  }, []);

  const addConnection = useCallback((from: string, to: string) => {
    setConnections((prev) => [...prev, { from, to }]);
  }, []);

  const removeConnection = useCallback((from: string, to: string) => {
    setConnections((prev) =>
      prev.filter(
        (connection) => !(connection.from === from && connection.to === to)
      )
    );
  }, []);

  const selectNode = useCallback((id: string | null) => {
    setSelectedNode(id);
  }, []);

  return (
    <MindmapContext.Provider
      value={{
        nodes,
        connections,
        selectedNode,
        addNode,
        updateNode,
        removeNode,
        addConnection,
        removeConnection,
        selectNode,
      }}
    >
      {children}
    </MindmapContext.Provider>
  );
}
