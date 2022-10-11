import { Context, APIGatewayProxyCallback, APIGatewayEvent, SQSEvent, DynamoDBStreamEvent } from 'aws-lambda';
import AWS from 'aws-sdk';

// Instanciamos el servicio de dynamo para documentos
const dynamo = new AWS.DynamoDB.DocumentClient();

// Interface de Order
interface Order {
  orderId: string;
  nombre: string;
  direccion: string;
  pizzas: string[];
  status: string;
  fecha: Date;
}

// Función para consultar el estado del pedido con el Id de la Orden
export const consultarEstadoPedido = (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
  // Si existe parámetros en el path
  if (event.pathParameters) {
    // Obtenemos el orderId
    const orderId = event.pathParameters.orderId as string;

    // Definimos los parámetros del item a consultar
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: process.env.COMPLETED_ORDER_TABLE as string,
      Key: {
        orderId
      }
    };

    // Consultamos los parámetros en DynamoDB
    dynamo.get(params, (err, data) => {
      if (err) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            message: 'No se ha proporcionado el id de la orden del pedido'
          })
        });
      } else {
        const order = data.Item as Order;
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: `El estado de la orden: ${orderId} es ${order.status}`
          })
        });
      }
    });
  } else {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No se ha proporcionado el id de la orden del pedido'
      })
    });
  }
};
