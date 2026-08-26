<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1">
          <path
                      d="M6 12H18"
                      stroke={color}
                      stroke-width={strokeWidth}
                      stroke-linecap="square"
                  />
        </svg>
</IcoBase>
