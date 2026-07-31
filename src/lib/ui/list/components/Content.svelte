<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { setListContext, getListContext } from "../../../context";

    interface ContentProps {
        children: Snippet;
    }

    let scroll_container: HTMLDivElement;

    let { children }: ContentProps = $props();
    let context = getListContext();
    onMount(() => {
      console.log("mounted, eleemetn");
      context.scrollHTMLContainer = scroll_container;
      console.log(scroll_container);
    })
</script>

<div class="content-wrapper" bind:this={scroll_container}>
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
