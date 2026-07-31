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
                            "
                        d="M12 17c1.933 0 3.5 1.567 3.5 3.5S13.933 24 12 24s-3.5 -1.567 -3.5 -3.5S10.067 17 12 17m0 -8.5c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5 -3.5 3.5 -3.5 -1.567 -3.5 -3.5 1.567 -3.5 3.5 -3.5M12 0c1.933 0 3.5 1.567 3.5 3.5S13.933 7 12 7 8.5 5.433 8.5 3.5 10.067 0 12 0"></path>
        </svg>
</IcoBase>
