<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 14 14" version="1.1">
                    <path
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                                fill-rule=enenodd;
                            "
                        id="Union" d="M0.488,7.444L8.307,12.843C8.703,13.094 9.185,13.027 9.533,12.765C9.802,12.563 9.991,12.245 10,11.867L10,1.167C10,1.165 10,1.164 10,1.162C10,0.278 9.021,-0.294 8.307,0.158L0.488,5.525C-0.163,5.964 -0.163,7.005 0.488,7.444ZM11.686,11.758C11.686,12.31 12.134,12.758 12.686,12.758C13.238,12.758 13.686,12.31 13.686,11.758L13.686,1.242C13.686,0.69 13.238,0.242 12.686,0.242C12.134,0.242 11.686,0.69 11.686,1.242L11.686,11.758Z"/>
        </svg>
</IcoBase>
