# service-invoke

## About

This package is used in [Nutshell](https://nutshell-lab.com)'s lambda-powered micro-service template. We have a rule saying it's ok for a lambda to make a direct invokation of another **lambda ONLY IF there're both in the same service**.

That's why this package infered the current service execution context.

## Usage

> Configure your serverless.yml to inject environment variable

```yaml
provider:
  ...
  environment: # Service wide environment variables
    SLS_SERVICE_NAME: ${self:service.name} 
    SLS_STAGE: ${self:provider.stage} 
```


> Invoke in your JS File

```js
import serviceInvoke from '@nutshelllab/service-invoke'

/// ... your awesome code here
const result = await serviceInvoke('lambda-in-the-same-service', {
  // PAYLOAD
})

```


:construction: This repo has just be created :construction:
