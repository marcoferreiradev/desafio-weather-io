import React, { useEffect, useState } from 'react'
import { ModalDialog } from 'vtex.styleguide'
import { canUseDOM } from 'vtex.render-runtime'

import { useLazyQuery } from 'react-apollo'

// import GET_PRODUCT_BY_COLLECTION from '../../gql/GET_PRODUCT_BY_COLLECTION.gql'
import GET_WEATHER from '../../gql/GET_WEATHER.gql'

type WeatherSuggestionProps = {
  collectionHot: string
  collectionCold: string
}

// type Product = {
//   Product: Properties
// }
// interface Properties {
//   link: String
// }

// type Weather = {
//   weather: WeatherData
// }

// type WeatherData = {
//   clima: string
//   link: string
//   promotion: string
// }

const WeatherSuggestion: StorefrontFunctionComponent<
  WeatherSuggestionProps
> = ({ collectionHot, collectionCold }) => {
  const [locationCity, setLocationCity] = useState('')
  const [modalOpen, setModalOpen] = useState(true)

  const [getWeather, { data: responseWeather }] = useLazyQuery(GET_WEATHER)

  const handleModalToggle = () => setModalOpen(!modalOpen)

  function getWeatherData(city: string) {
    if (!city) return

    const cityNormalized = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    getWeather({
      variables: {
        localizacao: cityNormalized,
        collectionHot,
        collectionCold,
      },
    })
  }

  function getCityEvent(event: any) {
    const {
      detail: { city },
    } = event
    setLocationCity(city)
  }

  useEffect(() => {
    getWeatherData(locationCity)
  }, [locationCity])

  useEffect(() => {
    if (canUseDOM) {
      const locationInStorage = localStorage.getItem('locationInStorage')
      const locationCityInStorage = locationInStorage
        ? JSON.parse(locationInStorage).city
        : ''

      locationCityInStorage && setLocationCity(locationCityInStorage)

      window.addEventListener('location-data', getCityEvent)
      return () => {
        window.removeEventListener('location-data', getCityEvent)
      }
    } else {
      return undefined
    }
  }, [])

  if (!locationCity && !responseWeather?.weather?.clima) return null

  return (
    <>
      <ModalDialog
        centered
        confirmation={{
          onClick: () => {
            window.location.href = responseWeather?.weather.link
          },
          label: 'Opa eu quero',
        }}
        cancelation={{
          onClick: handleModalToggle,
          label: 'Não valeu ',
        }}
        onClose={handleModalToggle}
        isOpen={modalOpen}
      >
        <h3 className="t-heading-3"> {responseWeather?.weather?.clima} </h3>
        <p className="t-body lh-copy mw9">
          {responseWeather?.weather?.promotion}
        </p>
      </ModalDialog>
    </>
  )
}

WeatherSuggestion.schema = {
  title: 'WeatherSuggestion',
  type: 'object',
  required: ['collectionHot', 'collectionCold'],
  properties: {
    collectionHot: {
      title: 'Coleção de calor',
      type: 'string',
    },
    collectionCold: {
      title: 'Coleção de frio',
      type: 'string',
    },
  },
}

export default WeatherSuggestion
