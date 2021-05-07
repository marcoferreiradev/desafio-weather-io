import React from 'react'
import { FormattedMessage } from 'react-intl'

interface Banner {
  img: string
  text: string
  date?: string
}

interface Props {
  banners: Banner[]
}

const HelloWorld: StorefrontFunctionComponent<Props> = ({ banners }) => {
  return (
    <div className="hello-world-component">
      <h1>
        <FormattedMessage id="store/sandbox.helloworld" />
      </h1>
      <h2>props:</h2>
      <ul>
        {banners.map(({ img, text, date }, index) => {
          return (
            <li key={index}>
              Banner {index}
              <ul>
                <li>{img}</li>
                <li>{text}</li>
                <li>{date}</li>
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

HelloWorld.defaultProps = {
  banners: [
    {
      img: '/arquivos/logo-vtex.png?v=636346877593270000',
      text: 'text 1',
      date: '2020-04-01T15:00:00.000Z',
    },
    {
      img: '/arquivos/logo-vtex.png?v=636346877593270000',
      text: 'text 2',
      date: undefined,
    },
  ],
}

HelloWorld.getSchema = () => {
  return {
    title: 'HelloWorld',
    description: 'Hello World Component',
    type: 'object',
    properties: {
      banners: {
        type: 'array',
        title: 'Banners',
        items: {
          type: 'object',
          title: 'Banner',
          properties: {
            text: {
              type: 'string',
              title: 'store/sandbox.text',
              default: HelloWorld.defaultProps?.banners?.[0].text ?? '',
            },
            img: {
              type: 'string',
              title: 'store/sandbox.image',
              widget: {
                'ui:widget': 'image-uploader',
              },
              default: HelloWorld.defaultProps?.banners?.[0].img ?? '',
            },
            date: {
              type: 'string',
              format: 'date-time',
              title: 'store/sandbox.date',
              widget: {
                'ui:widget': 'datetime',
              },
              default: HelloWorld.defaultProps?.banners?.[0].date ?? '',
            },
          },
        },
      },
    },
  }
}

export default HelloWorld
