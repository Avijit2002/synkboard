"use client";

import { LayerType } from "@/types/canvas";
import Rectangle from "./Rectangle";
import { PointerEvent } from "react";
import { Layer } from "@repo/common";

type Props = {
  layer: Layer;
   onLayerPointerDown : (e: PointerEvent<SVGRectElement>, layerId: string) => void;
  // onLayerPointerUp: (e: PointerEvent) => void
  selectionColor: string | null
};

const CanvasLayer = ({ layer,selectionColor,onLayerPointerDown }: Props) => {

  switch (layer.type) {
    case LayerType.Rectangle: {
        return(
           <Rectangle layer={layer} selectionColor={selectionColor} onLayerPointerDown={onLayerPointerDown}/>
        )
    }
  }
};

export default CanvasLayer;
