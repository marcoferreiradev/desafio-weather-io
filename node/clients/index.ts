import { IOClients } from '@vtex/api'
import Collection from './collection'
import WeatherApi from './weatherApi'

export class Clients extends IOClients {
  public get weatherApi() {
    return this.getOrSet('weatherApi', WeatherApi)
  }
  public get collection() {
    return this.getOrSet('collection', Collection)
  }
}
