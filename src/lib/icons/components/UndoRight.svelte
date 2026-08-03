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
                                      stroke-linecap=round;
                                      stroke-linejoin=round;
                                  "
                              d="M20 7H9.00001C6.23858 7 4 9.23857 4 12c0 2.7614 2.23858 5 5 5h7m4 -10 -3 -3m3 3 -3 3"></path>
        </svg>


</IcoBase>
