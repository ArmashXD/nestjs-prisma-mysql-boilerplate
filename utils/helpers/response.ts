import { Response } from 'express';

export interface GeneralResponse {
  status: number;
  data: any;
  message: string;
}

/**
 * The `jsonResponse` function is used to send a JSON response with a specified status code, data, and
 * optional message.
 * @param {Response} res - The `res` parameter is the response object that will be sent back to the
 * client.
 * @param {number} status - The `status` parameter is the HTTP status code that will be sent in the
 * response. It indicates the success or failure of the request.
 * @param {any} data - The `data` parameter is used to pass the response data that you want to send
 * back to the client. It can be of any type, such as an object, array, string, or number.
 * @param {string} message - The `message` parameter is an optional string that represents a message to
 * be included in the JSON response. It can be used to provide additional information or context about
 * the response data. If no message is provided, it will default to `undefined`.
 * @returns a JSON response with the specified status code, data, and message.
 */
export function jsonResponse(
  res: Response,
  status: number,
  data: any,
  message: string = undefined,
) {
  return res.status(status).json({ status: true, message, data });
}

/**
 * The function `generalResponse` returns a `GeneralResponse` object with the provided status, data,
 * and message.
 * @param {number} status - The status parameter is a number that represents the status of the
 * response. It can be used to indicate whether the request was successful or not, or to provide
 * additional information about the response.
 * @param {any} data - The `data` parameter is of type `any`, which means it can accept any type of
 * data. It is used to pass the response data that needs to be returned in the `GeneralResponse`
 * object.
 * @param {string} message - The `message` parameter is a string that represents a message or
 * description related to the response. It can be used to provide additional information or context
 * about the response.
 * @returns an object of type GeneralResponse.
 */
export function generalResponse(
  status: number,
  data: any,
  message: string,
): GeneralResponse {
  return {
    status,
    data,
    message,
  };
}
