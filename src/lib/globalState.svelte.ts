export const globalUIState: {
  activeMenuId: string | null;
  menuPosition: { x: number; y: number; width: number };
  isOpen: boolean;
  close: () => void;
} = $state({
  activeMenuId: null,
  menuPosition: { x: 0, y: 0, width: 0 },
  isOpen : false,
  close: onclose
});


function onclose() {
  globalUIState.activeMenuId = null;
  globalUIState.isOpen = false;
}
