<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { color, strokeWidth, ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <path
        fill={color}
        stroke-width={strokeWidth}
        id="Union" d="M3 6c0.55228 0 1 0.44772 1 1v13h13c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1H4c-1.03565 0 -1.887 -0.7872 -1.98926 -1.7959L2 20V7c0 -0.55228 0.44772 -1 1 -1m17 -4c1.1046 0 2 0.89543 2 2v12c0 1.1046 -0.8954 2 -2 2H8c-1.10457 0 -2 -0.8954 -2 -2V4c0 -1.10457 0.89543 -2 2 -2zm-3.6172 8.5098c-0.1946 -0.2595 -0.5814 -0.2674 -0.7871 -0.0166l-2.2207 2.707 -1.4902 -1.749c-0.2012 -0.2357 -0.5663 -0.2332 -0.7647 0.0049l-1.43651 1.7236c-0.27135 0.3256 -0.04004 0.8202 0.38381 0.8203H18c0.4119 0 0.6472 -0.4702 0.4004 -0.7998z">
    </path>
</IcoBase>
