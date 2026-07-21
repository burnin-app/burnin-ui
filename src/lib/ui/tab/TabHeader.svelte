<script lang="ts">
    import { type Snippet} from "svelte";
    interface TabHeaderProps {
        onTabChange?: (tab: string) => void;
        children?: Snippet;
    }

    let { onTabChange, children }: TabHeaderProps = $props();
</script>

<div class="tab-header-wrapper">
    <div class="tabs">
        {@render children?.()}
    </div>
    <div class="tab-options"></div>
</div>

<style>
    .tab-header-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background-color: var(--bg-color);
        margin-top: 4px;
        display: flex;
        flex: 1;
        flex: 0 0 var(--tab-height); /* or whatever height */
    }

    .tabs {
        display: flex;
        gap: 2px;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        overflow: hidden;
        height: var(--tab-height);
    }

    /* Options area: size-to-content, or constrain with max-width */
    .tab-options {
        display: flex;
        gap: 10px;
        align-items: center;
        flex: 0 0 auto; /* do not grow; size to content */
        margin-left: auto;
        min-width: 0;
        /* Optional constraints:
         max-width: 35%; overflow: hidden; white-space: nowrap; */
    }

    /* If options can overflow and you want scroll */
    .tab-options--scrollable {
        max-width: 40%;
        overflow-x: auto;
    }
</style>
