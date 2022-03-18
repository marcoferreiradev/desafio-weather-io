import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class WeatherApi extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://goweather.herokuapp.com`, context, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-sort-keys
        Accept: 'application/json',
        'X-Vtex-Use-Https': 'true',
      },
    })
  }
  public async getWeather(localizacao: any): Promise<any> {
    return this.http.get(
      `https://goweather.herokuapp.com/weather/${localizacao}`
    )
  }
}
