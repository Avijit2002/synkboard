import { Layer } from "@repo/common";
import { PointerEvent } from "react";
import { rgbToHex } from "../../_utils/RgbtoHex";

type Props = {
  layer: Layer;
  // onPointerDown: (e: PointerEvent<SVGRectElement>, layerId: string) => void;
  // onPointerUp : (e:PointerEvent<SVGRectElement>) => void
  selectionColor: string | null;
};

const Rectangle = ({ layer, selectionColor }: Props) => {
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
      fill={rgbToHex(fill)}
      strokeWidth={1}
      stroke="transparent"
      //onPointerDown={(e) => onPointerDown(e, layer.id)}
      //onPointerUp={(e)=>onPointerUp(e)}
      //onPointerMove={(e)=>{console.log(e)}}
    />
  );
};

export default Rectangle;
