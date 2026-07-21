import type { Component } from "svelte";

export interface MenuContextProps {
  id: string;
  isOpen: boolean;
  close?: () => void;
  triggerElement?: HTMLDivElement | null;
  contentElement?: HTMLDivElement | null;
}

export type CompRegistry = Record<string, Component<any>>;

export interface ListContextProps {
  selected_id: string | null;
  filtered: string[] | null;
  search_key: string;
  search_value: string;
  filter: boolean;
}
