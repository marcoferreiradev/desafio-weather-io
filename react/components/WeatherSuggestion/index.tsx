import React, { useState } from 'react'
import { ModalDialog } from 'vtex.styleguide'

import { useQuery } from 'react-apollo'

import GET_PRODUCT_BY_COLLECTION from '../../gql/GET_PRODUCT_BY_COLLECTION.gql'

type WeatherSuggestionProps = {
  collectionHot: string
  collectionCold: string
}

type Product = {
  Product: Properties
}

interface Properties {
  link: string
}

const WeatherSuggestion: StorefrontFunctionComponent<
  WeatherSuggestionProps
> = ({ collectionHot, collectionCold }) => {
  const [modalOpen, setModalOpen] = useState(true)
  const { data } = useQuery<Product>(GET_PRODUCT_BY_COLLECTION, {
    variables: {
      collection: collectionHot,
    },
  })

  console.log('Data', data)

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
        <h3 className="t-heading-3">Está muito calor né? </h3>
        {collectionHot}
        {collectionCold}
      </ModalDialog>
    </>
  )
}

WeatherSuggestion.schema = {
  title: 'WeatherSuggestion',
  type: 'object',
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
