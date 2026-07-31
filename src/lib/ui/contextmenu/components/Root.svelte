<script lang="ts">
    import type { Snippet } from 'svelte';
    import {
      computePosition,
      autoUpdate,
      flip,
      shift,
      offset
    } from "@floating-ui/dom";
    import { onDestroy, tick } from "svelte";

    interface ContentMenuProps {
        trigger: boolean;
        children: Snippet;
        onOpen?: () => void;
        onClose?: () => void;
    }

    let menu: HTMLDivElement;

    let { children, trigger = $bindable(true), onOpen, onClose }: ContentMenuProps = $props();

    async function updatePosition() {
       if (!menu || !virtualEl) return;

       const { x, y } = await computePosition(
         virtualEl as any,
         menu,
         {
           placement: "bottom-start",
           middleware: [
             offset(4),
             flip(),
             shift({ padding: 8 })
           ]
         }
       );

       Object.assign(menu.style, {
         left: `${x}px`,
         top: `${y}px`
       });
     }


    // $effect(() => {

    // })
</script>

{#if trigger}
    <div class="context-menu-wrapper" bind:this={menu}>
    {@render children()}
    </div>
{/if}
<style lang="scss">
    .context-menu-wrapper{
        position: absolute;
        border-radius: var(--button-border-radius);
        background-color:red;
        left: 300px;
        top:400px;
        z-index: var(--menu-z-index);
    }
</style>
