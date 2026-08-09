<script lang="ts">
    import type { Component, Snippet } from "svelte";
    import { PaneGroup, Pane, PaneResizer } from "paneforge";
    import {
        Dropdown,
    } from "../dropdown";
    import {
        Menu,
    } from "../menu";
    import {
        IcoBtn,
    } from "../button";
    import Self from "./BuSplitPaneOnly.svelte";

    type PaneRegistry = Record<string, Component<any>>;

    export interface BuPaneOnly {
        id: string;
        type: "split" | "leaf";
        direction: "horizontal" | "vertical";
        panes: BuPaneOnly[];
        contentType: string;
        state: Record<string, any>;
    }

    interface BuPaneOnlyLayoutProps {
        root: BuPaneOnly;
        registry: PaneRegistry;
        // Internal: the true tree root, used for split/close operations
        treeRoot?: BuPaneOnly;
        children?: Snippet;
    }

    let {
        root = $bindable(),
        registry,
        treeRoot = $bindable(),
        children,
    }: BuPaneOnlyLayoutProps = $props();

    // On the outermost call, treeRoot is not passed — so we are the tree root.
    const isTreeRoot = treeRoot === undefined;
    let effectiveRoot = $derived(isTreeRoot ? root : treeRoot);

    function defaultContentType(): string {
        return Object.keys(registry)[0];
    }

    export function createEmptyLeaf(contentType?: string): BuPaneOnly {
        return {
            id: crypto.randomUUID(),
            type: "leaf",
            direction: "horizontal",
            panes: [],
            contentType: contentType ?? defaultContentType(),
            state: {},
        };
    }

    function setContentType(pane: BuPaneOnly, contentType: string) {
        if (pane.contentType === contentType) return;
        pane.contentType = contentType;
        pane.state = {}; // fresh state for the newly selected content
    }

    function splitPane(
        node: BuPaneOnly,
        targetId: string,
        direction: "horizontal" | "vertical",
    ): boolean {
        if (node.id === targetId) {
            const preserved: BuPaneOnly = {
                id: crypto.randomUUID(),
                type: "leaf",
                direction: "horizontal",
                panes: [],
                contentType: node.contentType,
                state: node.state,
            };
            node.type = "split";
            node.direction = direction;
            node.panes = [preserved, createEmptyLeaf()];
            node.contentType = "";
            node.state = {};
            return true;
        }
        for (const child of node.panes) {
            if (splitPane(child, targetId, direction)) return true;
        }
        return false;
    }

    function closePane(node: BuPaneOnly, targetId: string): boolean {
        const index = node.panes.findIndex((child) => child.id === targetId);

        if (index !== -1) {
            node.panes.splice(index, 1);

            // Collapse single-child splits
            if (node.panes.length === 1) {
                const remaining = node.panes[0];
                node.type = remaining.type;
                node.direction = remaining.direction;
                node.panes = remaining.panes;
                node.contentType = remaining.contentType;
                node.state = remaining.state;
            }
            return true;
        }

        for (const child of node.panes) {
            if (closePane(child, targetId)) return true;
        }

        return false;
    }
</script>

{#if root.type === "leaf"}
    <div class="pane">
        <div class="pane-header">
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <div class="pane-title" style="text-transform: capitalize">
                        {root.contentType}
                    </div>
                </Dropdown.Trigger>
                <Menu.Content>
                    {#each Object.keys(registry) as contentType, index}
                        <Menu.Item
                            onclick={() => setContentType(root, contentType)}
                        >
                            <div style="text-transform: capitalize">
                                {contentType}
                            </div>
                        </Menu.Item>
                    {/each}
                </Menu.Content>
            </Dropdown.Root>

            <div class="pane-options">
                <Dropdown.Root>
                    <Dropdown.Trigger>
                        <IcoBtn icon="ArrowUp" fill />
                    </Dropdown.Trigger>
                    <Menu.Content>
                        <Menu.Item
                            onclick={() =>
                                splitPane(effectiveRoot, root.id, "horizontal")}
                            >Split Horizontal</Menu.Item
                        >
                        <Menu.Item
                            onclick={() =>
                                splitPane(effectiveRoot, root.id, "vertical")}
                            >Split Vertical</Menu.Item
                        >
                        <Menu.Item onclick={() => closePane(effectiveRoot, root.id)}
                            >Close Pane</Menu.Item
                        >
                    </Menu.Content>
                </Dropdown.Root>
            </div>
        </div>

        <div class="pane-content">
            {#if root.contentType}
                {@const Comp = registry[root.contentType]}
                <Comp bind:state={root.state} />
            {/if}
        </div>
    </div>
{:else}
    <PaneGroup direction={root.direction}>
        {#each root.panes as _, i (root.panes[i].id)}
            <Pane id={root.panes[i].id} order={i}>
                <Self
                    bind:root={root.panes[i]}
                    {registry}
                    bind:treeRoot={effectiveRoot}
                />
            </Pane>

            {#if i < root.panes.length - 1}
                <PaneResizer />
            {/if}
        {/each}
    </PaneGroup>
{/if}

<style>
    .pane {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    .pane-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 8px;
    }
    .pane-content {
        flex: 1;
        min-height: 0;
        overflow: auto;
    }
</style>
