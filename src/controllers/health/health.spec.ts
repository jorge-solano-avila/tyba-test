import "jasmine";

import { Controller } from "../controller";
import { HealthController } from "./health";

describe("HealthCheck controller", () => {
  let controller: Controller;
  let controllerResponse: any;

  beforeEach(() => {
    controller = new HealthController();
    controllerResponse = {
      health: true
    };
  });

  it("Should test the API", async () => {
    const result = await controller.get();

    expect(result).toEqual(controllerResponse);
  });
});
