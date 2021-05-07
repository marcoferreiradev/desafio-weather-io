import React from 'react'
import { useProduct } from 'vtex.product-context'

const ProductCustom = () => {
  const { selectedItem } = useProduct() ?? {}

  return <h1>selected item: {selectedItem?.name}</h1>
}

export default ProductCustom
