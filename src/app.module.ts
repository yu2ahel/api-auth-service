import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongooseConnectionOptions = {
  family: undefined,
  hints: undefined,
  localAddress: undefined,
  localPort: undefined,
  lookup: undefined,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
console.log(
  'someData',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
);
const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${encodedPassword}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
console.log('asd', uri);

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(uri, mongooseConnectionOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
