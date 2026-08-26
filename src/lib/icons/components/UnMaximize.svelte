<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1">
          <path
              style ="
                    fill: transparent;
              "
                    d="M8 8H18V18H8V8Z"
                    stroke={color}
                    stroke-width={strokeWidth}
                />

                <path
                    style ="
                          fill: transparent;
                    "
                    d="M6 16V6H16"
                    stroke={color}
                    stroke-width={strokeWidth}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
        </svg>
</IcoBase>
