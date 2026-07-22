<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { color, ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <path
        fill={color}
        stroke={color}
        fill-rule="evenodd"
        id="Union" d="M8 1c0 -0.552285 -0.44772 -1 -1 -1S6 0.447715 6 1v5H1c-0.552285 0 -1 0.44772 -1 1s0.447715 1 1 1h5v5c0 0.5523 0.44772 1 1 1s1 -0.4477 1 -1V8h5c0.5523 0 1 -0.44772 1 -1s-0.4477 -1 -1 -1H8V1Z" clip-rule="evenodd" stroke-width="1"></path>
</IcoBase>
