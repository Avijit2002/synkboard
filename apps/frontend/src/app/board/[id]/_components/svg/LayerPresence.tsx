import { useBoard } from "../../_context/BoardContext";
import Layer from "./Layer";

type Props = {};

const LayerPresence = (props: Props) => {
  const { canvasLayers } = useBoard()!;
  console.log(canvasLayers);

  return (
    <>
      {canvasLayers &&
        canvasLayers?.map((layer) => {
          return <Layer layer={layer} key={layer.id} />;
        })}
    </>
  );
};

export default LayerPresence;
