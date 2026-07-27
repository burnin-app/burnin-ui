<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =10., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 25 24" version="1.1">
            <path
                style="
                        fill:{color};
                        stroke-width:{strokeWidth}px;
                        fill-rule:nonzero;
                    "
                d="M19.5 20H6.5c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V2.5c0 -0.4 0.15 -0.75 0.45 -1.05 0.3 -0.3 0.65 -0.45 1.05 -0.45h8.7L21 6.8V18.5c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45ZM14.45 7.45V2.5H6.5v16h13V7.45H14.45ZM3.5 23c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V6.025h1.5V21.5h12.45v1.5H3.5Z"></path>
        </svg>
</IcoBase>
