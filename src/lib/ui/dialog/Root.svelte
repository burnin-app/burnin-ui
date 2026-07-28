<script lang="ts">
    import { type Snippet } from "svelte";
    import { onMount, onDestroy, setContext } from "svelte";
    import IcoBtn from "../button/components/IcoBtn.svelte";

    interface DialogProps {
        header: string;
        headerIcon?: string;
        children: Snippet;
        form?: boolean;
        width?: string;
        height?: string;
        onOpen?: () => void;
        onClose?: () => void;
        visible?: boolean;
        footer?: Snippet;
    }


    let { header, headerIcon, children, onClose, visible = $bindable(false), footer, form = false, onOpen, width = "500px", height = "max-content" }: DialogProps = $props();

    setContext("dialog-size", [width, height]);

    function handleClose(){
      console.log("clicked");
        onClose?.();
        visible = false;
    }

    function handleKeyDown(event: KeyboardEvent){
        if (event.key === 'Escape') {
            console.log("Escape key pressed on dialog");
            onClose?.();
            visible = false;
        }
    }

    onMount(() => {
        if (visible) {
            console.log("Dialog mounted");
            onOpen?.();
            document.addEventListener('keydown', handleKeyDown);
        }
    });


    onDestroy(() => {
        console.log("Dialog destroyed");
        document.removeEventListener('keydown', handleKeyDown);
    });
</script>

{#if visible}
<div class="dialog-wrapper" role="grid" tabindex="0">
    <div class="dialog-content" style={`width: ${width}; height: ${height};`}>
        <div class="dialog-header">
            <div class='title'>
                {#if headerIcon}
                    Test
                {/if}
                <div class="header">{header}</div>
            </div>
            <div class="buttons">
                <IcoBtn icon="Close" onclick={handleClose} border={false}/>
            </div>
        </div>

        <div class="dialog-body">
            {@render children()}
        </div>

        {#if form}
            <div class="dialog-footer">
                {@render footer?.()}
            </div>
        {/if}
    </div>
</div>
{/if}

<style>
    .dialog-wrapper {
        position: absolute;
        inset: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        align-items: flex-start;
        padding-top: 22vh;
    }

    .dialog-content {
        display: flex;
        flex-direction: column;

        background: var(--background-color);
        border: 1px solid var(--bright-border-color);
        border-radius: 10px;

        width: var(--dialog-width, 600px);
        height: var(--dialog-height, auto);

        max-width: 95%;
        max-height: 95%;

        overflow: hidden;
        box-sizing: border-box;
    }

    /* ---------- Header ---------- */

    .dialog-header {
        flex: 0 0 30px;

        display: flex;
        align-items: center;
        justify-content: space-between;


        border-bottom: 1px solid var(--border-color);
        box-sizing: border-box;
        height:30px;
        background-color: var(--bg-color);
    }

    .dialog-header .title {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 100%;
        padding: 0 14px;

    }

    .buttons{
        height: 100%;
        padding: 0 2px;
    }
    /* ---------- Body ---------- */

    .dialog-body {
        flex: 1;

        min-height: 0;

        overflow-y: auto;
        overflow-x: hidden;

        box-sizing: border-box;
    }

    /* ---------- Footer ---------- */

    .dialog-footer {
        flex: 0 0 auto;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;

        padding: 15px 20px;

        border-top: 1px solid var(--border-color);
        box-sizing: border-box;
    }
</style>
