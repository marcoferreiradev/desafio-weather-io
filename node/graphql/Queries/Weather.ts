// import axios from 'axios';
// import { Context } from '@vtex/api'
import { GraphQLExtensionError } from '../../exceptions/GraphQLExtensionError'

const weather = async (_obj: any, _args: any, ctx: any) => {
  // const http = axios.create({
  // 	headers: {
  // 		'Content-Type': 'application/json',
  // 		'X-Vtex-Use-Https': true
  // 	}
  // });
  const {
    clients: { weatherApi, collection },
  } = ctx
  try {
    // const { data } = await http.get(`https://goweather.herokuapp.com/weather${_args.localizacao}`);

    // console.log(data);

    console.log('args', _args)
    console.log('args', _args.localizacao)

    const data = await weatherApi.getWeather(_args.localizacao)
    console.log(data)

    const dataCollection = await collection.getCollection(ctx, '206')
    console.log(dataCollection)

    return {
      clima: 'Quente',
      link: 'testando.com',
    }
  } catch (error) {
    throw new GraphQLExtensionError(error)
  }
}

export { weather }
