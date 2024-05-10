import { useBoard } from "../_context/BoardContext";

type Props = {};

const Participants = (props: Props) => {
  const { activeUsers } = useBoard()!;

  return (
    <div className="absolute right-3 top-3 shadow-sm rounded-md bg-white px-3 flex items-center h-12 flex-col gap-y-3 font-bold text-xl">
      <p>Participants: {activeUsers?.length}</p>
      <ul>
        {activeUsers?.map((x)=> <li key={Math.random()}>{x}</li>)}
      </ul>
    </div>
  );
};

export default Participants;
