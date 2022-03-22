import type { FC, Dispatch, SetStateAction } from 'react'
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Button, Input, Modal } from 'vtex.styleguide'

const CSS_HANDLES = [
  'ModalLocationContainer',
  'ModalLocationContent',
  'ModalLocationForm',
  'ModalLocationInput',
]

type location = {
  postalCode: string
  city: string
}
interface Props {
  active?: Boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setLocation: Dispatch<SetStateAction<location>>
}

const ModalLocation: FC<Props> = ({ active, setOpenModal, setLocation }) => {
  const [postalCodeInput, setPostalCodeInput] = useState(null)
  const handles = useCssHandles(CSS_HANDLES)

  const handleModalToggle = () => setOpenModal(!active)

  async function fetchLocation() {
    const response = await fetch(
      `/api/checkout/pub/postal-code/BRA/${postalCodeInput}`
    )
    const { city, postalCode } = await response.json()
    const locationData = {
      city,
      postalCode,
    }

    setLocation(locationData)

    localStorage.setItem('locationInStorage', JSON.stringify(locationData))

    window.dispatchEvent(
      new CustomEvent('location-data', {
        detail: {
          city,
        },
      })
    )

    handleModalToggle()
  }

  const submitForm = (ev: any) => {
    ev.preventDefault()
    ev.stopPropagation()
    fetchLocation()
  }

  return (
    <section className={handles.ModalLocationContainer}>
      {/* <article className={handles.ModalLocationContent}>
        <h2> Digite um novo CEP ou selecione um endereço </h2>
      </article> */}
      <Modal isOpen={active} onClose={handleModalToggle} size="small">
        <h2> Digite um novo CEP ou selecione um endereço </h2>
        <span>Digite seu CEP</span>
        <form onSubmit={submitForm} className="flex">
          <Input
            onChange={(e: any) => {
              setPostalCodeInput(e.target.value)
            }}
            disableUnderline
            autoFocus={true}
            placeholder={'00000-000'}
          />
          <span className="mr4">
            <Button variation="primary" size="small" type="submit">
              Ok
            </Button>
          </span>
        </form>
      </Modal>
    </section>
  )
}

export default ModalLocation
