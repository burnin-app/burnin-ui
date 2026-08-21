import type { MenuContextProps, ListContextProps, ContextMenuContextProps } from "./types";
import { createContext } from "svelte";

export const [getMenuContext, setMenuContext] =
  createContext<MenuContextProps>();

export const [getListContext, setListContext] =
  createContext<ListContextProps>();


export const [getContextMenuContext, setContextMenuContext] =
  createContext<ContextMenuContextProps>();
