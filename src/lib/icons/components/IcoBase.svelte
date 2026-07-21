<script lang="ts">
    import type { Snippet } from "svelte";
    import type { SvgIconProp } from "../types";

    interface IconProps extends SvgIconProp {
        children: Snippet;
    }

    let {
        children,
        color = "#D9D9D9",
        size = 18,
        className,
    }: IconProps = $props();
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    class={className}
    style={`color: ${color};`}
    aria-hidden="true"
>
    {@render children()}
</svg>
