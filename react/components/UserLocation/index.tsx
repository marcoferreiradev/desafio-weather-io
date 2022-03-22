import React, { useEffect, useState } from 'react'
import { IconCaret } from 'vtex.store-icons'
import { LocationIcon } from './components/IconLocation'
import { useCssHandles } from 'vtex.css-handles'
import { canUseDOM } from 'vtex.render-runtime'
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
    if (canUseDOM) {
      const locationInStorage = localStorage.getItem('locationInStorage')

      if (locationInStorage) {
        const data = JSON.parse(locationInStorage)
        return setLocation(data)
      }
    } else {
      return undefined
    }
  }, [])

  const handles = useCssHandles(CSS_HANDLES)

  if (!location.city && !canUseDOM) return null

  return (
    <div className={`${handles.LocationContainer}`}>
      <LocationIcon />
      <h3
        className={`c-black-0125 t-mini ml5-s ml0-l  b ${handles.LocationText}`}
      >
        Ofertas para: {location.city ? location.city : 'São Paulo - SP'}
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
