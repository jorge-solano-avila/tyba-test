import { Connection, getConnection } from "typeorm";

import { User, UserData } from "../../models";
import { BadRequestException } from "../../exceptions";


export class UserService {
  private _connection: Connection;
  private _data: UserData;

  constructor() {
    this._connection = getConnection();
    this._data = null;
  }

  //#region Public methods
  async create(data: UserData): Promise<User> {
    if (!data) {
      throw new BadRequestException("Body is empty.");
    }

    this._data = data;
    this._validateData();
    const user = new User(this._data);
    await this._connection.manager.save(user);

    return user;
  }
  //#endregion

  //#region Private methods
  private _validateData(): void {
    const dataMock: UserData = {
      name: "Mock user",
      email: "mock@email.com",
      password: "000",
      phone: "000",
    };
    Object.keys(this._data).forEach((property: string) => {
      if (!(property in dataMock)) {
        throw new BadRequestException();
      }
    });
  }
  //#endregion
}
