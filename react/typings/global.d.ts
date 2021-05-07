import type { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = Record<string, unknown>>
    extends FunctionComponent<P> {
    schema?: Record<string, unknown>
    getSchema?(props?: P): Record<string, unknown>
  }

  interface StorefrontComponent<
    P = Record<string, unknown>,
    S = Record<string, unknown>
  > extends Component<P, S> {
    schema?: Record<string, unknown>
    getSchema?(props: P): Record<string, unknown>
  }

  interface StorefrontElement extends ReactElement {
    schema?: Record<string, unknown>
    getSchema?(props: P): Record<string, unknown>
  }
}
