import type { Side, ConnectionStyle, Node, Connection, Point, EdgePoint, Size, HandlePosition, HandleType } from "../types";
// ---------------------------------------------------------------------------
// Pure geometry helpers — no state, so they're plain exported functions
// rather than methods. Import these directly wherever you need to compute
// or draw a connection path (e.g. in the component's SVG markup).
// ---------------------------------------------------------------------------

// point where the line from a box's center toward (tx,ty) crosses its border,
// plus which side of the box that point sits on
export function edgePoint(node: Node, tx: number, ty: number): EdgePoint {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy, side: 'right' };
  const halfW = node.w / 2;
  const halfH = node.h / 2;
  const scaleX = dx !== 0 ? halfW / Math.abs(dx) : Infinity;
  const scaleY = dy !== 0 ? halfH / Math.abs(dy) : Infinity;
  const s = Math.min(scaleX, scaleY);
  const side: Side = scaleX < scaleY ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'bottom' : 'top');
  return { x: cx + dx * s, y: cy + dy * s, side };
}

// fixed point for a specific handle on a node — always the midpoint of that
// side, regardless of where the other end of the connection is. This is what
// keeps a connection pinned to its handle instead of sliding around the
// border as the other node moves (which is what edgePoint() gives you).
export function handlePoint(node: Node, position: HandlePosition): Point {
  switch (position) {
    case 'top': return { x: node.x + node.w / 2, y: node.y };
    case 'bottom': return { x: node.x + node.w / 2, y: node.y + node.h };
    case 'left': return { x: node.x, y: node.y + node.h / 2 };
    case 'right': return { x: node.x + node.w, y: node.y + node.h / 2 };
  }
}

export function sideOffset(side: Side, dist: number): Point {
  switch (side) {
    case 'left': return { x: -dist, y: 0 };
    case 'right': return { x: dist, y: 0 };
    case 'top': return { x: 0, y: -dist };
    case 'bottom': return { x: 0, y: dist };
    default: return { x: 0, y: 0 };
  }
}

