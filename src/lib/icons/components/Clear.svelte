<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1">
                            <path
                                style="
                                        stroke:{color};
                                        stroke-width:{strokeWidth}px;
                                    "
                                d="M2 12c0 -4.71405 0 -7.07107 1.46447 -8.53553C4.92893 2 7.28595 2 12 2c4.714 0 7.0711 0 8.5355 1.46447C22 4.92893 22 7.28595 22 12c0 4.714 0 7.0711 -1.4645 8.5355C19.0711 22 16.714 22 12 22c-4.71405 0 -7.07107 0 -8.53553 -1.4645C2 19.0711 2 16.714 2 12Z"></path>
                            <path
                                style="
                                        stroke:{color};
                                        stroke-width:{strokeWidth}px;
                                        stroke-linecap=round;
                                    "
                                d="M14.5 9.50002 9.5 14.5m-0.00002 -5 5.00002 5"></path>
        </svg>


</IcoBase>
