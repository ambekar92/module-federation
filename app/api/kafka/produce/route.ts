import { readConfig } from '../utils'
import createProducer from '../producer'
import { UCMS_TOPIC } from '../topics'

export async function POST(req: Request, res: Response): Promise<Response> {
  console.log('Received request to produce message to Kafka')
  if (req.method !== 'POST') {
    return new Response(null, {
      status: 405, // Not allowed
      statusText: 'Method Not Allowed'
    });
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
  return new Response(
    JSON.stringify({ message: 'Message sent to Kafka successfully' }),
    {
      status: 200,
      statusText: 'Message sent to Kafka successfully',
    },
  )
}
