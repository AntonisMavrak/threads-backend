import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Error } from "mongoose";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    if (queryParams.parentID) {
      try {
        return this.commentsService.getRepliesToComment(queryParams.parentID);
      } catch (error) {
        throw new NotFoundException(
          "Parent comment not found",
          {
            cause: new Error(error.message),
            description: "The parent comment does not exist"
          }
        );
      }
    }
    return this.commentsService.getTopLevelComments();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    try {
      return this.commentsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(
        "Comment not found", {
          cause: new Error(error.message),
          description: "The comment does not exist"
        }
      );
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(+id);
  }

}
