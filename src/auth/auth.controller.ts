import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { Message } from '../util/message';
import { userSignupInfo, UserLoginInfo } from '../students/students.model';

@Controller("auth")
export class AuthController{
  constructor(private readonly authService: AuthService) { }
  @Post("register")
  public registerUser( @Body() user: userSignupInfo): any{
    return this.authService.registerUser(user);
   
  }
  @Post("login")
  public loginUser(@Body() user: UserLoginInfo): any{
    return this.authService.loginUser(user);
  }
}