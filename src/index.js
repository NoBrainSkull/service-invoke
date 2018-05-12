import AWS from 'aws-sdk'

const lambda = new AWS.Lambda()

const resolveServiceName = () =>
  `${process.env.SLS_SERVICE_NAME}-${process.env.SLS_STAGE}`

export default async (FunctionName, Payload) => {
  const lambdaReturn = await lambda
    .invoke({
      FunctionName: `${resolveServiceName()}-${FunctionName}`,
      Payload: JSON.stringify(Payload)
    })
    .promise()
    .catch(err => {
      console.error(`[lambda-execute] - Inner lambda call failed (${FunctionName})`, err)
      throw err
    })
  return JSON.parse(lambdaReturn.Payload)
}
