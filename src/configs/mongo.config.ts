import {ConfigService} from '@nestjs/config';
import { TypegooseModuleOptions } from '@m8a/nestjs-typegoose';


export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService)
  }

}

const getMongoString = (configService: ConfigService) =>
  'mongodb://127.0.0.1'+
  ':'+
  configService.get('MONGO_PORT')+
  '/'+
  configService.get('MONGO_DATABASE')