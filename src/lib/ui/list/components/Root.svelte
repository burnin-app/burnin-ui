<script lang="ts">
    import type { Snippet } from "svelte";
    import { setListContext } from "../../../context";
    import type { ListContextProps } from "../../../types";

    interface ListRootProps {
        children: Snippet;
        selected_id?: string | null;
    }

    let wrapper: HTMLDivElement;

    let { children, selected_id = $bindable(null) }: ListRootProps = $props();

    let context = $state<ListContextProps>({
        selected_id: selected_id,
        filtered: null,
        search_key: "name",
        search_value: "",
        filter: false,
        scrollHTMLContainer: null
    });

    setListContext(context);


    $effect(() => {
      if (!selected_id || !context.scrollHTMLContainer) return;
        context.selected_id = selected_id;
        queueMicrotask(() => {
            const el = context.scrollHTMLContainer.querySelector(
                `[data-item-id="${CSS.escape(selected_id)}"]`
            ) as HTMLElement | null;

            console.log(el);

            el?.scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "nearest",
            });
        });
    })
</script>

<div class="list-wrapper" bind:this={wrapper}>
    {@render children()}
</div>

<style lang="scss">
    .list-wrapper {
        display: flex;
        flex-direction: column;

        flex: 1;
        min-height: 0;

        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
