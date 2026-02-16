import 'dotenv/config'
import express from 'express'
import * as line from '@line/bot-sdk'

const app = express()
const port = 3000

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
}

const client = new line.Client(config)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/webhook', (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error(err)
      res.status(500).end()
    })
})

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  // echo back the same message
  // return client.replyMessage(event.replyToken, {
  //   type: 'text',
  //   text: event.message.text,
  // })

  // flex message
  return client.replyMessage(event.replyToken, {
    type: 'flex',
    altText: '商品選單',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        action: {
          type: 'uri',
          uri: 'https://line.me/',
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Brown Cafe ☕️',
            weight: 'bold',
            size: 'xl',
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'md',
            contents: [
              {
                type: 'icon',
                size: 'sm',
                url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png',
              },
              {
                type: 'text',
                text: '4.0',
                size: 'sm',
                color: '#999999',
                margin: 'md',
                flex: 0,
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: 'Place',
                    color: '#aaaaaa',
                    size: 'sm',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: 'Flex Tower, 7-7-4 Midori-ku, Tokyo',
                    wrap: true,
                    color: '#666666',
                    size: 'sm',
                    flex: 5,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: 'Time',
                    color: '#aaaaaa',
                    size: 'sm',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: '10:00 - 23:00',
                    wrap: true,
                    color: '#666666',
                    size: 'sm',
                    flex: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: 'CALL',
              uri: 'https://line.me/',
            },
          },
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: 'WEBSITE',
              uri: 'https://line.me/',
            },
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [],
            margin: 'sm',
          },
        ],
        flex: 0,
      },
    },
  })
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
