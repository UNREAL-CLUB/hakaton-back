import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";



export interface UserModel extends Base {}
export class UserModel extends TimeStamps {

  @prop({type: String, unique: true, required: true})
  email: string

  @prop({type: String, unique: true, required: true})
  username: string;

  @prop({type: String, required: true})
  passwordHash: string;

  @prop({type: String})
  fullName: string;

  @prop({type: String, default: "/undefined-logo.png"})
  avatarLink: string;

  @prop({type: String, default: "USER"})
  role: string;


}

type role = "ADMIN" | "USER"