import type { Component } from "svelte";

export type PaneRegistry = Record<string, Component<any>>;

export interface BuPaneTabItem {
  id: string;
  contentType: string;
  label: string;
  state: Record<string, any>;
}

export interface BuPane {
  id: string;
  type: "split" | "leaf";
  direction: "horizontal" | "vertical";
  panes: BuPane[];
  tabs: BuPaneTabItem[];
  activeTabId: string;
}
