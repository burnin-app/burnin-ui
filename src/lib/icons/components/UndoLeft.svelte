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
                              d="M4 7h11c2.7614 0 5 2.23857 5 5 0 2.7614 -2.2386 5 -5 5H8.00001M4 7l3 -3M4 7l3 3"></path>
        </svg>

</IcoBase>
