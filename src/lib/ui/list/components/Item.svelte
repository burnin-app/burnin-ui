<script lang="ts">
    import  {type Snippet, getContext } from "svelte";
    import { getListContext } from "../../../context";
    import type { ListContextProps } from "../../../types";
	import { globalUIState } from "../../../globalState.svelte";

    interface ItemProps {
        children: Snippet;
        id: string;
        classes?: string;
        classStyle?: string;
        onclick?: () => void;
        ondblclick?: () => void;
        oncontextmenu?:() => void;
    }

    let { children,  id , classStyle = "", classes, onclick, ondblclick, oncontextmenu}: ItemProps = $props();

    let context: ListContextProps = getListContext();

    function handleItemClick() {
        context.selected_id = id;
        onclick?.();
    }

    function handleItemDblClick() {
      context.selected_id = id;
      ondblclick?.();
    }

    let componentId = getContext<string>("componentId");
    function handleContextMenu(e: MouseEvent){
      e.stopPropagation();
      e.preventDefault();
      oncontextmenu?.();
      globalUIState.menuPosition.x =  e.clientX;
      globalUIState.menuPosition.y =  e.clientY;
      globalUIState.activeMenuId = componentId;
      console.log(componentId);
      context.selected_id = id;
    }
</script>

<button
    class="item-wrapper {classes}"
    style={classStyle}
    class:selected={context.selected_id === id}
    onclick={handleItemClick}
    ondblclick={handleItemDblClick}
    oncontextmenu={handleContextMenu}
    data-item-id={id}
>
    {@render children()}
</button>

<style lang="scss">
    .item-wrapper {
        border: none;
        color: var(--text-color);
        width: 100%;
        height: 24px;
        /* border-radius: var(--border-radius); */
        display: flex;
        align-items: center;
        background-color: var(--list-bg-color);

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;

        &:hover {
            background-color: var(--list-bg-hover);
        }
        &.selected {
            background-color: var(--list-bg-selected);
        }
    }

    .item-wrapper:nth-child(odd) {
        background-color: var(--list-nth-bg-color);
        &:hover {
            background-color: var(--list-nth-bg-hover);
        }

        &.selected {
            background-color: var(--list-bg-selected);
        }
    }

</style>
