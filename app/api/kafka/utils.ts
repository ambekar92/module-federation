import * as fs from 'fs'

/**
 * Reads a Kafka client configuration from a file and returns it as an object.
 *
 * @param fileName - Path to the client.properties file, which contains the Kafka client configuration.
 *
 * @example
 * An example of a client.properties file is shown below. The bootstrap.servers, username, and password are dummy values
 * and should be replaced with actual values:
 *
 *    bootstrap.servers=broker-0-abc.kafka.svc.cluster.local:9092,broker-1-abc.kafka.svc.cluster.local:9092,broker-2-abc.kafka.svc.cluster.local:9092
 *    security.protocol=SASL_SSL
 *    sasl.mechanisms=PLAIN
 *    sasl.username=my-username
 *    sasl.password=my-password
 *    # Best practice for higher availability in librdkafka clients prior to 1.7
 *    session.timeout.ms=45000
 *
 * @returns An object representing the Kafka client configuration. Each key-value pair in the configuration file
 * becomes a property on the returned object.
 */
export function readConfig(fileName: string) {
  const data = fs.readFileSync(fileName, 'utf8').toString().split('\n')
  return data.reduce((config: Record<string, string>, line) => {
    const [key, value] = line.split('=')
    if (key && value) {
      config[key.trim()] = value.trim()
    }
    return config
  }, {})
}
