import { Kafka, Partitioners } from 'kafkajs'
import { readConfig } from './_utils'
import { faker } from '@faker-js/faker'
import { UCMS_TOPIC } from './_topics'

export default function createProducer(config: any) {
   const kafka = new Kafka({
      clientId: 'my-app',
      brokers: [config['bootstrap.servers']],
      ssl: true,
      sasl: {
         mechanism: 'plain',
         username: config['sasl.username'],
         password: config['sasl.password']
      }
   })

   return kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
}

// temporary test function to produce messages to Kafka.
// Produce functionality can also be run and tested in postman
// TODO remove when communication between FE and BE via Kafka is tested and working [mdev]
async function produceExample() {
   let configPath = './client.properties'
   const config = await readConfig(configPath)

   let topic = UCMS_TOPIC

   const colors = Array(10)
      .fill(0)
      .map(() => faker.color.human())
   const items = new Array(10).fill(0).map(() => faker.commerce.productName())
   const producer = createProducer(config)

   await producer.connect()

   let numEvents = 10
   for (let idx = 0; idx < numEvents; ++idx) {
      const key = colors[Math.floor(Math.random() * 10)]
      const value = items[Math.floor(Math.random() * 10)]

      await producer.send({
         topic,
         messages: [{ key, value }]
      })
   }

   await producer.disconnect()
}

produceExample().catch((err) => {
   console.error(`Something went wrong:\n${err}`)
   process.exit(1)
})
