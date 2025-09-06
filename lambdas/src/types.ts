export type ResponseDTO<T> = {
  statusCode: number;
  body: T;
}


export type MintRequestHandlerDTO = {
  queryStringParameters: { dryrun: string };
  requestContext?: any;
  [key: string]: string | any;
}

export type MintResponseHandlerDTO = ResponseDTO<string>;

export type SearchRequestHandlerDTO = {
  queryStringParameters: { id: string };
  requestContext?: any;
  [key: string]: Record<string, any>;
};

export type SearchResultHandlerDTO = ResponseDTO<string>;


