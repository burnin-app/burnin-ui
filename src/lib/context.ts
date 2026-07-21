import type { MenuContextProps, ListContextProps } from "./types";
import { createContext } from "svelte";

export const [getMenuContext, setMenuContext] =
  createContext<MenuContextProps>();

export const [getListContext, setListContext] =
  createContext<ListContextProps>();
