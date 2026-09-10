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
                        d="M12 12v2H4v-2H3v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1 -1v-2Z"></path>
                    <path
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                            "
                        d="m10.5 10.5 -0.707 -0.707L8.5 11.086 8.5 7l-1 0 0 4.086 -1.293 -1.293L5.5 10.5l2.5 2.5 2.5 -2.5z" ></path>
                    <path
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                            "
                        d="m14 2 0 -1 -3 0 0 5 1 0 0 -2 1.5 0 0 -1 -1.5 0 0 -1 2 0z" ></path>
                    <path
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                            "
                        d="M8.5 6h-2V1h2a1.50165 1.50165 0 0 1 1.5 1.5v2a1.50165 1.50165 0 0 1 -1.5 1.5Zm-1 -1h1a0.50055 0.50055 0 0 0 0.5 -0.5V2.5a0.50055 0.50055 0 0 0 -0.5 -0.5h-1Z"></path>
                    <path
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                            "
                        d="M4.5 1H2v5h1V4.5h1.5a1.00135 1.00135 0 0 0 1 -1V2a1.00115 1.00115 0 0 0 -1 -1ZM3 3.5V2h1.5l0.0005 1.5Z" ></path>
                    <path
                        style="
                                fill:none;
                                stroke-width:{strokeWidth}px;
                            "
                        id="_Transparent_Rectangle_" d="M0 0h16v16H0Z"></path>
        </svg>
</IcoBase>
