import { SNS } from 'aws-sdk'
import Promise from 'bluebird'
import getSnsArn from './getSnsArn'

const publish = (credentials, readableName, messageJson) => {
  return getSnsArn(credentials, readableName)
    .then(arn => publishToSns(credentials, arn, messageJson))
}

const publishToSns = (credentials, topicArn, messageJson) => {
  const sns = new SNS(credentials)

  return new Promise((resolve, reject) => {
    sns.publish({
      TopicArn: topicArn,
      TargetArn: topicArn,
      MessageStructure: 'json'
    }, (err, res) => {
      if (err) return reject(err)
      else resolve(res)
    })
  })
}

export default publish