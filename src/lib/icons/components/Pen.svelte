<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 16 16" version="1.1">
                    <path
                        style="
                                fill:none;
                                stroke:{color};
                                stroke-width:{strokeWidth}px;
                                stroke-miterlimit=10px;
                            "
                        d="m13.668750000000001 3.125 -1.46875 1.45 -1.775 -1.775L11.875 1.3312499999999998a1.25 1.25 0 0 1 0.8875 -0.36874999999999997 1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 13.668750000000001 3.125Z"></path>
                    <path
                        style="
                                fill:none;
                                stroke:{color};
                                stroke-width:{strokeWidth}px;
                                stroke-miterlimit=10px;
                            "
                        d="M12.79375 5.168749999999999 5.143750000000001 12.818750000000001l-3.6062499999999997 0.65 0.64375 -3.6125000000000003L9.83125 2.20625l2.9625000000000004 2.9625000000000004z"></path>
                    <path
                        style="
                                fill:none;
                                stroke:{color};
                                stroke-width:{strokeWidth}px;
                                stroke-miterlimit=10px;
                            "
                        d="m3.95625 5.1125 2.375 -2.36875 2.9625000000000004 0"></path>
        </svg>
</IcoBase>
