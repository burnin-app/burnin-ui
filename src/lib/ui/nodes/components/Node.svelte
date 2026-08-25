 <script lang="ts">
     import { ngState} from "../states";
     import { setNodeContext } from "../context";
	import type { NodeContextProps, Node } from "../types";
	import Handle from "./Handle.svelte";
	interface NodeProps{
	  node: Node
	}

     let {node}: NodeProps = $props();
     let context = $state<NodeContextProps>({
       node: node
     })
     setNodeContext(context)
 </script>
 <button
    class="box"
    class:selected={ngState.selectedId === node.id}
    style="left:{node.x}px; top:{node.y}px; width:{node.w}px; height:{node.h}px;"
    onmousedown={(e) => ngState?.startDragBox(e, node)}
>

    <Handle type="source" position="top"/>
    <Handle type="target" position="bottom"/>
    <!--
    <div class="box-header">
        <span class="drag-dots">⠿</span>
        <div class="header-actions no-drag">
        </div>
    </div>

    <div class="box-body no-drag">
    <textarea style="height: 100%;" class="no-drag" placeholder="Type something…" bind:value={node.text}></textarea>
    </div> -->

    <div class="resize-handle no-drag" onmousedown={(e) => ngState?.startResize(e, node)}></div>
</button>
<style lang="scss">
    :global(.box) {
      position: absolute;
      background: #fff;
      border: 1px solid #d8d8dc;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      font-family: system-ui, sans-serif;
      cursor: move;
      user-select: none;
    }

    .box.selected {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.35);
    }
    .box-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 8px;
      border-bottom: 1px solid #eee;
      color: #aaa;
      font-size: 12px;
    }

    .header-actions {
      display: flex;
      gap: 4px;
    }

    .header-actions button {
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 13px;
      padding: 2px 4px;
      border-radius: 4px;
    }

    .header-actions button:hover {
      background: #f0f0f0;
    }

    .box-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 8px;
      gap: 8px;
      overflow: auto;
      cursor: text;
    }

    textarea {
      flex: 0 0 auto;
      min-height: 48px;
      border: none;
      outline: none;
      resize: none;
      font-family: inherit;
      font-size: 14px;
      background: transparent;
    }

    .image-gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .thumb {
      position: relative;
      width: 64px;
      height: 64px;
    }

    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #eee;
    }

    .thumb-remove {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: none;
      background: #333;
      color: #fff;
      font-size: 10px;
      cursor: pointer;
      line-height: 18px;
      padding: 0;
    }

    .resize-handle {
      position: absolute;
      right: 2px;
      bottom: 2px;
      width: 16px;
      height: 16px;
      cursor: nwse-resize;
    }

    .resize-handle::after {
      content: '';
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 8px;
      height: 8px;
      border-right: 2px solid #bbb;
      border-bottom: 2px solid #bbb;
    }
</style>
