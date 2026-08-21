<script lang="ts">
    import { handlePoint, edgePoint, pathFor, ngState } from '../states/nodegraph.svelte';
</script>
<svg class="connections-layer" width="20000" height="20000">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L8,4 L0,8 z" fill="#94a3b8" />
        </marker>
      </defs>

      {#each ngState.connections as conn (conn.id)}
        {@const fromBox = ngState.nodes.find(b => b.id === conn.from)}
        {@const toBox = ngState.nodes.find(b => b.id === conn.to)}
        {#if fromBox && toBox}
          {@const p1 = handlePoint(fromBox, conn.fromHandle)}
          {@const p2 = handlePoint(toBox, conn.toHandle)}
          {@const d = pathFor(p1, p2, ngState.connectionStyle, conn.fromHandle, conn.toHandle)}
          <path class="conn-hit" d={d} onclick={() => ngState?.removeConnection(conn.id)}>
            <title>Click to remove</title>
          </path>
          <path class="conn-line" d={d} marker-end="url(#arrowhead)" />
        {/if}
      {/each}

      {#if ngState.connectingFrom !== null}
        {@const fromBox = ngState.nodes.find(b => b.id === ngState.connectingFrom)}
        {#if fromBox}
          {@const handle = ngState.connectingFromHandle ?? 'right'}
          {@const p1 = handlePoint(fromBox, handle)}
          {@const previewD = pathFor(p1, ngState.tempMouseWorld, "nurbs", handle, null)}
          <path class="conn-preview" d={previewD} />
        {/if}
      {/if}
    </svg>

<style lang="scss">
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
