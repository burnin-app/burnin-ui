import { createContext } from "svelte";


export const [getPanelContext, setPanelContext] =
  createContext<PanelContextProps>();


export interface PanelContextProps {
  selected_id: string;
}
