import React, { useState } from 'react'

// temporary component to test kafka POST functionality from UI [mdev]
const TempKafkaPage = () => {
  // const [message, setMessage] = useState('')
  // console.log('message', message)
  // const sendDataToKafka = async () => {
  //   const response = await fetch('/api/kafka/produce', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ message: message }),
  //   })

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   setMessage('')
  //   const data = await response.json()
  //   console.log(data) // Message sent to Kafka successfully
  // }
  return (
    <>
      {/* <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendDataToKafka}>Send to Kafka</button> */}
    </>
  )
}

export default TempKafkaPage
