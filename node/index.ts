import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { Clients } from './clients/'

import { Service } from '@vtex/api'
import Query from './graphql/Queries/Resolver'

const TIMEOUT_MS = 800

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query,
    },
  },
  // routes: {
  // 	robots: async ctx => {
  // 		const { response: res } = ctx;
  // 		res.set("Content-Type", "text/plain");
  // 		res.body = "User-agent:*\nDisallow:/";

  // 		return (res.status = 200);
  // 	}
  // }
})
