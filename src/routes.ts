import { NextFunction, Request, Response, Router } from "express";

import {
  Controller,
  HealthController,
} from "./controllers";
import { RouteMethod } from "./enums";

/**
 * Route definition to bind a path to API with controller.
 */
class Route {
  constructor(
    private _router: Router,
    private _path: string,
    private _controller: Controller
  ) {
    this._run = this._run.bind(this);
    this._router.route(this._path).all(this._run);
  }

  /**
   * @param request The request object to forward to the necessary microservice.
   * @param response The response object to return the client.
   * @param next The Express next function.
   */
  private async _run(request: Request, response: Response, next: NextFunction): Promise<void> {
    this._controller.request = request;
    this._controller.response = response;
    if (this._controller[request.method.toLowerCase()]) {
      let controllerResponse: { [ keys: string ]: any };
      try {
        switch (request.method) {
          case RouteMethod.Get:
            controllerResponse = await this._controller.get();
            break;
          case RouteMethod.Post:
            controllerResponse = await this._controller.post();
            break;
          case RouteMethod.Put:
            controllerResponse = await this._controller.put();
            break;
          case RouteMethod.Delete:
            controllerResponse = await this._controller.delete();
            break;
        }
      } catch (error) {
        response.status(500).send({ detail: "Internal server error." });

        return;
      }
      const parsedResponse = controllerResponse.body || null;
      response.status(controllerResponse.statusCode).send(parsedResponse);
    } else {
      next();
    }
  }
}

export const initRoutes = (router: Router): Route[] => {
  const routes = [
    new Route(router, "/health/", new HealthController()),
  ];

  return routes;
};
