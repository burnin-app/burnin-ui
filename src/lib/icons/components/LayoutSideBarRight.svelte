<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { fill, color, strokeWidth, ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <path
        fill={fill ? color : "none"}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={strokeWidth}
        d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2z"></path>
    <path
        fill={fill ? color : "none"}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={strokeWidth}
        d="m15 4 0 16"></path>
</IcoBase>
