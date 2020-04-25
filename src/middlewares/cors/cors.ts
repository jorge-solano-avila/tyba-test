import { NextFunction, Request, Response } from "express";

import { Middleware } from "../middleware";

/**
 * CORS middleware with the response headers to accept response in a navigator.
 */
export class Cors extends Middleware {
  public apply(request: Request, response: Response, next: NextFunction): void {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    response.header("Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization");

    if (request.method === "OPTIONS") {
      response.sendStatus(200);
    }
    next();
  }
}
