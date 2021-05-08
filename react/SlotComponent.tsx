import type { FC } from 'react'
import React from 'react'

interface Props {
  Text?: FC
  Image?: FC
}

const SlotComponent: FC<Props> = ({ Text, Image }) => {
  return (
    <div className="flex w-100">
      <div className="bg-red w-100">
        <h1>Left</h1>
        {!!Text && <Text />}
      </div>
      <div className="bg-blue w-100">
        <h1>Right</h1>
        {!!Image && <Image />}
      </div>
    </div>
  )
}

export default SlotComponent
