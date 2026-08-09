import type { FourPaneNode } from "./paneTree";

const LAYOUT_STORAGE_KEY = "fourpane-layout";

export function saveLayout(root: FourPaneNode) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(root));
    } catch (e) {
        console.error("Failed to save pane layout:", e);
    }
}

import { countLeaves, MAX_PANES} from "./paneTree";

export function loadLayout(): FourPaneNode | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as FourPaneNode;
        if (countLeaves(parsed) > MAX_PANES) {
            console.warn("Saved layout exceeds MAX_PANES, ignoring.");
            return null;
        }
        return parsed;
    } catch (e) {
        console.error("Failed to load pane layout:", e);
        return null;
    }
}

export function clearSavedLayout() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(LAYOUT_STORAGE_KEY);
}
