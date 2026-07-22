<script lang="ts">
    import type { Snippet } from "svelte";

    interface ContentProps {
        children: Snippet;
    }

    let { children }: ContentProps = $props();
</script>

<div class="content-wrapper">
    {@render children()}
</div>

<style lang="scss">
    .content-wrapper {
        flex: 1;
        min-width: 0;
        min-height: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        min-width: 0;
        padding: 2px;
        background-color: var(--list-bg-color);

        flex: 1;
        min-height: 0;
        overflow: auto;

        flex: 1;
        min-height: 0;
        min-width: 0;
        overflow: auto;
        width: 100%;
        padding: 1px;
        box-sizing: border-box;
        border: none;
    }

    /* .content-wrapper {
        flex: 1;
        min-height: 0;
        min-width: 0;

        overflow-y: auto;
        overflow-x: auto;

        width: 100%;

        padding: 2px;
        box-sizing: border-box;

        background-color: var(--border-color);
    } */
</style>
