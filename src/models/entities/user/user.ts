import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";

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
    // if (this._password) {
    //   this._password = createHmac('sha256', this.password).digest('hex');
    // }
  }
}
