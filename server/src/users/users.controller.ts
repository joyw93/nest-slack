import { Body, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@User() user) {
    return user;
  }

  @Post()
  postUsers(@Body() joinRequestDto: JoinRequestDto) {
    this.usersService.postUsers(
      joinRequestDto.email,
      joinRequestDto.nickname,
      joinRequestDto.password,
    );
  }

  @Post('login')
  login(@User() user) {
    return user;
  }

  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
