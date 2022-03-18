import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Collection extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `
    https://${context.account}.vtexcommercestable.com.br`,
      context,
      options
    )
  }

  public async getCollection(ctx: any, collectionId: any): Promise<any> {
    return this.http.get(
      `https://${ctx.params.account}.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productClusterIds:${collectionId}`
    )
  }
}
