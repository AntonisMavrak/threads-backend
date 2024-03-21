import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Comment } from "./schemas/comment.schema";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {
  }

  async create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create(({
      text: createCommentDto.text,
      parent: createCommentDto.parentID || null,
      user: createCommentDto.userID,
      likes: createCommentDto.likes || 0
    }));
    return createdComment.then((doc) => {
      return doc.populate((["user", "parent"]));
    });
  }

  findAll() {
    return this.commentModel.find().populate(["user", "parent"]).exec();
  }

  getTopLevelComments() {
    return this.commentModel.find({ parent: null }).populate(["user", "parent"]).exec();
  }

  getRepliesToComment(commentID: string) {
    return this.commentModel.find({ parent: commentID }).populate(["user", "parent"]).exec();
  }

  findOne(id: string) {
    return this.commentModel.find({ _id: new mongoose.Types.ObjectId(id) }).populate(["user", "parent"]).exec();
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
