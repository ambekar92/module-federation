// import { readConfig } from '../utils'
// import { createConsumer } from '../consumer'
// import { UCMS_TOPIC } from '../topics'

// GET functionality is out of scope for now, leaving this here, but was not tested [mdev]
// function onMessageReceived(message: { key: string; value: string }) {
//   console.log(
//     `Consumed event from topic ${UCMS_TOPIC}: key = ${message.key} value = ${message.value}`,
//   )
// }

// export async function GET(req: Request, res: Response) {
//   console.log('Received request to consume message from Kafka')
//   if (req.method !== 'GET') {
//     return
//   }
//   const config = readConfig('client.properties')
//   await createConsumer(config, UCMS_TOPIC, onMessageReceived)

//   return new Response('Message consumed from Kafka successfully')
// }
