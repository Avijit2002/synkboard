import { useBoard } from "../_context/BoardContext"

type Props = {
    
}

const Info = (props: Props) => {

  const {boardTitle} = useBoard()!
  
  return (
    <div className="absolute left-3 top-3 shadow-sm rounded-md bg-white px-3 flex items-center h-12">
        <p>Board name: {boardTitle}</p>
        {/* TODO Info */}
    </div>
  )
}

export default Info