<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =10., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 25 24" version="1.1">
            <path
                style="
                        stroke:{color};
                        stroke-width:{strokeWidth}px;
                        fill-rule:nonzero;
                    "
                stroke-linecap="round" stroke-linejoin="round" d="M1 5h22"></path>
            <path
                style="
                        stroke:{color};
                        stroke-width:{strokeWidth}px;
                        fill-rule:nonzero;
                    "
                    stroke-linecap="round" stroke-linejoin="round" d="M14.25 1h-4.5c-0.39782 0 -0.77936 0.15804 -1.06066 0.43934C8.40804 1.72064 8.25 2.10218 8.25 2.5V5h7.5V2.5c0 -0.39782 -0.158 -0.77936 -0.4393 -1.06066C15.0294 1.15804 14.6478 1 14.25 1Z" ></path>
            <path
                style="
                        stroke:{color};
                        stroke-width:{strokeWidth}px;
                        fill-rule:nonzero;
                    "
                stroke-linecap="round" stroke-linejoin="round" d="M9.75 17.75v-7.5"></path>
            <path
                style="
                        stroke:{color};
                        stroke-width:{strokeWidth}px;
                        fill-rule:nonzero;
                    "
                stroke-linecap="round" stroke-linejoin="round" d="M14.25 17.75v-7.5"></path>
            <path
                style="
                        stroke:{color};
                        stroke-width:{strokeWidth}px;
                        fill-rule:nonzero;
                    "
                stroke-linecap="round" stroke-linejoin="round" d="M18.86 21.62c-0.0278 0.3758 -0.197 0.7271 -0.4735 0.9832 -0.2764 0.256 -0.6397 0.3978 -1.0165 0.3968H6.63c-0.37683 0.001 -0.74006 -0.1408 -1.01653 -0.3968 -0.27647 -0.2561 -0.44565 -0.6074 -0.47347 -0.9832L3.75 5h16.5l-1.39 16.62Z"></path>
        </svg>
</IcoBase>
