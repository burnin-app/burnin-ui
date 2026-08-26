<script lang="ts">
    import type { Snippet } from "svelte";
    import { IcoBtn } from "../../../index";

    interface TitlebarProps {
        children?: Snippet;
        height?: number;
        title: string;
        icon?: string;
        os: string;
        iconsize?: number
        onClose?: () => void;
        onMaximize?:() => void;
        onMinimize?:() => void;
        isMaximized: boolean;
    }

    let { children, os, icon, onClose, title, height = 30 , iconsize = 30, onMaximize, onMinimize, isMaximized}: TitlebarProps = $props();

    function handleClose(){
      onClose?.();
    }

    function handleMaximize(){
      onMaximize?.();
    }

    function handleMinimize(){
      onMinimize?.();
    }
</script>

<div
    class="titlebar-wrapper"
    style={`height:${height}px; flex:0 0 ${height}px;`}
    data-tauri-drag-region
>
    {#if os === "mac"}
        {@render titleBarButtons(os)}
    {/if}
    <div class="content">
        {#if icon}
            <div class="title-icon" data-tauri-drag-region>
                <img src={icon} alt="app-icon" data-tauri-drag-region/>
            </div>
        {/if}
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
            icon="Minimize"
            size={20}
            border={false}
            backgroundColor="transparent"
            hoveredBgColor="#444"
            fill={false}
            onclick={handleMinimize}
        />
        <IcoBtn
            icon={isMaximized ? "Box" : "UnMaximize"}
            size={20}
            border={false}
            backgroundColor="transparent"
            hoveredBgColor="#444"
            fill={false}
            onclick={handleMaximize}
        />
        <IcoBtn
            icon="Close"
            size={iconsize}
            onclick={handleClose}
            backgroundColor="transparent"
            hoveredBgColor="#e81120"
            border={false}
            fill={false}
        />
    </div>
{/snippet}

<style lang="scss">
    .titlebar-wrapper {
        flex: 0 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: 1px solid var(--border-color);
        user-select: none;
        box-sizing: border-box;
        z-index: 100;

        .title-icon{
            // height: 30px;
            height: 100%;
            padding: 5px 0px;
            // position: relative;

            img{
                width: 100%;
                height: 100%;
            }

        }

        .title {
            font-size: 14px;
            font-weight: 600;
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
        align-items: center;
        gap: 14px;
        height: 100%;
    }
</style>
