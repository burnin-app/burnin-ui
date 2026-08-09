<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 14 14" version="1.1">
            <path
                style="
                        fill:{color};
                        stroke-width:{strokeWidth}px;
                        fill-rule=enenodd;
                    "
                id="Union" d="M1.5 0C0.671573 0 0 0.671573 0 1.5v11c0 0.8284 0.671573 1.5 1.5 1.5h11c0.8284 0 1.5 -0.6716 1.5 -1.5v-11c0 -0.828427 -0.6716 -1.5 -1.5 -1.5h-11Z" clip-rule="evenodd"></path>
        </svg>
</IcoBase>
