<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let {color, strokeWidth =1., ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
      <svg width="100%" height="100%" viewBox="0 0 14 15" version="1.1">
                  <path
                      style="
                              stroke:{color};
                              stroke-width:{strokeWidth}px;
                          "
                      id="Vector"  stroke-linecap="round" stroke-linejoin="round" d="M13.5 1H8"></path>
                  <path
                      style="
                              stroke:{color};
                              stroke-width:{strokeWidth}px;
                          "
                      id="Vector_2"  stroke-linecap="round" stroke-linejoin="round" d="M13.5 4H8" ></path>
                  <path
                      style="
                              stroke:{color};
                              stroke-width:{strokeWidth}px;
                          "
                      id="Vector_3"  stroke-linecap="round" stroke-linejoin="round" d="M13.5 7H8" ></path>
                  <path
                      style="
                              stroke:{color};
                              stroke-width:{strokeWidth}px;
                          "
                      id="Vector_4"  stroke-linecap="round" stroke-linejoin="round" d="M13.5 13H8" ></path>
                  <path
                      style="
                              stroke:{color};
                              stroke-width:{strokeWidth}px;
                          "
                      id="Vector_5"  stroke-linecap="round" stroke-linejoin="round" d="M13.5 10H8" ></path>
                  <path
                      style="
                              stroke:{color};
                              stroke-width:{strokeWidth}px;
                          "
                      id="Vector_6"  stroke-linecap="round" stroke-linejoin="round" d="m0.5 1.5 0 4c0 0.27614 0.223858 0.5 0.5 0.5h4c0.27614 0 0.5 -0.22386 0.5 -0.5v-4c0 -0.27614 -0.22386 -0.5 -0.5 -0.5H1c-0.276142 0 -0.5 0.22386 -0.5 0.5Z" ></path>
                  <path
                      style="
                              stroke:{color};
                              stroke-width:{strokeWidth}px;
                          "
                      id="Vector_7"  stroke-linecap="round" stroke-linejoin="round" d="m0.5 8.5 0 4c0 0.2761 0.223858 0.5 0.5 0.5h4c0.27614 0 0.5 -0.2239 0.5 -0.5v-4c0 -0.27614 -0.22386 -0.5 -0.5 -0.5H1c-0.276142 0 -0.5 0.22386 -0.5 0.5Z" ></path>
        </svg>
</IcoBase>
