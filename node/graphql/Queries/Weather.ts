import { GraphQLExtensionError } from '../../exceptions/GraphQLExtensionError'

const TEMPERATURE_CONSIDERED_HEAT = 16

const weather = async (_obj: any, _args: any, ctx: any) => {
  const {
    clients: { weatherApi, collection },
  } = ctx
  try {
    const { localizacao, collectionHot, collectionCold } = _args
    const { temperature } = await weatherApi.getWeather(localizacao)
    const temperatureSanitized = +temperature.replace(/\D/g, '')
    const isHot = temperatureSanitized >= TEMPERATURE_CONSIDERED_HEAT

    async function getDataCollection(collectionId: string) {
      return await collection.getCollection(ctx, collectionId)
    }

    const [productsHot, productsCold] = await Promise.all([
      getDataCollection(collectionHot),
      getDataCollection(collectionCold),
    ])

    function getRandomProductUrl(products: any[]) {
      const randomItem = Math.floor(Math.random() * products.length)
      return `${products[randomItem].linkText}/p`
    }

    function climate(climate: string) {
      const optionsClimate: any = {
        hot: {
          clima: 'Está muito calor né?',
          promotion: 'Que tal um sorvetinho?',
          link: getRandomProductUrl(productsHot),
        },
        cold: {
          clima: 'Está muito Frio né?',
          promotion: 'Vai Chá quentinho?',
          link: getRandomProductUrl(productsCold),
        },
      }
      return optionsClimate[climate] || optionsClimate['cold']
    }

    if (isHot) {
      return climate('hot')
    } else {
      return climate('cold')
    }
  } catch (error) {
    throw new GraphQLExtensionError(error)
  }
}

export { weather }
