import { Request, Response } from "express";

/**
 * This class is meant to receive a specific request and forward it to the necessary microservice.
 */
export abstract class Controller {
  protected _request: Request;
  protected _response: Response;

  public set request(request: Request) {
    this._request = request;
  }

  public set response(response: Response) {
    this._response = response;
  }

  /**
   * NOTE: Ideally, this method should be an asynchronous function.
   *
   * @param request The request object to forward to the necessary microservice.
   * @param response The response object to return the microservice data.
   * @return The result of any calls to the microservice.
   */
  public get?(): Promise<any>;

  /**
   * NOTE: Ideally, this method should be an asynchronous function.
   *
   * @param request The request object to forward to the necessary microservice.
   * @param response The response object to return the microservice data.
   * @return The result of any calls to the microservice.
   */
  public post?(): Promise<any>;

  /**
   * NOTE: Ideally, this method should be an asynchronous function.
   *
   * @param request The request object to forward to the necessary microservice.
   * @param response The response object to return the microservice data.
   * @return The result of any calls to the microservice.
   */
  public put?(): Promise<any>;

  /**
   * NOTE: Ideally, this method should be an asynchronous function.
   *
   * @param request The request object to forward to the necessary microservice.
   * @param response The response object to return the microservice data.
   * @return The result of any calls to the microservice.
   */
  public delete?(): Promise<any>;
}
