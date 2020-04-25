import { Connection, getConnection } from "typeorm";

import { Transaction, User } from "../../models";
import { TransactionType } from "../../enums";

export class TransactionService {
  private _connection: Connection;

  constructor() {
    this._connection = getConnection();
  }

  //#region Public methods
  async create(type: TransactionType, user: User): Promise<Transaction> {
    const transaction = new Transaction({ type, user });
    await this._connection.manager.save(transaction);

    return transaction;
  }
  //#endregion
}
