import { usernameToColor } from "@/lib/utils";
import { useBoard } from "../_context/BoardContext";
import { useUser } from "@clerk/nextjs";

type Props = {};

const Participants = (props: Props) => {
  const { activeUsers } = useBoard()!;
  const {user} = useUser()

  return (
    <div className="absolute right-3 top-3 shadow-sm rounded-md bg-white px-3 flex items-center h-12 flex-col gap-y-3 font-bold text-xl">
      <p>Participants: {activeUsers?.length}</p>
      <ul>
        {activeUsers?.map((x)=> {
          const color = usernameToColor(x.userName)
          if(user?.username === x.userName)  return <li key={Math.random()} style={{color:`${color}`}}>You ({x.userName})</li>
          return <li key={Math.random()} style={{color:`${color}`}}>{x.userName} </li>
        })}
      </ul>
    </div>
  );
};

export default Participants;
