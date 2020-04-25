import "jasmine";

import { RouteMethod } from "../../enums";
import { Middleware } from "../middleware";
import { Cors } from "./cors";

describe("Cors middleware", () => {
  let middleware: Middleware;
  let getRequest: any;
  let optionsRequest: any;
  let response: any;
  let next: () => any;
  let responseHeaders: object;
  let responseStatus: number;

  beforeEach(() => {
    middleware = new Cors();
    getRequest = {
      method: RouteMethod.Get
    };
    optionsRequest = {
      method: "OPTIONS"
    };
    response = {
      header: function(key: string, value: string) { // tslint:disable-line:object-literal-shorthand
        this.headers[key] = value;
      },
      headers: {},
      sendStatus: function(code: number) { // tslint:disable-line:object-literal-shorthand
        this.status = code;
      },
      status: null
    };
    next = jasmine.createSpy();
    responseHeaders = {
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Origin": "*"
    };
    responseStatus = 200;
  });

  it("Should set the CORS headers", () => {
    middleware.apply(getRequest, response, next);

    expect(response.headers).toEqual(responseHeaders);
  });

  it("Should set the status code when the request is OPTIONS", () => {
    middleware.apply(optionsRequest, response, next);

    expect(response.status).toEqual(responseStatus);
  });

  it("Should call next function 1 time", () => {
    middleware.apply(getRequest, response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
