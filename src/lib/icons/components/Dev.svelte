<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 16 16" version="1.1">
                    <path
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                            "
                        d="M14.5 3.5H1.5A1 1 0 0 0 0.5 4.5v7a1 1 0 0 0 1 1h13a1 1 0 0 0 1 -1V4.5a1 1 0 0 0 -1 -1Zm0 8H1.5V4.5h13v7Zm-6.5 -5v1h0.5a0.5 0.5 0 0 1 0 1h-0.5v1h1a0.5 0.5 0 0 1 0 1h-1.5a0.5 0.5 0 0 1 -0.5 -0.5V6a0.5 0.5 0 0 1 0.5 -0.5h1.5a0.5 0.5 0 0 1 0 1Zm5.48125 -0.364375 -1.125 4a0.5 0.5 0 0 1 -0.9625 0l-1.125 -4a0.5 0.5 0 0 1 0.9625 -0.27125l0.64375 2.28875 0.64375 -2.28875a0.5 0.5 0 1 1 0.9625 0.27125ZM4 5.5h-0.5a0.5 0.5 0 0 0 -0.5 0.5v4a0.5 0.5 0 0 0 0.5 0.5h0.5a2 2 0 0 0 2 -2v-1a2 2 0 0 0 -2 -2Zm1 3a1 1 0 0 1 -1 1v-3a1 1 0 0 1 1 1Z" ></path>
        </svg>
</IcoBase>
