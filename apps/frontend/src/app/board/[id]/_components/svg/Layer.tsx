"use client";

import { LayerType, type Layer } from "@/types/canvas";
import Rectangle from "./Rectangle";
import { PointerEvent } from "react";

type Props = {
  layer: Layer;
  onLayerPointerDown : (e: PointerEvent<SVGRectElement>, layerId: string) => void;
  onLayerPointerUp: (e: PointerEvent) => void
  selectionColor: string | null
};

const CanvasLayer = ({ layer, onLayerPointerDown,selectionColor,onLayerPointerUp }: Props) => {
   
  switch (layer.type) {
    case LayerType.Rectangle: {
        return(
           <Rectangle layer={layer} onPointerDown={onLayerPointerDown} onPointerUp={onLayerPointerUp} selectionColor={selectionColor}/>
        )
    }
  }
};

export default CanvasLayer;
