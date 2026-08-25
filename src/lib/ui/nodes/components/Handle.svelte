<script lang='ts'>
	import { getNodeContext } from "../context";
    import { ngState} from "../states";
	import type { NodeContextProps , HandlePosition, HandleType} from "../types";
    let context: NodeContextProps = getNodeContext();

    interface HandleProps{
      type: HandleType
      position: HandlePosition
    }

    let {type, position}: HandleProps = $props();
</script>
<div class={`connect-handle handle-${position} no-drag`} onmousedown={(e) => ngState?.startConnect(e, context.node, position, type)}></div>


<style lang="scss">
    :global(.connect-handle){
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #6366f1;
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
        opacity: 0;
        transition: opacity 0.1s ease;
        cursor: crosshair;
        z-index: 5;
    }

    :global(.box:hover .connect-handle) {
        opacity: 1;
    }

    :global(.handle-top) { top: -6px; left: 50%; transform: translateX(-50%); }
    :global(.handle-bottom) { bottom: -6px; left: 50%; transform: translateX(-50%); }
    :global(.handle-left) { left: -6px; top: 50%; transform: translateY(-50%); }
    :global(.handle-right) { right: -6px; top: 50%; transform: translateY(-50%); }

</style>
