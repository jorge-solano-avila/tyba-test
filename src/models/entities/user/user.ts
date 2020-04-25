import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from "typeorm";
import { hashSync } from "bcrypt";

import { Transaction } from "../transaction/transaction";
import { UserData } from "../../interfaces/user-data/user-data";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  private _id: number;

  @Column({
    name: "name",
    length: 255,
  })
  private _name: string = null;

  @Column({
    name: "email",
    length: 255,
    unique: true,
  })
  private _email: string = null;

  @Column({
    name: "password",
    length: 255,
  })
  private _password: string = null;

  @Column({
    name: "phone",
    length: 10,
    nullable: true,
  })
  private _phone: string = null;

  @OneToMany(type => Transaction, transaction => transaction.user)
  private _transactions: Transaction[];

  @CreateDateColumn({
    type: "timestamp with time zone",
    name: "created_at",
  })
  private _createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    name: "updated_at",
  })
  private _updatedAt: Date;

  constructor(data?: UserData) {
    if (data) {
      Object.keys(data).forEach((property: string) => {
        const privateProperty = `_${property}`;
        if (privateProperty in this) {
          switch (property) {
            default:
              this[privateProperty] = data[property];
              break;
          }
        }
      });
    }
  }

  @BeforeInsert()
  hashPassword() {
    if (this._password) {
      this._password = hashSync(this._password, +process.env.BCRYPT_SALT_ROUNDS);
    }
  }

  set transactions(value: Transaction[]) {
    this._transactions = value;
  }

  get transaction(): Transaction[] {
    return this._transactions;
  }
}
