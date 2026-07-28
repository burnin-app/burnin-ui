<script lang="ts">
    import type { Snippet } from "svelte";
    import {  type PanelContextProps, setPanelContext } from "../context";

    interface PanelProps {
        children: Snippet;
        selected_id: string,
    }

    let { children, selected_id = $bindable("")}: PanelProps = $props();

    let context = $state<PanelContextProps>({
      selected_id : selected_id,
    })

    setPanelContext(context);
</script>

<div class="panel-wrapper">
    {@render children()}
</div>

<style lang="scss">
    .panel-wrapper {
        background: var(--bg-color);
        display: flex;
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
    }
</style>
