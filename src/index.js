import AWS from 'aws-sdk'
import LambdaError from './lambda-error'

export default async (FunctionName, Payload) => {
  const lambdaReturn = await new AWS.Lambda()
    .invoke({
      FunctionName,
      Payload: JSON.stringify(Payload)
    })
    .promise()
    .catch(err => {
      console.error(`Lambda invoke failed on ${FunctionName}`, err)
      throw err
    })

  if (lambdaReturn.FunctionError) throw new LambdaError(lambdaReturn.Payload)

  return JSON.parse(lambdaReturn.Payload)
}
