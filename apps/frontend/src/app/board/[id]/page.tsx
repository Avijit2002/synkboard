import React from 'react'
import Canvas from './_components/Canvas'

type Props = {
    params:{
        id: string
    }
}

const Page = ({params}: Props) => {
  return (
    <Canvas boardId={params.id}/>
  )
}

export default Page