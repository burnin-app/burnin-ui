<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =10., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <rect
             x="6"
             y="6"
             width="12"
             height="12"
             stroke={color}
             fill="transparent"
             stroke-width={strokeWidth}
         />
    />
</IcoBase>
