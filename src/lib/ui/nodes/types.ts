export type Side = 'top' | 'right' | 'bottom' | 'left';
export type ConnectionStyle = 'straight' | 'bezier' | 'nurbs';
export type HandlePosition = 'top' | 'right' | 'bottom' | 'left';
export type HandleType = "source" | "target";

export interface Node {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  data: Record<string, unknown>;
  type: string;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  // exactly which handle (dot) this connection is pinned to on each end,
  // so rendering never has to re-guess a side from geometry
  fromHandle: HandlePosition;
  toHandle: HandlePosition;
}

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface EdgePoint extends Point {
  side: Side;
}


export interface NodeContextProps{
  node: Node
}
