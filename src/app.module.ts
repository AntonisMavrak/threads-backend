import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { CommentsModule } from "./comments/comments.module";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const MONGO_USER = process.env.MONGO_USERNAME;
const MONGO_PASS = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const MONGO_CLOUD_CODE = process.env.MONGO_CLOUD_CODE;
const MONGO_DB_THREADS = process.env.MONGO_DATABASE_THREADS;

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    MongooseModule.forRoot(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}.${MONGO_CLOUD_CODE}.mongodb.net/${MONGO_DB_THREADS}?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
