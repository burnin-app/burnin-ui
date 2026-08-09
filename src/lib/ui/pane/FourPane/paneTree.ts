// paneTree.ts
export interface FourPaneNode {
    id: string;
    type: "split" | "leaf";
    direction: "horizontal" | "vertical";
    panes: FourPaneNode[];
    contentType: string;
}

import type { Component } from "svelte";

export interface PaneComponentProps {
    contentType: string;
}

export interface PaneRegistryEntry {
    component: Component<Record<string, unknown>>;
    label: string;
    icon: string; // icon name, passed to IcoBtn/Icon
}

export type PaneRegistry = Record<string, PaneRegistryEntry>;

export const MAX_PANES = 4;

export function countLeaves(node: FourPaneNode): number {
    if (node.type === "leaf") return 1;
    return node.panes.reduce((sum, child) => sum + countLeaves(child), 0);
}

export function findLeafById(node: FourPaneNode, id: string): FourPaneNode | null {
    if (node.type === "leaf") {
        return node.id === id ? node : null;
    }
    for (const child of node.panes) {
        const found = findLeafById(child, id);
        if (found) return found;
    }
    return null;
}

export function findLeafByContentType(node: FourPaneNode, contentType: string): FourPaneNode | null {
    if (node.type === "leaf") {
        return node.contentType === contentType ? node : null;
    }
    for (const child of node.panes) {
        const found = findLeafByContentType(child, contentType);
        if (found) return found;
    }
    return null;
}

export function setContentType(root: FourPaneNode, targetId: string, contentType: string): boolean {
    const pane = findLeafById(root, targetId);
    if (!pane) return false;
    if (pane.contentType === contentType) return true;

    const existing = contentType ? findLeafByContentType(root, contentType) : null;
    if (existing && existing.id !== pane.id) {
        const temp = pane.contentType;
        pane.contentType = existing.contentType;
        existing.contentType = temp;
    } else {
        pane.contentType = contentType;
    }
    return true;
}

export function splitPane(
    root: FourPaneNode,
    targetId: string,
    direction: "horizontal" | "vertical",
    newContentType: string = "",
): boolean {
    if (countLeaves(root) >= MAX_PANES) return false;

    function recurse(node: FourPaneNode): boolean {
        if (node.id === targetId) {
            const preserved: FourPaneNode = {
                id: crypto.randomUUID(),
                type: "leaf",
                direction: "horizontal",
                panes: [],
                contentType: node.contentType,
            };
            const newLeaf: FourPaneNode = {
                id: crypto.randomUUID(),
                type: "leaf",
                direction: "horizontal",
                panes: [],
                contentType: newContentType,
            };
            node.id = crypto.randomUUID();
            node.type = "split";
            node.direction = direction;
            node.panes = [preserved, newLeaf];
            node.contentType = "";
            return true;
        }
        for (const child of node.panes) {
            if (recurse(child)) return true;
        }
        return false;
    }

    return recurse(root);
}

export function closePane(root: FourPaneNode, targetId: string): boolean {
    function recurse(node: FourPaneNode): boolean {
        const index = node.panes.findIndex((c) => c.id === targetId);
        if (index !== -1) {
            node.panes.splice(index, 1);
            if (node.panes.length === 1) {
                const remaining = node.panes[0];
                node.type = remaining.type;
                node.direction = remaining.direction;
                node.panes = remaining.panes;
                node.contentType = remaining.contentType;
            }
            return true;
        }
        for (const child of node.panes) {
            if (recurse(child)) return true;
        }
        return false;
    }
    return recurse(root);
}

// convenience: split whichever leaf currently shows a given contentType
export function splitByContentType(
    root: FourPaneNode,
    contentType: string,
    direction: "horizontal" | "vertical",
    newContentType: string = "",
): boolean {
    const leaf = findLeafByContentType(root, contentType);
    if (!leaf) return false;
    return splitPane(root, leaf.id, direction, newContentType);
}

// convenience: assign a contentType to the first pane that currently shows it, or
// to a specific leaf's targetId if you already have that leaf's id
export function setByContentType(
    root: FourPaneNode,
    fromContentType: string,
    toContentType: string,
): boolean {
    const leaf = findLeafByContentType(root, fromContentType);
    if (!leaf) return false;
    return setContentType(root, leaf.id, toContentType);
}
