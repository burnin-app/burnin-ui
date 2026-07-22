<script lang="ts">
    import type { Snippet } from "svelte";
    import { IcoBtn } from "../../../index";

    interface TitlebarProps {
        children?: Snippet;
        height?: number;
        title: string;
        os: string;
        iconsize?: number
        onClose?: () => void;
    }

    let { children, os, onClose, title, height = 30 , iconsize = 30}: TitlebarProps = $props();

    function test() {
        console.log("test");
    }
</script>

<div
    class="titlebar-wrapper"
    style={`height: ${height}px`}
    data-tauri-drag-region
>
    {#if os === "mac"}
        {@render titleBarButtons(os)}
    {/if}
    <div class="content">
        <div class="title" data-tauri-drag-region>
            {title}
        </div>
        <div class="user-data">
            {@render children?.()}
        </div>
    </div>
    {#if os === "windows"}
        {@render titleBarButtons(os)}
    {/if}
</div>

{#snippet titleBarButtons(os: string)}
    <div class="titlebar-btn-wrapper">
        <IcoBtn
            icon="ArrowUp"
            size={iconsize}
            onclick={test}
            border={false}
            backgroundColor="transparent"
            hoveredBgColor="#444"
            fill={false}
        />
        <IcoBtn
            icon="Close"
            size={iconsize}
            onclick={() => onClose?.()}
            backgroundColor="transparent"
            hoveredBgColor="#e81120"
            border={false}
            fill={false}
        />
    </div>
{/snippet}

<style lang="scss">
    .titlebar-wrapper {
        flex: 0 0 36px; /* or whatever height */
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: 1px solid var(--border-color);

        .title {
            font-size: 14px;
        }
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        gap: 10px;
        height: 100%;
    }

    .titlebar-btn-wrapper {
        display: flex;
    }
</style>
