<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { color, strokeWidth =10., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 16 16" version="1.1">
              <path
                  style="
                          fill:{color};
                          stroke-width:{strokeWidth}px;
                      "
                  d="M2 15h12c1.103125 0 2 -0.896875 2 -2V5c0 -1.103125 -0.896875 -2 -2 -2H9c-0.315625 0 -0.6125 -0.146875 -0.8 -0.4l-0.6 -0.8C7.221875 1.296875 6.628125 1 6 1H2C0.896875 1 0 1.896875 0 3v10c0 1.103125 0.896875 2 2 2z"></path>
        </svg>
</IcoBase>
