<script setup lang="ts">
import { ref } from 'vue'
import liff from '@line/liff'

const message = ref('')
const error = ref('')

const logged = ref(false)

interface Profile {
  userId: string
  displayName: string
  pictureUrl: string
}
const profile = ref<Profile>()

const imageUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46V2OshC7U0lQ-UA0zq59LhomvIXdTQ6rew&s'

// 顯示目標選擇器（用於選擇群組或好友的畫面），並將開發者所創建的消息發送到選定的目標
const shareTargetPicker = () => {
  liff
    .shareTargetPicker([
      {
        type: 'flex',
        altText: '您收到一則紅包訊息！',
        contents: {
          type: 'bubble',
          size: 'kilo',
          hero: {
            type: 'image',
            url: 'https://i.imgur.com/2Fbb9wM.png',
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'cover',
            action: {
              type: 'uri',
              label: 'action',
              uri: `https://liff.line.me/1657022499-njBkN1k3?auto=yes&type=image&previewUrl=${imageUrl}&downloadUrl=${imageUrl}`,
            },
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'LINE Pay 紅包',
                weight: 'bold',
                size: 'sm',
                color: '#000000',
                action: {
                  type: 'uri',
                  label: 'action',
                  uri: `https://liff.line.me/1657022499-njBkN1k3?auto=yes&type=image&previewUrl=${imageUrl}&downloadUrl=${imageUrl}`,
                },
              },
              {
                type: 'text',
                text: name + '發紅包了，限時3天！快來試試手氣！(紅包將在3天後過期並退還給好友。)',
                size: 'xs',
                wrap: true,
                offsetTop: 'md',
                action: {
                  type: 'uri',
                  label: 'action',
                  uri: `https://liff.line.me/1657022499-njBkN1k3?auto=yes&type=image&previewUrl=${imageUrl}&downloadUrl=${imageUrl}`,
                },
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
              {
                type: 'separator',
              },
              {
                type: 'button',
                style: 'link',
                action: {
                  type: 'uri',
                  label: '查看紅包狀態',
                  uri: `https://liff.line.me/1657022499-njBkN1k3?auto=yes&type=image&previewUrl=${imageUrl}&downloadUrl=${imageUrl}`,
                },
                margin: 'none',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'separator',
                    margin: 'xs',
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'icon',
                        url: 'https://i.imgur.com/QdZ0eDc.png',
                        margin: 'none',
                        offsetTop: 'sm',
                      },
                      {
                        type: 'text',
                        text: '紅包',
                        color: '#8E8E8E',
                        margin: 'sm',
                        size: 'xs',
                        offsetTop: 'xs',
                      },
                      {
                        type: 'icon',
                        url: 'https://i.imgur.com/aKbXQ9D.png',
                        margin: 'xs',
                        size: 'xs',
                        offsetTop: 'sm',
                      },
                    ],
                  },
                ],
                margin: 'sm',
              },
            ],
            flex: 0,
          },
        },
      },
    ])
    .then(function (res) {
      if (res) {
        // succeeded in sending a message through TargetPicker
        console.log(`[${res.status}] Message sent!`)
      } else {
        // sending message canceled
        console.log('TargetPicker was closed!')
      }
    })
    .catch(function (error) {
      // something went wrong before sending a message
      console.log('something wrong happen')
    })
}

// 發送訊息到聊天室
const sendMessages = () => {
  liff
    .sendMessages([
      {
        type: 'image',
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
      },
    ])
    .then(() => {
      console.log('message sent')
    })
    .catch(err => {
      console.log('error', err)
    })
}

const logout = () => {
  liff.logout()
  window.location.reload()
}

const initLiff = async () => {
  try {
    await liff.init({ liffId: import.meta.env.VITE_LIFF_ID })
    message.value = 'LIFF init succeeded.'
    logged.value = liff.isLoggedIn()

    if (liff.isLoggedIn()) {
      profile.value = (await liff.getProfile()) as Profile
    }
  } catch (e) {
    message.value = 'LIFF init failed.'
    error.value = `${e}`
  }
}
initLiff()
</script>

<template>
  <div>
    <h1>liff-playground</h1>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">
      <code>{{ error }}</code>
    </p>
    <a href="https://developers.line.biz/ja/docs/liff/" target="_blank" rel="noreferrer">
      LIFF Documentation
    </a>

    <hr />

    <p>
      logged: {{ logged }}
      <button v-if="logged" @click="logout">Logout</button>
      <button v-else @click="liff.login()">Login</button>
    </p>

    <template v-if="logged">
      <img v-if="profile" :src="profile?.pictureUrl" class="avatar" :alt="profile?.displayName" />
      <button @click="shareTargetPicker">shareTargetPicker</button>
      <button @click="sendMessages">sendMessages</button>
    </template>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.avatar {
  display: block;
  margin: 1rem auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
