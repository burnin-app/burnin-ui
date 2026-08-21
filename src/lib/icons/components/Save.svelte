<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1">
                    <path id="Union"
                        style="
                                fill:{color};
                                stroke-width:{strokeWidth}px;
                            "
                        d="m19 19.5859 2.293 -2.2929 1.414 1.414 -4 4c-0.3905 0.3906 -1.0235 0.3906 -1.414 0l-4 -4 1.414 -1.414L17 19.5859V13h2zM17 7.58594V10.5h-2v-2h-4.5V4H5v13h6v2H4c-0.55228 0 -1 -0.4477 -1 -1V3c0 -0.55228 0.44772 -1 1 -1h7.4141z"></path>
        </svg>
</IcoBase>
