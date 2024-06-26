import { Layer } from "@repo/common";
import { PointerEvent, use } from "react";
import { rgbToHex } from "../../_utils/RgbtoHex";
import { usernameToColor } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

type Props = {
  layer: Layer;
  onLayerPointerDown: (
    e: PointerEvent<SVGRectElement>,
    layerId: string
  ) => void;
  // onPointerUp : (e:PointerEvent<SVGRectElement>) => void
  selectionColor: string | null;
};

const Rectangle = ({ layer, selectionColor, onLayerPointerDown }: Props) => {
  const { user } = useUser();
  const { x, y, height, width, fill } = layer;
  return (
    <rect
      height={height}
      width={width}
      style={{
        transform: `translate(${-height / 2}px,${-width / 2}px)`,
      }}
      x={x}
      y={y}
      fill={rgbToHex(fill)}
      strokeWidth={3}
      stroke={
        layer.selectedBy && layer.selectedBy !== user?.username
          ? usernameToColor(layer.selectedBy)
          : "transparent"
      }
      onPointerDown={(e) => onLayerPointerDown(e, layer.id)}
      //onPointerUp={(e)=>onPointerUp(e)}
      //onPointerMove={(e)=>{console.log(e)}}
    />
    
  );
};

export default Rectangle;
