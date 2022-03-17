import { GraphQLExtensionError } from '../../exceptions/GraphQLExtensionError'

const weather = async (_obj: any, _args: any) => {
  try {
    console.log('args', _args)
    console.log('args', _args.localizacao)

    return {
      clima: 'Quente',
      link: 'testando.com',
    }
  } catch (error) {
    throw new GraphQLExtensionError(error)
  }
}

export { weather }
