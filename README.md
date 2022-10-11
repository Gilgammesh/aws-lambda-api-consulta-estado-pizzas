# AWS Serverless Lambda - Nodejs - Typescript - DynamoDB

Función Lambda del tipo Rest Api. Usando el framework Serverless, con Nodejs, Typescript y DynamoDB.

## Lógica

- Consultar el estado de una orden de pedido de Pizaa, usando como parámetro el orderID.
- Continuación del proyecto Pedir Pizzas <https://github.com/Gilgammesh/aws-lambda-sqs-pedir-pizzas>

## Consideraciones Previas

Necesitaremos tener instaladas en nuestra máquina local:

> **Nodejs**: versión 16.X (de preferencia la versión LTS Gallium 16.17.1)

> **Serverless**: Framework Core versión 3.2 ó superior y SDK versión 4.3 ó superior

## Instalación

Instalar dependencias del proyecto:

```sh
npm install -D
```

## Despliegue

Ejecutamos el script

```sh
npm run deploy
```

Que es equivalente al script

```sh
serverless deploy
```

## Peticiones

En la petición GET debemos enviar en la ruta el OrderId obtenido del primero proyecto o de la tabla de DynamoDB

> <https://xxxxxx.execute-api.us-east-2.amazonaws.com/dev/pedido/{orderId}>  

**Headers**: Content-Type: application/json

## Plugins

> **serverless-plugin-typescript**: Soporte de typescript para lambdas
