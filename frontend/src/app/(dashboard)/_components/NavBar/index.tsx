import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className='bg-color-accent w-full flex'>
        <div className='hidden lg:flex-1'>Search</div>
        <UserButton />
    </div>
  )
}

export default NavBar