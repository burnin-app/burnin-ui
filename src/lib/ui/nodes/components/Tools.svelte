<script lang="ts">
    import {ngState} from "../states/nodegraph.svelte";
</script>
<div class="toolbar">
  <button onclick={() => ngState?.addBox()}>+ Add box</button>
  <button onclick={() => ngState?.resetView()}>Reset view</button>
  {#if ngState}
    <span class="zoom-label">{Math.round(ngState.scale * 100)}%</span>
    <label class="style-picker">
      Connections:
      <select bind:value={ngState.connectionStyle}>
        <option value="straight">Straight</option>
        <option value="bezier">Bezier</option>
        <option value="nurbs">Smooth / cable</option>
      </select>
    </label>
  {/if}
</div>
