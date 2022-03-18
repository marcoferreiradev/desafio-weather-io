import React, { useState } from 'react'
import { ModalDialog } from 'vtex.styleguide'

import { useQuery } from 'react-apollo'

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

type Weather = {
  weather: WeatherData
}

type WeatherData = {
  clima: String
  link: String
  promotion: String
}

const WeatherSuggestion: StorefrontFunctionComponent<
  WeatherSuggestionProps
> = ({ collectionHot, collectionCold }) => {
  const [modalOpen, setModalOpen] = useState(true)

  const { data: responseWeather } = useQuery<Weather>(GET_WEATHER, {
    variables: {
      localizacao: 'Aracariguama',
      collectionHot,
      collectionCold,
    },
  })

  if (!responseWeather?.weather) return null

  const handleModalToggle = () => setModalOpen(!modalOpen)

  return (
    <>
      <ModalDialog
        centered
        confirmation={{
          onClick: handleModalToggle,
          label: 'Opa eu quero',
        }}
        cancelation={{
          onClick: handleModalToggle,
          label: 'Não valeu ',
        }}
        isOpen={modalOpen}
      >
        <h3 className="t-heading-3"> {responseWeather?.weather?.clima} </h3>
        <p className="t-body lh-copy mw9">
          {' '}
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
