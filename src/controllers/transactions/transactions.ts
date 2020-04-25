import { Controller } from "../controller";
import { TransactionService } from "../../services";

/**
 * Users controller with requests to /users route.
 */
export class TransactionsController extends Controller {
  public async get(): Promise<any> {
    const service = new TransactionService();
  }
}
