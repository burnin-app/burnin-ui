import type { NodeContextProps } from "./types";
import { createContext } from "svelte";

export const [getNodeContext, setNodeContext] =
  createContext<NodeContextProps>();
