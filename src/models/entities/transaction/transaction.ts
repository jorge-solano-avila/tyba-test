import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";

import { User } from "../user/user";
import { TransactionData } from "../../interfaces/transaction-data/transaction-data";
import { TransactionType } from "../../../enums";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  private _id: number;

  @Column("int", { name: "type" })
  private _type: TransactionType =  null;

  @ManyToOne(type => User, user => user.transactions)
  private _user: User = null;

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

  constructor(data?: TransactionData) {
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

  set user(value: User) {
    this._user = value;
  }

  get user(): User {
    return this._user;
  }
}
