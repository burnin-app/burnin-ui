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
                        d="m15.52053125 5.089125 -8.676375 8.676375c-0.4221625 0.4218875 -1.1063375 0.4218875 -1.5285 0L0.47608125 8.90024375c-0.42144375 -0.4220875 -0.42144375 -1.1057375 0 -1.527825l1.35145625 -1.3514625c0.42185625 -0.4200875 1.10394375 -0.4200875 1.5258 0l2.7536 2.6704875L12.6453 2.2334875c0.42193125 -0.4205375 1.10454375 -0.4205375 1.526475 0l1.34808125 1.32038125c0.42659375 0.4227375 0.4269 1.1121375 0.000675 1.53525625Z"></path>
        </svg>
</IcoBase>
