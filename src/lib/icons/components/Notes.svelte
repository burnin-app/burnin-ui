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
                d="M4.5 19.5h10V14.5h5V4.5H4.5v15Zm0 1.5c-0.4125 0 -0.765585 -0.1469 -1.05925 -0.44075C3.146915 20.2656 3 19.9125 3 19.5V4.5c0 -0.4125 0.146915 -0.765665 0.44075 -1.0595C3.734415 3.146835 4.0875 3 4.5 3h15c0.4125 0 0.76565 0.146835 1.0595 0.4405C20.85315 3.734335 21 4.0875 21 4.5v10.5L15 21H4.5Zm3 -7.5v-1.5h4.25v1.5H7.5Zm0 -4v-1.5h9v1.5H7.5Z"></path>
        </svg>
</IcoBase>
