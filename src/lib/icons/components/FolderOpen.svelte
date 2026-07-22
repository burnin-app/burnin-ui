<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { fill, color, strokeWidth =6.25, ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 67 67" version="1.1">
              <path
                  d="M8.789,35.221l0,-1.888c0,-3.107 2.557,-5.664 5.664,-5.664l37.76,0c3.107,0 5.664,2.557 5.664,5.664l0,1.888m-21.876,-16.212l-5.337,-5.337c-0.708,-0.709 -1.669,-1.107 -2.671,-1.108l-13.541,0c-3.107,-0 -5.664,2.557 -5.664,5.664l0,30.208c0,3.107 2.557,5.664 5.664,5.664l37.76,0c3.107,0 5.664,-2.557 5.664,-5.664l0,-22.656c0,-3.107 -2.557,-5.664 -5.664,-5.664l-13.541,0c-1.001,-0.001 -1.961,-0.4 -2.668,-1.108l-0.003,0Z"
                  style="
                          fill:{fill};
                          fill-rule:nonzero;
                          stroke:{color};
                          stroke-width:{strokeWidth}px;
                      "
              />
        </svg>
</IcoBase>
