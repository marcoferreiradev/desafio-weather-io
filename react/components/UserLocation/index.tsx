import React, { useEffect, useState } from 'react'
import { IconCaret } from 'vtex.store-icons'
import { LocationIcon } from './components/IconLocation'
import { useCssHandles } from 'vtex.css-handles'
import './styles.css'

import ModalLocation from './components/ModalLocation'

const CSS_HANDLES = ['LocationContainer', 'LocationText', 'LocationButton']

export default function UserLocation() {
  const [openModal, setOpenModal] = useState(false)
  const [location, setLocation] = useState({
    postalCode: '',
    city: '',
  })

  useEffect(() => {
    const locationInStorage = localStorage.getItem('location')

    if (locationInStorage) {
      setLocation(JSON.parse('locationInStorage'))
    }
  }, [])

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.LocationContainer}`}>
      <LocationIcon />
      <h3
        className={`c-black-0125 t-mini ml5-s ml0-l  b ${handles.LocationText}`}
      >
        Ofertas para: {location.city ? location.city : 'São Paulo - SP'}{' '}
      </h3>
      <div
        className={handles.LocationButton}
        onClick={() => setOpenModal(true)}
      >
        <IconCaret orientation="down" />
      </div>
      {openModal && (
        <ModalLocation
          active={openModal}
          setOpenModal={setOpenModal}
          setLocation={setLocation}
        />
      )}
    </div>
  )
}
