import Swal from 'sweetalert2'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

let stompClient = null
let connected = false
let subscriptions = {}

export function connectWebSocket() {
  if (connected) return
  const socket = new WebSocket('ws://192.168.0.243:8080/ws')
  stompClient = Stomp.over(socket)
  stompClient.connect({}, () => {
    console.log('WebSocket connected')
    connected = true
  })
}

export function subscribeChat(chatRoomId, onMessageReceived) {
  if (stompClient && connected) {
    const subscription = stompClient.subscribe(`/sub/chats/${chatRoomId}`, (message) => {
      console.log('Received message:', message.body)
      onMessageReceived(JSON.parse(message.body))
    })
    subscriptions[chatRoomId] = subscription
  } else {
    console.error('WebSocket is not connected.')
  }
}

export function subscribeNotification(userId) {
  if (stompClient && connected) {
    const subscription = stompClient.subscribe(`/sub/notifications/${userId}`, (message) => {
      console.log('Received message:', message.body)
      Swal.fire({
        toast: true,
        position: 'top',
        title: `${message.body}`,
        showConfirmButton: false,
        closeOnClickOutside: true,
        timer: 1000,
        timerProgressBar: true,
        background: 'black', // Custom background color
        color: 'white', // Custom text color
        customClass: {
          popup: 'custom-toast-popup',
          title: 'custom-toast-title',
          timerProgressBar: 'custom-toast-timer-bar'
        }
      })
    })
    subscriptions[`notifications_${userId}`] = subscription
  } else {
    console.error('WebSocket is not connected.')
  }
}

export function unsubscribeChat(chatRoomId) {
  if (subscriptions[chatRoomId]) {
    subscriptions[chatRoomId].unsubscribe()
    delete subscriptions[chatRoomId]
    console.log(`Unsubscribed from chat room ${chatRoomId}`)
  } else {
    console.error(`No subscription found for chat room ${chatRoomId}`)
  }
}

export function unsubscribeNotification(userId) {
  const key = `notifications_${userId}`
  if (subscriptions[key]) {
    subscriptions[key].unsubscribe()
    delete subscriptions[key]
    console.log(`Unsubscribed from notifications for user ${userId}`)
  } else {
    console.error(`No subscription found for notifications for user ${userId}`)
  }
}

export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.disconnect(() => {
      connected = false
      subscriptions = {}
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
