<script lang="ts">
    import type { Snippet } from "svelte";

    interface AppProps {
        children: Snippet;
    }

    let { children }: AppProps = $props();
</script>

<div class="window-wrapper">
    {@render children()}
</div>

<style lang="scss">
    .window-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 0;
        min-width: 0;
        background: var(--bg-color);
        box-sizing: border-box;
    }
</style>
