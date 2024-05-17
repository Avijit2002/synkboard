import { Layer } from "@/types/canvas";
import { PointerEvent } from "react";

type Props = {
  layer: Layer;
  onPointerDown: (e: PointerEvent, layerId: string) => void;
  selectionColor: string | null;
};

const Rectangle = ({ layer, onPointerDown, selectionColor }: Props) => {
  const { x, y, height, width, fill } = layer;
  return (
    <rect
      height={height}
      width={width}
      style={{
        transform: `translate(${x}px,${y}px)`
      }}
      x={0}
      y={0}
      fill="#000"
      strokeWidth={1}
      stroke="transparent"
      onPointerDown={(e) => onPointerDown(e, layer.id)}
    />
  );
};

export default Rectangle;
