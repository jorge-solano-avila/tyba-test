import { Controller } from "../controller";
import { UserService } from "../../services";

/**
 * Users controller with requests to /users route.
 */
export class UsersController extends Controller {
  public async post(): Promise<any> {
    const service = new UserService();
    await service.create(this._request.body);
  }
}
