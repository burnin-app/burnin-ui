<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =10., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <rect
        x="3.409"
        y="3.994"
        width="17.182"
        height="16.085"
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
    />
</IcoBase>
