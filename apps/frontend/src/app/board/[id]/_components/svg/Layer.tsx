"use client";

import { LayerType, type Layer } from "@/types/canvas";
import Rectangle from "./Rectangle";
import { PointerEvent } from "react";

type Props = {
  layer: Layer;
  onLayerPointerDown : (e: PointerEvent, layerId: string) => void;
  selectionColor: string | null
};

const CanvasLayer = ({ layer, onLayerPointerDown,selectionColor }: Props) => {
   
  switch (layer.type) {
    case LayerType.Rectangle: {
        return(
           <Rectangle layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}/>
        )
    }
  }
};

export default CanvasLayer;
