<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import IconI from "../../../icons/Icon.svelte";
    import { type IconNames } from "../../../icons/components";
     import { fade } from "svelte/transition";
	import { updateMenuPosition } from "../../../utils";

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
        tooltip?: string;
    }

    let {
        icon,
        onclick,
        border = true,
        color,
        hoveredColor,
        backgroundColor,
        hoveredBgColor,
        tooltip,
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

    let iconsize = $derived(size * 0.75);
    let buttonElement: HTMLButtonElement;
    let toolTipElement: HTMLDivElement;

    $effect(() => {
        if (!tooltip) return;
        if (!hovered || !buttonElement || !toolTipElement) return;
        return updateMenuPosition(buttonElement, toolTipElement ,{ padding: 10});
    });

</script>

<button
    bind:this={buttonElement}
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
{#if tooltip && hovered}
    <div class="tooltip" bind:this={toolTipElement}
        transition:fade={{ duration: 80}}
    >
        {tooltip}
    </div>
{/if}

<style lang="scss">
    .iconBtn-wrapper {
        border: none;
        background-color: var(--icon-bg);
        border: 0.5px solid #737373;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;

        /* width: 30px;
        height: 30px; */
        padding: 0;

        &:hover{
            background-color: var(--icon-bg-hovered);
        }
    }


    .tooltip{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        width: max-content;
        top: 0;
        left: 0;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        z-index: var(--menu-z-index);
        min-width: max-content;
        max-height: min(320px, calc(100vh - 16px));
        overflow-y: auto;
        padding: 4px;

        // Transition
        opacity: 0;

        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        z-index: 999999 !important;
    }

</style>
