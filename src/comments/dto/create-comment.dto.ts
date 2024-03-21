import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  userID: string;

  parentID: string | null;

  likes: number | null;
}
