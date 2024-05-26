'use client'

import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@trussworks/react-uswds'
import { WS_LIVE_NOTIFICATIONS } from '../constants/routes'

interface Message {
  message: string
}

export default function WebSocketComponent(): JSX.Element {
  const [messageInput, setMessageInput] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  //socket environment variable URL
  const socket = new WebSocket(`${WS_LIVE_NOTIFICATIONS}`)

  //check for web browser notification enabled
  if (
    typeof Notification !== 'undefined' &&
    Notification.permission !== 'granted'
  ) {
    void Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        sendNotification()
      }
    })
  } else if (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'granted'
  ) {
    sendNotification()
  }

  useEffect(() => {
    //socket
    socket.onopen = (event) => {
      toast.success('WebSocket connected')
    }

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data)
      setMessages(receivedMessage)
      toast.success(`Message Received: ${receivedMessage.message}`, {
        theme: 'colored',
      })
    }

    setWs(socket)
    // Clean up function
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [])

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const payload = { message: messageInput }
      socket.send(JSON.stringify(payload))
      setMessages([...messages, payload])
      setMessageInput('')
      toast.info('Message Sent', {
        theme: 'colored',
      })
    } else {
      console.error('WebSocket connection not available')
    }
  }

  function sendNotification() {
    const browserString = JSON.stringify(messages)
    const browserObject = JSON.parse(browserString)

    socket.onopen = (event) => {
      console.log('websocket is connected')
    }

    const title = 'SBA Message'
    const icon = 'https://cdn-icons-png.flaticon.com/512/733/733585.png'
    const body =
      new Date().toISOString().replace(/T/, ' ').substr(0, 10) +
      ' ' +
      browserObject.message
    const notification = new Notification('Title', { body, icon })
    notification.addEventListener('click', () => {
      window.open(
        'https://www.javascripttutorial.net/web-apis/javascript-notification/',
        '_blank',
      )
    })

    // close the notification after 10 seconds
    setTimeout(() => {
      notification.close()
    }, 10 * 1000)

    // navigate to a URL
  }
  const handleInputFinished = (event: React.FocusEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value)
    event.preventDefault()
  }

  return (
    <div>
      <h4>WebSocket Component</h4>
      <input
        type="text"
        value={messageInput}
        onChange={handleInputFinished}
        placeholder="Enter your Message"
      />
      <Button
        type="button"
        onClick={sendMessage}
        style={{ marginLeft: '30px' }}
      >
        Send Message
      </Button>
      <ToastContainer />
    </div>
  )
}
