<!--
Submenu supports only one level down. Multiple sublevels need to be added
-->
<script lang="ts">
    import type { Snippet } from "svelte";
    import { Menu } from "../../../index";
    import { Root } from "..";

    interface SubMenuProps {
        children: Snippet;
        name: string;
    }

    let { children, name }: SubMenuProps = $props();

    let hovered = $state<boolean>(false);
</script>

<div
    class="submenu"
    role="menuitem"
    tabindex="0"
    onmouseenter={() => (hovered = true)}
    onmouseleave={() => (hovered = false)}
    onfocus={() => (hovered = true)}
    onblur={() => (hovered = false)}
>
    <button class="btn-wrapper">
        <Menu.Item closeOnClick={false} shortcut={">"}>
            {name}
        </Menu.Item>
    </button>

    {#if hovered}
        <div class="submenu-content">
            {@render children()}
        </div>
    {/if}
</div>

<style lang="scss">
    .submenu {
        position: relative;
        width: 100%;
    }

    .submenu-content {
        position: absolute;
        left: 100%;
        top: 0;
        min-width: var(--menu-min-width);
        background-color: var(--bg-color);
        border-radius: var(--border-radius);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        border: 1px solid var(--border-color);
        z-index: 9999;
    }
    .btn-wrapper {
        border: none;
        background-color: transparent;
        width: 100%;
        display: flex;
        padding: 0px;
        margin: 0px;
    }
</style>
