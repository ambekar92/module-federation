import { NextApiRequest, NextApiResponse } from 'next'
import { createConsumer } from './consumer'
import { UCMS_TOPIC } from './topics'
import { readConfig } from './utils'

// GET functionality is out of scope for now, leaving this here, but was not tested [mdev]
function onMessageReceived(message: { key: string; value: string }) {
  console.log(
    `Consumed event from topic ${UCMS_TOPIC}: key = ${message.key} value = ${message.value}`,
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('Received request to consume message from Kafka')
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed')
    return
  }
  const config = readConfig('client.properties')
  await createConsumer(config, UCMS_TOPIC, onMessageReceived)

  res.status(200).json({ message: 'Message consumed from Kafka successfully' })
}
