// import { Kafka } from 'kafkajs'
// import { UCMS_TOPIC } from './topics'
// import { readConfig } from './utils'

// export async function createConsumer(
//   config: Record<string, string>,
//   UCMS_TOPIC: string,
//   onMessage: (message: { key: string; value: string }) => void,
// ) {
//   const kafka = new Kafka({
//     clientId: 'my-app',
//     brokers: [config['bootstrap.servers']],
//     ssl: true,
//     sasl: {
//       mechanism: 'plain',
//       username: config['sasl.username'],
//       password: config['sasl.password'],
//     },
//   })

//   const consumer = kafka.consumer({ groupId: 'test-group' })
//   await consumer.connect()
//   await consumer.subscribe({ topic: UCMS_TOPIC, fromBeginning: true })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       const key = message.key?.toString()
//       const value = message.value?.toString()
//       console.log(
//         `Consumed event from topic ${topic}: key = ${key} value = ${value}`,
//       )
//     },
//   })

//   return consumer
// }

// // temporary test function to consume messages from Kafka.
// // this can be tested by running the script in the node repl directly
// async function consumerExample() {
//   const configPath = './client.properties'
//   const config = readConfig(configPath)
//   config['group.id'] = 'kafka-ucms-test-group'

//   const topic = UCMS_TOPIC

//   const consumer = await createConsumer(
//     config,
//     UCMS_TOPIC,
//     ({ key, value }) => {
//       console.log(
//         `Consumed event from topic ${topic}: key = ${key} value = ${value}`,
//       )
//     },
//   )

//   process.on('SIGINT', async () => {
//     console.log('\nDisconnecting consumer ...')
//     await consumer.disconnect()
//   })
// }

// consumerExample()
//   .then((res) => console.log(res))
//   .catch((err) => {
//     console.error(`Something went wrong:\n${err}`)
//     process.exit(1)
//   })
