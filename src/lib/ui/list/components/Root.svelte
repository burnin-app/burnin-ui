<script lang="ts">
    import type { Snippet } from "svelte";
    import { setListContext } from "../../../context";
    import type { ListContextProps } from "../../../types";

    interface ListRootProps {
        children: Snippet;
        selected_id?: string | null;
    }

    let { children, selected_id = $bindable(null) }: ListRootProps = $props();

    let context = $state<ListContextProps>({
        selected_id: selected_id,
        filtered: null,
        search_key: "name",
        search_value: "",
        filter: false,
    });

    setListContext(context);
</script>

<div class="list-wrapper">
    {@render children()}
</div>

<style lang="scss">
    .list-wrapper {
        display: flex;
        flex-direction: column;

        flex: 1;
        min-height: 0;
        margin-bottom: 2px;
    }
</style>
