<script lang="ts">
    import type { Snippet } from "svelte";
    import type { SvgIconProp } from "../types";

    interface IconProps extends SvgIconProp {
        children: Snippet;
    }

    let {
        children,
        color = "#D9D9D9",
        size,
        className,
    }: IconProps = $props();
</script>

    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class={`svg ${className}`}
        style={`
              color:${color};
              width:${size ? `${size}px` : "100%"};
              height:${size ? `${size}px` : "100%"};
          `}
        aria-hidden="true"
    >
        {@render children()}
    </svg>

<style lang="scss">
</style>
