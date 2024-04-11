import { NextApiRequest, NextApiResponse } from 'next'
import createProducer from './_producer'
import { UCMS_TOPIC } from './_topics'
import { readConfig } from './_utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
   console.log('Received request to produce message to Kafka')
   if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed')
      return
   }
   const config = readConfig('client.properties')
   const producer = createProducer(config)
   await producer.connect()
   const message = req.body
   const topic = UCMS_TOPIC

   await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }]
   })
   res.status(200).json({ message: 'Message sent to Kafka successfully' })
}
