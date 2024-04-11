import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function WebSocketComponent(): JSX.Element {
   const [message, setMessage] = useState('')
   const [ws, setWs] = useState(null)
   const [getValue, setValue] = useState('')

   useEffect(() => {
      // Establish WebSocket connection to the echo server
      const socket = new WebSocket('wss://echo.websocket.org')

      // Set up event listeners
      socket.onopen = () => {
         console.log('WebSocket connected')
         toast.success('WebSocket connected', {
            theme: 'colored'
         })
      }

      socket.onmessage = (event) => {
         console.log('>> event', event)

         setMessage(event.data)
         toast.success('Message Received: ' + event.data, {
            theme: 'colored'
         })
      }

      socket.onclose = () => {
         console.log('WebSocket disconnected')
      }

      // Save WebSocket instance to state
      setWs(socket)

      // Clean up function
      return () => {
         if (socket) {
            socket.close()
         }
      }
   }, []) // Empty dependency array ensures useEffect runs only once on component mount

   const sendMessage = () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
         // Check if WebSocket connection is open before sending message
         toast.info('Message Sent', {
            theme: 'colored'
         })

         ws.send(getValue)
      } else {
         console.error('WebSocket connection not available')
      }
   }

   return (
      <div>
         <hr />
         <h4>WebSocket Component</h4>
         <input
            type="text"
            value={getValue}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter your Message"
         />
         <button onClick={sendMessage} style={{ marginLeft: '30px' }} disabled={getValue === ''}>
            Send Message
         </button>

         {/* <p><b>Received message:</b> {message}</p> */}
      </div>
   )
}
