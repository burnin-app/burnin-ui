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
        background: var(--bg-color);
        box-sizing: border-box;

        flex: 1;
        position: relative;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;

    }
</style>
