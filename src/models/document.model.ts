import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";


export interface DocumentModel extends Base {}
export class DocumentModel extends TimeStamps {

  @prop({type: String})
  owner:

  @prop({type: String})
  text: string;


}