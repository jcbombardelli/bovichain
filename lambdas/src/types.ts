export type ResponseDTO<T> = {
  statusCode: number;
  body: T;
}


export type MintRequestHandlerDTO = any
export type MintResponseHandlerDTO = ResponseDTO<string>;

export type SearchRequestHandlerDTO = {
  queryStringParameters: { id: string };
  requestContext?: any;
  [key: string]: Record<string, any>;
};
export type SearchResultHandlerDTO = ResponseDTO<string>;


