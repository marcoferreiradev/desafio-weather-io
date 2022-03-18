import { IOClients } from '@vtex/api'
import WeatherApi from './weatherApi'

export class Clients extends IOClients {
  public get weatherApi() {
    return this.getOrSet('weatherApi', WeatherApi)
  }
}
