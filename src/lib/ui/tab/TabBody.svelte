<script lang="ts">
    import { type Snippet} from "svelte";

    interface TabBodyProps {
        children: Snippet;
        tabId: string;
        activeTabId: string;
    }

    let { children, tabId, activeTabId }: TabBodyProps = $props();

    // let context = getContext<{ activeTabId: string }>("context");
</script>

<div class="tab-body-wrapper" class:active={tabId === activeTabId}>
    {@render children()}
</div>

<style>
    .tab-body-wrapper {
        display: none;
        height: 100%;
        width: 100%;
        border: 1px solid var(--border-color);
        background-color: var(--tab-body-color);
        flex: 1;
        min-height: 0;
        min-width: 0;
    }
    .tab-body-wrapper.active {
        display: block;
    }
    /*.tab-body-wrapper {
        display: none;
        height: 100%;
        width: 100%;
        border: 1px solid var(--border-color);
        background-color: var(--tab-body-color);

        flex: 1;
        min-height: 0;
        min-width: 0;
        width: 100%;

        display: flex;
    }
    .tab-body-wrapper.active {
        display: block;
    }*/
</style>
