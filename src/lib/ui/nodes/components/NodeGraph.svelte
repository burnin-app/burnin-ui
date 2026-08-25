<script lang="ts">
  import { onMount } from 'svelte';
  import { ngState } from '../states/nodegraph.svelte';
  // import Node from "./Node.svelte";
  import Edge from './Connection.svelte';
  import type { Component } from "svelte";
  import type{ Node, Connection} from "../types";

  let canvasEl: HTMLDivElement;
  type NodeComponent = Component<{
    node: Node;
  }>;

  interface NodeGraphProps{
    nodeTypes: Record<string, NodeComponent>;
    nodes: Node[];
    edges: Connection[];
  }

  let {nodeTypes, nodes=$bindable([]), edges = $bindable([])}: NodeGraphProps = $props();

  onMount(() => {
    ngState.canvasEl = canvasEl;
    ngState.nodes = nodes;
    ngState.connections = edges;
    console.log('NODES: ', $state.snapshot(ngState.nodes));
    console.log(nodeTypes);
  });

  // $effect(() => {
  //    nodes = ngState.nodes;
  //  });
  //
  // $effect(() => {
  //   if(ngState.connections){
  //     edges = ngState.connections;
  //     console.log("updating eged");
  //   }
  // })
</script>

<svelte:window
  onmousemove={(e) => ngState?.handleWindowMouseMove(e)}
  onmouseup={(e) => ngState?.handleWindowMouseUp(e)}
/>



<!-- `A11y: Non-interactive element <div> should not be assigned mouse or keyboard event listeners.` -->
<div
  class="canvas"
  data-canvas-bg
  role="application"
  aria-label="Infinite canvas"
  tabindex="0"
  bind:this={canvasEl}
  onmousedown={(e) => ngState?.handleCanvasMouseDown(e)}
  onwheel={(e) => ngState?.handleWheel(e)}
>
  {#if ngState}
    <div
      class="world"
      data-canvas-bg
      style="transform: translate({ngState.panX}px, {ngState.panY}px) scale({ngState.scale});"
    >
        <Edge/>
      {#each ngState.nodes as node (node.id)}
          {@const NodeComponent = nodeTypes[node.type]}

            {#if NodeComponent}
              <NodeComponent node={node} />
            {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(html, body) {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  .canvas {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: var(--surface-color);
    background-image: radial-gradient(var(--bright-border-color) 1px, transparent 1px);
    background-size: 24px 24px;
    cursor: grab;
  }

  .canvas:active {
    cursor: grabbing;
  }

  .world {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    transform-origin: 0 0;
  }

</style>
