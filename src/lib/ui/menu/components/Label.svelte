<script lang="ts">
    import { type Snippet } from "svelte";

    interface LabelProps {
        children: Snippet;
    }

    let { children }: LabelProps = $props();
</script>

<div class="label-wrapper">
    <div class="label">
        {@render children()}
    </div>
</div>

<style lang="scss">
    .label-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        height: var(--menu-item-height);
        padding-left: 12px;
    }
    .label {
        color: var(--text-color-dim);
    }
</style>
