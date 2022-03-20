import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Button, Input, Modal } from 'vtex.styleguide'

const CSS_HANDLES = [
  'ModalLocationContainer',
  'ModalLocationContent',
  'ModalLocationForm',
  'ModalLocationInput',
]

interface Props {
  active?: Boolean
}

const ModalLocation: FC<Props> = ({ active }) => {
  const [postalCode, setPostalCode] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handles = useCssHandles(CSS_HANDLES)

  const handleModalToggle = () => setModalOpen(!modalOpen)

  const submitForm = (ev: any) => {
    ev.preventDefault()
    ev.stopPropagation()
  }

  useEffect(() => {
    console.log('Postal code', postalCode)
  }, [postalCode])

  return (
    <section className={handles.ModalLocationContainer}>
      {/* <article className={handles.ModalLocationContent}>
        <h2> Digite um novo CEP ou selecione um endereço </h2>
      </article> */}
      <Modal
        isOpen={active}
        onClose={handleModalToggle}
        size="small"
        className="testando45"
      >
        <h2> Digite um novo CEP ou selecione um endereço </h2>
        <span>Digite seu CEP</span>
        <form onSubmit={submitForm} className="flex">
          <Input
            onChange={(e: any) => {
              setPostalCode(e.target.value)
            }}
            disableUnderline
            autoFocus={true}
            placeholder={'00000-000'}
          />
          <span className="mr4">
            <Button variation="primary" size="small">
              Ok
            </Button>
          </span>
        </form>
      </Modal>
    </section>
  )
}

export default ModalLocation
