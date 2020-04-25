import { Controller } from "../controller";

/**
 * Health controller with requests to /health route.
 */
export class HealthController extends Controller {
  public async get(): Promise<any> {
    return new Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
      resolve({ body: "{}", statusCode: 200});
    });
  }
}
