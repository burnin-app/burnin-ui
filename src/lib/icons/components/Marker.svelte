<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1">
                        <path
                            style="
                                    fill:{color};
                                    stroke-width:{strokeWidth}px;
                                    stroke-miterlimit=10px;
                                "
                            id="Union"d="M15.5862 4.00023c0.781 -0.78095 2.0471 -0.78095 2.8281 0l3.0859 3.08594c0.7807 0.78105 0.7809 2.04719 0 2.82812L11.4143 20.0002c-0.7107 0.7105 -1.82152 0.772 -2.60449 0.1895l-0.5166 0.5176c-0.18746 0.1874 -0.44196 0.2929 -0.70703 0.2929h-5.3789c-0.44546 0 -0.6685 -0.5395 -0.35352 -0.8545l3.45605 -3.456c-0.58218 -0.783 -0.51988 -1.893 0.19043 -2.6035zM6.91431 15.5002l3.08589 3.086 3.586 -3.586 -3.086 -3.0859zm4.99999 -5 3.0859 3.086 5.086 -5.08597 -3.086 -3.08594z"></path>
        </svg>
</IcoBase>
