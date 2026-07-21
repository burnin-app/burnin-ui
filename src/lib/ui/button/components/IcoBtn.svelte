<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import IconI from "../../../icons/Icon.svelte";
    import { type IconNames } from "../../../icons/components";

    interface IcoBtnProps extends HTMLButtonAttributes {
        icon: string;
        onclick?: () => void;
        size?: number;
        padding?: number;
        fill?: boolean;
        color?: string;
        hoveredColor?: string;
        backgroundColor?: string;
        hoveredBgColor?: string;
        border?: boolean;
    }

    let {
        icon,
        onclick,
        border = true,
        color,
        hoveredColor,
        backgroundColor,
        hoveredBgColor,
        size = 20,
        fill = false,
        ...rest
    }: IcoBtnProps = $props();

    let hovered = $state<boolean>(false);
    let output_color = $derived.by(() => {
        if (hoveredColor) {
            if (hovered) {
                return hoveredColor;
            }
        }
        return color;
    });

    let output_bg_color = $derived.by(() => {
        if (hoveredBgColor) {
            if (hovered) {
                return hoveredBgColor;
            }
        }
        return backgroundColor;
    });

    let iconsize = $derived(size * 0.5);
</script>

<button
    {onclick}
    onmouseenter={() => (hovered = true)}
    onmouseleave={() => (hovered = false)}
    onfocus={() => (hovered = true)}
    onblur={() => (hovered = false)}
    class="iconBtn-wrapper"
    style={` width: ${size}px; height:${size}px; ${border ? "" : "border: none"}; background-color: ${output_bg_color};`}
    {...rest}
>
    <IconI
        name={icon as IconNames}
        size={iconsize}
        {fill}
        color={output_color}
    />
</button>

<style lang="scss">
    .iconBtn-wrapper {
        border: none;
        background-color: var(--tab-black);
        border: 0.5px solid #737373;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;

        /* width: 30px;
        height: 30px; */
        padding: 0;
    }
</style>
