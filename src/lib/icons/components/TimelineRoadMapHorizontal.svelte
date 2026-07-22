<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { fill, color, strokeWidth, ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <path
        fill={fill ? color : "none"}
        stroke={fill ? "none" : color}
        stroke-width={strokeWidth}
        id="Union" d="M12 16c1.3059 0 2.4141 0.8353 2.8262 2H21c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1h-6.1738c-0.4121 1.1647 -1.5203 2 -2.8262 2s-2.41406 -0.8353 -2.82617 -2H3c-0.55228 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1h6.17383C9.58594 16.8353 10.6941 16 12 16m0 2c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1 1 -0.4477 1 -1 -0.4477 -1 -1 -1m3 -16c1.1046 0 2 0.89543 2 2v5c0 0.26522 -0.1054 0.5195 -0.293 0.70703l-4 3.99997c-0.3905 0.3906 -1.0235 0.3906 -1.414 0L7.29297 9.70703C7.10543 9.5195 7 9.26522 7 9V4c0 -1.10457 0.89543 -2 2 -2z"></path>
</IcoBase>