// build the SVG path 'd' string for a connection, given its style
export function pathFor(
  p1: Point,
  p2: Point,
  style: ConnectionStyle,
  side1: Side,
  side2: Side | null
): string {
  if (style === 'straight') {
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  }

  if (style === 'nurbs') {
    // cable/node-editor style: curve exits perpendicular to each box edge
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;
    const offsetAmt = Math.max(50, dist * 0.4);
    const o1 = sideOffset(side1, offsetAmt);
    const o2 = side2 ? sideOffset(side2, offsetAmt) : { x: 0, y: 0 };
    const c1 = { x: p1.x + o1.x, y: p1.y + o1.y };
    const c2 = { x: p2.x + o2.x, y: p2.y + o2.y };
    return `M ${p1.x} ${p1.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }

  // bezier: gentle single arc bowing away from the straight line
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const bend = dist * 0.2;
  const c1 = { x: p1.x + dx * 0.33 + nx * bend, y: p1.y + dy * 0.33 + ny * bend };
  const c2 = { x: p1.x + dx * 0.67 + nx * bend, y: p1.y + dy * 0.67 + ny * bend };
  return `M ${p1.x} ${p1.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
}

// ---------------------------------------------------------------------------
// Reactive state class (Svelte 5 runes). Must live in a `.svelte.ts` file.
// ---------------------------------------------------------------------------

export class NodeGraph {
  canvasEl =  $state<HTMLDivElement|null>(null);

  panX = $state<number>(0);
  panY = $state<number>(0);
  scale = $state<number>(1);
  isPanning = $state<boolean>(false);
  selectedId = $state<string | null>(null);

  panStartMouse: Point = $state<Point>({ x: 0, y: 0 });
  panStartOffset: Point = $state<Point>({ x: 0, y: 0 });
  dragStartBox: Point = $state<Point>({ x: 0, y: 0 });
  dragStartMouse: Point = $state<Point>({ x: 0, y: 0 });

  resizeId = $state<string | null>(null);
  resizeStartMouse: Point = $state<Point>({ x: 0, y: 0 });
  resizeStartBox = $state<Size>({ w: 0, h: 0 });

  dragId = $state<string | null>(null);
  nodes = $state<Node[]>([]);

  connectingFrom = $state<string | null>(null);
  connectingFromHandle = $state<HandlePosition | null>(null);
  connectingFromHandleType = $state<HandleType | null>(null);
  connections = $state<Connection[]>([]);
  nextConnId = $state<string>("");
  tempMouseWorld: Point = $state<Point>({ x: 0, y: 0 });
  connectionStyle = $state<ConnectionStyle>('nurbs');

  // plain DOM refs — not reactive, doesn't need to be $state
  fileInputs: Record<number, HTMLInputElement> = {};

  constructor(canvasEl: HTMLDivElement | null , nodes: Node[]) {
    this.canvasEl = canvasEl;
    this.nodes = nodes;
    // this.nodes = [
    //   { id: "1", x: 100, y: 100, w: 280, h: 200, text: 'Double click to edit me!'},
    //   { id: "2", x: 480, y: 260, w: 260, h: 160, text: 'Drag from the dots to connect boxes'}
    // ];
  }

  // ---------- helpers ----------
  screenToWorldDelta(dx: number, dy: number) {
    return { dx: dx / this.scale, dy: dy / this.scale };
  }

  worldPointFromEvent(e: MouseEvent): Point {
    const rect = this.canvasEl?.getBoundingClientRect();

    if (!rect) {
      const point: Point = { x: 0, y: 0 };
      return point;
    } else {
      return {
        x: (e.clientX - rect.left - this.panX) / this.scale,
        y: (e.clientY - rect.top - this.panY) / this.scale
      };
    }
  }

  boxUnderPoint(pt: Point): Node | undefined {
    return this.nodes.find(
      b => pt.x >= b.x && pt.x <= b.x + b.w && pt.y >= b.y && pt.y <= b.y + b.h
    );
  }

  // ---------- box lifecycle ----------
  addBox() {
    // const rect = this.canvasEl?.getBoundingClientRect();
    // const cx = rect ? (rect.width / 2 - this.panX) / this.scale - 140 : 100;
    // const cy = rect ? (rect.height / 2 - this.panY) / this.scale - 100 : 100;
    // const id = crypto.randomUUID();
    // this.nodes = [
    //   ...this.nodes,
    //   { id: id, x: cx, y: cy, w: 280, h: 200}
    // ];
    // this.selectedId = id;
  }

  removeBox(id: string) {
    this.nodes = this.nodes.filter(b => b.id !== id);
    this.connections = this.connections.filter(c => c.from !== id && c.to !== id);
    if (this.selectedId === id) this.selectedId = null;
  }

  resetView() {
    this.scale = 1;
    this.panX = 0;
    this.panY = 0;
  }

  // ---------- panning ----------
  handleCanvasMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const onBg = target === this.canvasEl || target.dataset.canvasBg !== undefined;

    // middle-click (anywhere, including over a node) pans the canvas
    if (e.button === 1) {
      e.preventDefault();
      this.isPanning = true;
      this.panStartMouse = { x: e.clientX, y: e.clientY };
      this.panStartOffset = { x: this.panX, y: this.panY };
      return;
    }

    // left-click on empty canvas just clears the selection — no panning
    if (e.button === 0 && onBg) {
      this.selectedId = null;
    }
  }

  // ---------- box dragging ----------
  startDragBox(e: MouseEvent, node: Node) {
    const target = e.target as HTMLElement;
    console.log("dragging, " ,node.id);
    if (target.closest('.no-drag')) return;
    e.stopPropagation();
    this.selectedId = node.id;
    this.dragId = node.id;
    this.dragStartMouse = { x: e.clientX, y: e.clientY };
    this.dragStartBox = { x: node.x, y: node.y };
  }

  // ---------- box resizing ----------
  startResize(e: MouseEvent, node: Node) {
    e.stopPropagation();
    e.preventDefault();
    this.resizeId = node.id;
    this.resizeStartMouse = { x: e.clientX, y: e.clientY };
    this.resizeStartBox = { w: node.w, h: node.h };
  }

  // ---------- connecting two boxes ----------
  startConnect(e: MouseEvent, node: Node, handle: HandlePosition, fromType: HandleType) {
    e.stopPropagation();
    e.preventDefault();
    this.connectingFrom = node.id;
    this.connectingFromHandle = handle;
    this.connectingFromHandleType = fromType;
    this.tempMouseWorld = this.worldPointFromEvent(e);
  }

  removeConnection(id: string) {
    this.connections = this.connections.filter(c => c.id !== id);
  }

  // ---------- global mouse handlers ----------
  handleWindowMouseMove(e: MouseEvent) {
    if (this.isPanning) {
      this.panX = this.panStartOffset.x + (e.clientX - this.panStartMouse.x);
      this.panY = this.panStartOffset.y + (e.clientY - this.panStartMouse.y);
      return;
    }
    if (this.dragId !== null) {
      const { dx, dy } = this.screenToWorldDelta(
        e.clientX - this.dragStartMouse.x,
        e.clientY - this.dragStartMouse.y
      );
      this.nodes = this.nodes.map(b =>
        b.id === this.dragId ? { ...b, x: this.dragStartBox.x + dx, y: this.dragStartBox.y + dy } : b
      );
      return;
    }
    if (this.resizeId !== null) {
      const { dx, dy } = this.screenToWorldDelta(
        e.clientX - this.resizeStartMouse.x,
        e.clientY - this.resizeStartMouse.y
      );
      this.nodes = this.nodes.map(b =>
        b.id === this.resizeId
          ? {
              ...b,
              w: Math.max(140, this.resizeStartBox.w + dx),
              h: Math.max(100, this.resizeStartBox.h + dy)
            }
          : b
      );
      return;
    }
    if (this.connectingFrom !== null) {
      this.tempMouseWorld = this.worldPointFromEvent(e);
    }
  }

  handleWindowMouseUp(e: MouseEvent) {
    if (this.connectingFrom !== null) {
      const pt = this.worldPointFromEvent(e);
      const target = this.boxUnderPoint(pt);
      console.log("target", target);
      if (target && target.id !== this.connectingFrom) {
        const exists = this.connections.some(
          c =>
            (c.from === this.connectingFrom && c.to === target.id) ||
            (c.from === target.id && c.to === this.connectingFrom)
        );
        if (!exists) {
          // pin the target end to whichever side of the target box the
          // mouse was dropped nearest to — computed once, here, rather than
          // re-derived every render (which is what caused the sliding).
          const toHandle = edgePoint(target, pt.x, pt.y).side as HandlePosition;
          this.connections = [
            ...this.connections,
            {
              id: this.nextConnId,
              from: this.connectingFrom,
              to: target.id,
              fromHandle: this.connectingFromHandle ?? 'right',
              toHandle
            }
          ];
          this.nextConnId += 1;
        }
      }
      this.connectingFrom = null;
      this.connectingFromHandle = null;
    }
    this.isPanning = false;
    this.dragId = null;
    this.resizeId = null;
  }

  // ---------- zoom ----------
  handleWheel(e: WheelEvent) {
    e.preventDefault();
    const rect = this.canvasEl?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const oldScale = this.scale;
    const delta = -e.deltaY * 0.001;
    const newScale = Math.min(3, Math.max(0.2, oldScale * (1 + delta)));

    const worldX = (mouseX - this.panX) / oldScale;
    const worldY = (mouseY - this.panY) / oldScale;
    this.panX = mouseX - worldX * newScale;
    this.panY = mouseY - worldY * newScale;
    this.scale = newScale;
  }

  // ---------- images ----------
  triggerImageUpload(id: number) {
    this.fileInputs[id]?.click();
  }
}


export const ngState = new NodeGraph(null, []);
