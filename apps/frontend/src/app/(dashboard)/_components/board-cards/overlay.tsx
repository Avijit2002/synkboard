import React from 'react'

type Props = {}

const Overlay = (props: Props) => {
  return (
    <div className='opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black relative bottom-[100%] rounded-t-lg' />
  )
}

export default Overlay