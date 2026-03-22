import React, { ReactNode } from 'react'

const layout = ({children}:{children: ReactNode}) => {
  return (
    <div className='flex h-screen justify-center items-center font-sans'>{children}</div>
  )
}

export default layout