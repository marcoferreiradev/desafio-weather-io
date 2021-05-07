import React from 'react'
import { useProduct } from 'vtex.product-context'
import type { Product } from 'vtex.product-context/react/ProductTypes'

const getProductField = (product: Product, fieldName: string) => {
  return (
    product.properties.find((item) => item.name === fieldName)?.values?.[0] ??
    ''
  )
}

const ProductCustom = () => {
  const { selectedItem, product } = useProduct() ?? {}
  let type = ''

  if (product) {
    type = getProductField(product, 'Tipo')
  }

  return (
    <>
      <h1>selected item: {selectedItem?.name}</h1>
      <h2>Tipo: {type}</h2>
    </>
  )
}

export default ProductCustom
