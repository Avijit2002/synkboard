"use client";

import { LayerType, type Layer } from "@/types/canvas";

type Props = {
  layer: Layer;
};

const Layer = ({ layer }: Props) => {
   
  switch (layer.type) {
    case LayerType.Rectangle: {
        return(
            <rect height={layer.height} width={layer.width} x={layer.x} y={layer.y} fill="#000" />
        )
    }
  }
};

export default Layer;
