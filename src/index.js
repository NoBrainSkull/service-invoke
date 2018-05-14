import AWS from 'aws-sdk'
import LambdaError from './lambda-error'

const resolveServiceName = () =>
  `${process.env.SLS_SERVICE_NAME}-${process.env.SLS_STAGE}`

export default async (FunctionName, Payload) => {
  const lambdaReturn = await new AWS.Lambda()
    .invoke({
      FunctionName: `${resolveServiceName()}-${FunctionName}`,
      Payload: JSON.stringify(Payload)
    })
    .promise()
    .catch(err => {
      console.error(`Lambda invoke failed on ${resolveServiceName()}-${FunctionName}`, err)
      throw err
    })

  if (lambdaReturn.FunctionError) throw new LambdaError(lambdaReturn.Payload)

  return JSON.parse(lambdaReturn.Payload)
}
