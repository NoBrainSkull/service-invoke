import AWS from 'aws-sdk'

const lambda = new AWS.Lambda()

const resolveStage = () => undefined        // TODO, we want stage to be deduced from current env. ENV_VAR ?
const resolveServiceName = () => undefined  // TODO, we want to call a lambda in the SAME service. ENV_VAR ?

export default async (FunctionName, Payload) => {
  const lambdaReturn = await lambda
    .invoke({
      FunctionName: `${resolveServiceName}-${resolveStage}-${FunctionName}`,
      Payload: JSON.stringify(Payload)
    })
    .promise()
    .catch(err => {
      console.error(`Inner lambda call failed (${FunctionName})`, err)
      throw err
    })
  return JSON.parse(lambdaReturn.Payload)
}
