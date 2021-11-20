import { Body, Controller, Post, Param } from "@nestjs/common";
import { AuthService } from './auth.service';
import { Message } from '../util/message';
import { userSignupInfo, UserLoginInfo } from '../students/students.model';



@Controller("api/auth")
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
  @Post("verifyaccount/:activationcode")
  public activateUserAccount(@Param("activationcode") code: string) {
    return this.authService.activateUserAccount(code);
  }
  @Post("resetpassword")
  public getPasswordResetLink(@Body() user: UserLoginInfo) :any{
   
    return this.authService.getPasswordResetLink(user);
  }
  @Post("resetpassword/:passcode")
  public resetPassword(@Param("passcode") code, @Body() user) {
   return this.authService.resetPassword(code, user);
  }
}