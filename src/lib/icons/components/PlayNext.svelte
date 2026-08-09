<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 14 14" version="1.1">
                    <path id="Union" d="M13.198,6.056L5.379,0.657C4.984,0.406 4.501,0.473 4.153,0.735C3.884,0.937 3.695,1.255 3.686,1.633L3.686,12.333C3.686,12.335 3.686,12.336 3.686,12.338C3.686,13.222 4.665,13.794 5.379,13.341L13.198,7.975C13.849,7.536 13.849,6.495 13.198,6.056ZM2,1.742C2,1.19 1.552,0.742 1,0.742C0.448,0.742 0,1.19 0,1.742L0,12.258C0,12.81 0.448,13.258 1,13.258C1.552,13.258 2,12.81 2,12.258L2,1.742Z"
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                                fill-rule=enenodd;
                            "
                        />
        </svg>
</IcoBase>
