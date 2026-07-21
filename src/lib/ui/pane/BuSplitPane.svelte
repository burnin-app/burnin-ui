<script lang="ts">
    import type { Component, Snippet } from "svelte";
    import { PaneGroup, Pane, PaneResizer } from "paneforge";
    import {
        Dropdown,
        Menu,
        Tab,
        TabBody,
        TabHeader,
        TabHeaderItem,
        IcoBtn,
    } from "../../index";
    import type { BuPane, BuPaneTabItem } from "./types";
    import Self from "./BuSplitPane.svelte";

    type PaneRegistry = Record<string, Component<any>>;

    interface BuPaneLayoutProps {
        root: BuPane;
        registry: PaneRegistry;
        // Internal: the true tree root, used for split/close operations
        treeRoot?: BuPane;
        children?: Snippet;
    }

    let {
        root = $bindable(),
        registry,
        treeRoot = $bindable(),
        children,
    }: BuPaneLayoutProps = $props();

    // On the outermost call, treeRoot is not passed — so we are the tree root.
    const isTreeRoot = treeRoot === undefined;
    let effectiveRoot = $derived(isTreeRoot ? root : treeRoot);

    function defaultContentType(): keyof typeof registry {
        return Object.keys(registry)[0];
    }

    function createTab(contentType: keyof typeof registry): BuPaneTabItem {
        return {
            id: crypto.randomUUID(),
            contentType,
            label: String(contentType),
            state: {},
        };
    }

    function createEmptyLeaf(): BuPane {
        const tab = createTab(defaultContentType());
        return {
            id: crypto.randomUUID(),
            type: "leaf",
            direction: "horizontal",
            panes: [],
            tabs: [tab],
            activeTabId: tab.id,
        };
    }

    function closeTab(pane: BuPane, tabId: string) {
        const index = pane.tabs.findIndex((t) => t.id === tabId);
        if (index === -1) return;

        pane.tabs.splice(index, 1);

        if (pane.tabs.length === 0) {
            const closed = closePane(effectiveRoot, pane.id);
            if (!closed) {
                const fresh = createTab(defaultContentType());
                pane.tabs.push(fresh);
                pane.activeTabId = fresh.id;
            }
            return;
        }

        if (pane.activeTabId === tabId) {
            const nextIndex = Math.min(index, pane.tabs.length - 1);
            pane.activeTabId = pane.tabs[nextIndex].id;
        }
    }

    function addTab(pane: BuPane, contentType: keyof typeof registry) {
        const tab = createTab(contentType);
        pane.tabs.push(tab);
        pane.activeTabId = tab.id;
    }

    function splitPane(
        node: BuPane,
        targetId: string,
        direction: "horizontal" | "vertical",
    ): boolean {
        if (node.id === targetId) {
            const preserved: BuPane = {
                id: crypto.randomUUID(),
                type: "leaf",
                direction: "horizontal",
                panes: [],
                tabs: node.tabs,
                activeTabId: node.activeTabId,
            };
            node.type = "split";
            node.direction = direction;
            node.panes = [preserved, createEmptyLeaf()];
            node.tabs = [];
            node.activeTabId = "";
            return true;
        }
        for (const child of node.panes) {
            if (splitPane(child, targetId, direction)) return true;
        }
        return false;
    }
    // function splitPane(
    //     node: BuPane,
    //     targetId: string,
    //     direction: "horizontal" | "vertical",
    // ): boolean {
    //     if (node.id === targetId) {
    //         const preserved: BuPane = {
    //             id: crypto.randomUUID(),
    //             type: "leaf",
    //             direction: "horizontal",
    //             panes: [],
    //             tabs: node.tabs,
    //             activeTabId: node.activeTabId,
    //         };

    //         // NEW: Copy state from current pane to new pane
    //         const newLeaf = createEmptyLeaf();
    //         if (node.tabs.length > 0) {
    //             newLeaf.tabs[0].state = { ...node.tabs[0].state };
    //         }

    //         node.type = "split";
    //         node.direction = direction;
    //         node.panes = [preserved, newLeaf];
    //         node.tabs = [];
    //         node.activeTabId = "";
    //         return true;
    //     }
    //     for (const child of node.panes) {
    //         if (splitPane(child, targetId, direction)) return true;
    //     }
    //     return false;
    // }

    function closePane(node: BuPane, targetId: string): boolean {
        const index = node.panes.findIndex((child) => child.id === targetId);

        if (index !== -1) {
            node.panes.splice(index, 1);

            // Collapse single-child splits
            if (node.panes.length === 1) {
                const remaining = node.panes[0];
                node.type = remaining.type;
                node.direction = remaining.direction;
                node.panes = remaining.panes;
                node.tabs = remaining.tabs;
                node.activeTabId = remaining.activeTabId;
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
        <Tab activeTabId={root.activeTabId}>
            <TabHeader>
                <div class="tab-labels">
                    {#each root.tabs as tab (tab.id)}
                        <TabHeaderItem
                            bind:activeTabId={root.activeTabId}
                            id={tab.id}
                            name={tab.label}
                            showTabClose
                            onTabClose={() => closeTab(root, tab.id)}
                        />
                    {/each}
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <IcoBtn icon="Plus" fill color="#737373" />
                        </Dropdown.Trigger>
                        <Menu.Content>
                            {#each Object.keys(registry) as contentType}
                                <Menu.Item
                                    onclick={() => addTab(root, contentType)}
                                >
                                    <div style="text-transform: capitalize">
                                        {contentType}
                                    </div>
                                </Menu.Item>
                            {/each}
                        </Menu.Content>
                    </Dropdown.Root>
                </div>

                <div class="tab-options">
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <IcoBtn icon="ArrowUp" fill />
                        </Dropdown.Trigger>
                        <Menu.Content>
                            <Menu.Item
                                onclick={() =>
                                    splitPane(
                                        effectiveRoot,
                                        root.id,
                                        "horizontal",
                                    )}>Split Horizontal</Menu.Item
                            >
                            <Menu.Item
                                onclick={() =>
                                    splitPane(
                                        effectiveRoot,
                                        root.id,
                                        "vertical",
                                    )}>Split Vertical</Menu.Item
                            >
                            <Menu.Item
                                onclick={() =>
                                    closePane(effectiveRoot, root.id)}
                                >Close Pane</Menu.Item
                            >
                        </Menu.Content>
                    </Dropdown.Root>
                </div>
            </TabHeader>

            {#each root.tabs as tab (tab.id)}
                {@const Comp = registry[tab.contentType]}
                <TabBody tabId={tab.id} activeTabId={root.activeTabId}>
                    <Comp bind:state={tab.state} />
                </TabBody>
            {/each}
        </Tab>
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

<style lang="scss">
    .pane {
        width: 100%;
        height: 100%;
    }

    .tab-labels {
        display: flex;
        flex: 1;
        overflow: hidden;
        align-items: center;
        gap: 4px;
    }

    .tab-options {
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 0 4px;
        flex-shrink: 0;
    }
</style>
