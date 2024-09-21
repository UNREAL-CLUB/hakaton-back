import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./User.model";


export interface DocumentModel extends Base {}
export class DocumentModel extends TimeStamps {

  @prop({ref: () => UserModel})
  owner: Ref<UserModel>

  @prop({type: String})
  text: string;

}