import { NextFunction, Request, Response } from "express";

/**
 * This class is meant to intercept all the requests and add necessary data.
 */
export abstract class Middleware {
  /**
   * @param request The request object to forward to the necessary microservice.
   * @param response The response object to return the microservice data.
   * @param next The Express next function.
   */
  public abstract apply(request: Request, response: Response, next: NextFunction): void | Promise<void>;
}
