<script lang="ts">
    import { type Snippet, getContext } from "svelte";
    import { globalUIState } from "../../../globalState.svelte";
    import Root from "./Root.svelte";

    let componentId = getContext<string>("componentId");
    interface ContentProps {
        children: Snippet;
        style?: string;
        ondestroy?: () => void;
        onupdate?:() => void;
   }
    let { children, style, ondestroy, onupdate}: ContentProps = $props();

</script>

{#if globalUIState.activeMenuId === componentId}
    <div class="portal">
        <Root style={style} ondestory={ondestroy} onupdate={onupdate}>
            {@render children()}
        </Root>
    </div>
{/if}

<style lang="scss">
    .portal {
        position: fixed;
        z-index: var(--menu-z-index);
    }
</style>
