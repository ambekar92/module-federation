import { readConfig } from '../utils'
import createProducer from '../producer'
import { UCMS_TOPIC } from '../topics'

export async function POST(req: Request, res: Response): Promise<void> {
  console.log('Received request to produce message to Kafka')
  if (req.method !== 'POST') {
    return
  }
  const config = readConfig('client.properties')
  const message = await req.json()
  const producer = createProducer(config)
  await producer.connect()

  const topic = UCMS_TOPIC

  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(message) }],
  })
  return new Response('Message sent to Kafka successfully')
}
