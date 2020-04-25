import { TransactionType } from "../../../enums";
import { User } from "../../entities/user/user";

export interface TransactionData {
  id?: string;
  type: TransactionType;
  user: User;
  createdAt?: string;
  upddatedAt?: string;
}
