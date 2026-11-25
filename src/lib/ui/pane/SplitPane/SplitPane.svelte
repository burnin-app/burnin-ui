<script lang="ts">
    import { PaneGroup, Pane, PaneResizer } from "paneforge";
    import { Dropdown } from "../../dropdown";
    import { Menu } from "../../menu";
    import { IcoBtn } from "../../button";
    import Self from "./SplitPane.svelte";
    import { type FourPaneNode, countLeaves, closePane } from "../FourPane";
    import {
        type ConfigurablePaneRegistry,
        canSplitMore,
        countByContentType,
        isMultiple,
        setContentTypeConfigured,
        splitPaneConfigured,
    } from "./paneTree";

    interface ConfigurablePaneProps {
        root: FourPaneNode;
        registry: ConfigurablePaneRegistry;
        maxSplits?: number;
        treeRoot?: FourPaneNode;
        fullscreenId?: string | null;
    }

    let {
        root = $bindable(),
        registry,
        maxSplits = 0,
        treeRoot = $bindable(),
        fullscreenId = $bindable(null),
    }: ConfigurablePaneProps = $props();

    const isTreeRoot = treeRoot === undefined;
    let effectiveRoot = $derived(isTreeRoot ? root : treeRoot);
    let registryKeys = $derived(Object.keys(registry));

    let activeEntry = $derived(root.contentType ? registry[root.contentType] : undefined);

    function toggleFullscreen(id: string) {
        fullscreenId = fullscreenId === id ? null : id;
    }

    let totalLeaves = $derived(countLeaves(effectiveRoot));
    let canSplit = $derived(canSplitMore(effectiveRoot, maxSplits));
    let isFullscreen = $derived(fullscreenId === root.id);
    let isHiddenBehindFullscreen = $derived(fullscreenId !== null && fullscreenId !== root.id);

    // single-instance component that is already open in a different pane
    function openElsewhere(contentType: string): boolean {
        if (isMultiple(registry, contentType)) return false;
        if (root.contentType === contentType) return false;
        return countByContentType(effectiveRoot, contentType) > 0;
    }

    $effect(() => {
        if (totalLeaves <= 1 && fullscreenId !== null) {
            fullscreenId = null;
        }
    });
</script>

{#if root.type === "leaf"}
    <div class="pane" class:pane-fullscreen={isFullscreen} class:pane-hidden={isHiddenBehindFullscreen}>
        <div class="pane-content">
            {#if activeEntry}
                {@const Comp = activeEntry.component}
                <Comp contentType={root.contentType} />
            {:else}
                <div class="pane-empty"><p>Choose a component to open</p></div>
            {/if}

            <div class="pane-type-switcher">
                <Dropdown.Root>
                    <Dropdown.Trigger>
                        <div class="type-switcher-btn">
                            {#if activeEntry}
                                <IcoBtn icon={activeEntry.icon} size={20} border={false} fill />
                            {/if}
                            {#if !activeEntry?.label}
                                <IcoBtn icon="DevMode" size={20} border={false} fill />
                            {/if}
                        </div>
                    </Dropdown.Trigger>
                    <Menu.Content>
                        {#each registryKeys as contentType (contentType)}
                            {@const entry = registry[contentType]}
                            <Menu.Item
                                onclick={() =>
                                    setContentTypeConfigured(effectiveRoot, root.id, contentType, registry)}
                            >
                                <div class="menu-item-row">
                                    <IcoBtn icon={entry.icon} fill size={20} border={false} />
                                    <span>{entry.label}</span>
                                    {#if openElsewhere(contentType)}
                                        <span class="menu-hint">(swap)</span>
                                    {/if}
                                </div>
                            </Menu.Item>
                        {/each}

                        {#if activeEntry && totalLeaves > 1}
                            <Menu.Item onclick={() => toggleFullscreen(root.id)}>
                                {isFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"}
                            </Menu.Item>
                        {/if}

                        {#if !isFullscreen && canSplit}
                            <Menu.Item
                                onclick={() =>
                                    splitPaneConfigured(effectiveRoot, root.id, "horizontal", maxSplits, registry)}
                                >Split Horizontal</Menu.Item
                            >
                            <Menu.Item
                                onclick={() =>
                                    splitPaneConfigured(effectiveRoot, root.id, "vertical", maxSplits, registry)}
                                >Split Vertical</Menu.Item
                            >
                        {/if}

                        {#if totalLeaves > 1}
                            <Menu.Item onclick={() => closePane(effectiveRoot, root.id)}>Close Pane</Menu.Item>
                        {/if}
                    </Menu.Content>
                </Dropdown.Root>
            </div>
        </div>
    </div>
{:else}
    <PaneGroup direction={root.direction}>
        {#each root.panes as pane, i (pane.id)}
            <Pane id={pane.id} order={i}>
                <Self
                    bind:root={root.panes[i]}
                    {registry}
                    {maxSplits}
                    bind:treeRoot={effectiveRoot}
                    bind:fullscreenId
                />
            </Pane>
            {#if i < root.panes.length - 1}
                <PaneResizer />
            {/if}
        {/each}
    </PaneGroup>
{/if}

<style>
    .pane { display: flex; height: 100%; width: 100%; }
    .pane-content { position: relative; flex: 1; min-height: 0; min-width: 0; overflow: auto; }
    .pane-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: #737373; }
    .pane-type-switcher { position: absolute; top: 0px; left: 0px; z-index: 20; height: 40px; display: flex; align-items: center; }
    .type-switcher-btn {
        display: flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 6px;
        background: rgba(30, 30, 30, 0.7); backdrop-filter: blur(4px); font-size: 12px;
        cursor: pointer; color: #e5e5e5;
        height: 100%;
    }
    .menu-item-row { display: flex; align-items: center; gap: 6px; }
    .menu-hint { font-size: 11px; opacity: 0.55; }
    .pane-fullscreen { position: absolute; inset: 0; z-index: 1000; background: var(--bu-pane-bg, #1e1e1e); }
    .pane-hidden { position: absolute; top: -100000px; left: -100000px; visibility: hidden; pointer-events: none; }
</style>
