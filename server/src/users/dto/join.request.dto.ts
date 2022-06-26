import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../users.entity';

export class JoinRequestDto extends PickType(UserEntity, [
  'email',
  'nickname',
  'password',
] as const) {}
 