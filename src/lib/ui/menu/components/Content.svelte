<script lang="ts">
    import { type Snippet } from "svelte";
    import { getMenuContext } from "../../../context";
    import { globalUIState } from "../../../globalState.svelte";
    import { Menu } from "../../../index";

    interface ContentProps {
        children: Snippet;
        matchTriggerWidth?:boolean;
    }
    let { children, matchTriggerWidth = false}: ContentProps = $props();

    let context = getMenuContext();
</script>

{#if globalUIState.activeMenuId === context.id}
    <div class="portal">
        <Menu.Root matchTriggerWidth>
            {@render children()}
        </Menu.Root>
    </div>
{/if}

<style lang="scss">
    .portal {
        position: fixed;
        z-index: var(--menu-z-index);
    }
</style>
