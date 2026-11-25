// paneTreeConfigurable.ts
import type { Component } from "svelte";
import { type FourPaneNode, countLeaves } from "../FourPane";

export interface ConfigurableRegistryEntry {
    component: Component<any>;
    label: string;
    icon: string;
    /**
     * true  -> this component can be open in any number of panes
     * false -> only one pane at a time (picking it elsewhere moves/swaps it)
     * Default: false
     */
    multiple?: boolean;
}

export type ConfigurablePaneRegistry = Record<string, ConfigurableRegistryEntry>;

export function isMultiple(registry: ConfigurablePaneRegistry, contentType: string): boolean {
    return registry[contentType]?.multiple === true;
}

/** Number of splits made so far (a tree with N leaves has N-1 splits). */
export function countSplits(root: FourPaneNode): number {
    return countLeaves(root) - 1;
}

/** maxSplits: 0 (or less) = unlimited */
export function canSplitMore(root: FourPaneNode, maxSplits: number): boolean {
    if (maxSplits <= 0) return true;
    return countSplits(root) < maxSplits;
}

export function countByContentType(node: FourPaneNode, contentType: string): number {
    if (node.type === "leaf") return node.contentType === contentType ? 1 : 0;
    return node.panes.reduce((sum, c) => sum + countByContentType(c, contentType), 0);
}

function findLeafOtherThan(node: FourPaneNode, contentType: string, excludeId: string): FourPaneNode | null {
    if (node.type === "leaf") {
        return node.contentType === contentType && node.id !== excludeId ? node : null;
    }
    for (const child of node.panes) {
        const found = findLeafOtherThan(child, contentType, excludeId);
        if (found) return found;
    }
    return null;
}

function findLeaf(node: FourPaneNode, id: string): FourPaneNode | null {
    if (node.type === "leaf") return node.id === id ? node : null;
    for (const child of node.panes) {
        const found = findLeaf(child, id);
        if (found) return found;
    }
    return null;
}

/**
 * Assign a content type to a pane, respecting the registry's `multiple` flag.
 * Single-instance types already open in another pane are swapped with this pane.
 */
export function setContentTypeConfigured(
    root: FourPaneNode,
    targetId: string,
    contentType: string,
    registry: ConfigurablePaneRegistry,
): boolean {
    const pane = findLeaf(root, targetId);
    if (!pane) return false;
    if (pane.contentType === contentType) return true;

    if (contentType && !isMultiple(registry, contentType)) {
        const existing = findLeafOtherThan(root, contentType, pane.id);
        if (existing) {
            existing.contentType = pane.contentType;
            pane.contentType = contentType;
            return true;
        }
    }
    pane.contentType = contentType;
    return true;
}

/** Split a leaf, respecting maxSplits (0 = unlimited) and single-instance rules. */
export function splitPaneConfigured(
    root: FourPaneNode,
    targetId: string,
    direction: "horizontal" | "vertical",
    maxSplits: number,
    registry: ConfigurablePaneRegistry,
    newContentType: string = "",
): boolean {
    if (!canSplitMore(root, maxSplits)) return false;
    // don't create a second copy of a single-instance component
    if (newContentType && !isMultiple(registry, newContentType) && countByContentType(root, newContentType) > 0) {
        newContentType = "";
    }

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

/** Use this on a saved layout before applying it (e.g. after loading from localStorage). */
export function isLayoutValid(
    root: FourPaneNode,
    registry: ConfigurablePaneRegistry,
    maxSplits: number,
): boolean {
    if (maxSplits > 0 && countSplits(root) > maxSplits) return false;

    const seen = new Map<string, number>();
    let ok = true;
    (function walk(n: FourPaneNode) {
        if (n.type === "leaf") {
            if (!n.contentType) return;
            if (!registry[n.contentType]) {
                ok = false;
                return;
            }
            const c = (seen.get(n.contentType) ?? 0) + 1;
            seen.set(n.contentType, c);
            if (c > 1 && !isMultiple(registry, n.contentType)) ok = false;
            return;
        }
        n.panes.forEach(walk);
    })(root);
    return ok;
}
