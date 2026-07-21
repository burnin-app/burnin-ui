<!-- <script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { fill, color, strokeWidth, ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <path
        d="M4.9753 18.8302 12 12.0005l7.0247 6.8297c0.2983 0.287 0.77 0.287 1.0683 0l2.7107-2.6353c0.2951-0.2837 0.2951-0.756 0-1.0398L12.5341 5.16979c-0.2982-0.287-0.77-0.287-1.0682 0L1.1963 15.1552c-0.295099 0.2837-0.295099 0.756 0 1.0397l2.7108 2.6353c0.2982 0.287 0.7699 0.287 1.0682 0Z"
        fill={fill ? color : "none"}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={strokeWidth}
    />
</IcoBase> -->
<script lang="ts">
    import type { SvgIconProp } from "../types";
    import IcoBase from "./IcoBase.svelte";

    let { fill, color, strokeWidth, ...rest }: SvgIconProp = $props();
</script>

<IcoBase {...rest}>
    <path
        d="M46.5,24C46.5,11.574 36.426,1.5 24,1.5C11.574,1.5 1.5,11.574 1.5,24C1.5,36.426 11.574,46.5 24,46.5C36.426,46.5 46.5,36.426 46.5,24ZM24.146,24.353C24.342,24.158 24.342,23.841 24.146,23.646L17.648,17.148C16.678,16.178 16.479,14.662 17.359,13.61C18.059,12.771 18.895,11.936 19.75,11.335C20.758,10.626 22.052,10.958 22.968,11.781C26.242,14.723 30.57,19.11 32.747,21.992C33.666,23.21 33.666,24.79 32.747,26.007C30.57,28.89 26.242,33.277 22.968,36.218C22.052,37.042 20.758,37.374 19.75,36.666C18.895,36.064 18.059,35.229 17.358,34.39C16.479,33.338 16.678,31.822 17.648,30.852L24.146,24.353Z"
        fill={fill ? color : "none"}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={strokeWidth}
    />
</IcoBase>
