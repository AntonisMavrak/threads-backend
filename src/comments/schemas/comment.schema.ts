import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/schemas/user.schema";

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  text: string;
  /**
   * The User who created the comment
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
  /**
   * The parent comment, if any
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Comment" })
  parent: Comment | null;
  @Prop()
  likes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);