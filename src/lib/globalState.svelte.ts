export const globalUIState: {
  activeMenuId: string | null;
  menuPosition: { x: number; y: number; width: number };
} = $state({
  activeMenuId: null,
  menuPosition: { x: 0, y: 0, width: 0 },
});
