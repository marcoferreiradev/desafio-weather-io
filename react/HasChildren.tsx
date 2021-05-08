import type { FC } from 'react'
import React from 'react'

const HasChildren: FC = ({ children }) => {
  return (
    <>
      <h1>HasChildren</h1>
      {children}
    </>
  )
}

export default HasChildren
