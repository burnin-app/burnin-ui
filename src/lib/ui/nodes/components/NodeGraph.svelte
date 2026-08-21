<script lang="ts">
  import { onMount } from 'svelte';
  import { ngState } from '../states/nodegraph.svelte';
  import Node from "./Node.svelte";
  import Connection from './Connection.svelte';

  let canvasEl: HTMLDivElement;

  onMount(() => {
    ngState.canvasEl = canvasEl;
  });
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
        <Connection/>
      {#each ngState.nodes as node (node.id)}
          <Node node={node}/>
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

  .toolbar {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 10;
    display: flex;
    gap: 10px;
    align-items: center;
    background: #fff;
    padding: 8px 10px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    font-family: system-ui, sans-serif;
    max-width: calc(100vw - 24px);
  }

  .toolbar button {
    border: 1px solid #ddd;
    background: #f8f8f8;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 13px;
    flex-shrink: 0;
  }

  .toolbar button:hover {
    background: #eee;
  }

  .zoom-label {
    font-size: 12px;
    color: #666;
    min-width: 40px;
    flex-shrink: 0;
  }

  .style-picker {
    font-size: 12px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  .style-picker select {
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 6px;
    border: 1px solid #ddd;
    background: #f8f8f8;
    cursor: pointer;
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

  .connections-layer {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
    pointer-events: none;
  }

  .conn-line {
    fill: none;
    stroke: #94a3b8;
    stroke-width: 2;
    pointer-events: none;
  }

  .conn-hit {
    fill: none;
    stroke: transparent;
    stroke-width: 14;
    pointer-events: stroke;
    cursor: pointer;
  }

  .conn-preview {
    fill: none;
    stroke: #6366f1;
    stroke-width: 2;
    stroke-dasharray: 5 5;
    pointer-events: none;
  }


</style>
