<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { Snippet } from "svelte";
    export interface ButtonProps extends HTMLButtonAttributes {
        children?: Snippet;
    }
    let { children, class: className, ...rest }: ButtonProps = $props();
</script>

<button class={`button ${className ?? ""}`} {...rest}>
    {@render children?.()}
</button>

<style lang="scss">
    .button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
    }
</style>
