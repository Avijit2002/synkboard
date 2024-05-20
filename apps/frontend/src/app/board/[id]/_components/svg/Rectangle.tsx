import { Layer } from "@/types/canvas";
import { PointerEvent } from "react";

type Props = {
  layer: Layer;
  onPointerDown: (e: PointerEvent<SVGRectElement>, layerId: string) => void;
  onPointerUp : (e:PointerEvent<SVGRectElement>) => void
  selectionColor: string | null;
};

const Rectangle = ({ layer, onPointerDown, selectionColor,onPointerUp }: Props) => {
  const { x, y, height, width, fill } = layer;
  return (
    <rect
      height={height}
      width={width}
      style={{
        transform: `translate(${-height/2}px,${-width/2}px)`
      }}
      x={x}
      y={y}
      fill="#000"
      strokeWidth={1}
      stroke="transparent"
      onPointerDown={(e) => onPointerDown(e, layer.id)}
      //onPointerUp={(e)=>onPointerUp(e)}
      //onPointerMove={(e)=>{console.log(e)}}
    />
  );
};

export default Rectangle;
