import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

let stompClient = null
let connected = false

export function connectWebSocket() {
  if (connected) return
  const socket = new WebSocket('ws://localhost:8080/ws')
  stompClient = Stomp.over(socket)
  stompClient.connect({}, () => {
    console.log('WebSocket connected')
    connected = true
  })
}

export function subscribeChat(chatRoomId) {
  if (stompClient && connected) {
    stompClient.subscribe(`/sub/chats/${chatRoomId}`, (message) => {
      console.log('Received message:', message.body)
    })
  } else {
    console.error('WebSocket is not connected.')
  }
}

export function subscribeNotification(userId) {
  if (stompClient && connected) {
    stompClient.subscribe(`/sub/notifications/${userId}`, (message) => {
      console.log('Received message:', message.body)
    })
  } else {
    console.error('WebSocket is not connected.')
  }
}

export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.disconnect(() => {
      connected = false
      console.log('WebSocket disconnected')
    })
  }
}

export function sendMessage(chatDto) {
  if (stompClient && connected) {
    stompClient.send('/pub/chats/send', {}, JSON.stringify(chatDto))
  } else {
    console.error('WebSocket is not connected.')
  }
}
