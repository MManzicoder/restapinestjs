import { Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { Message } from '../util/message';

@Controller("auth")
export class AuthController{
  constructor(private readonly authService: AuthService) { }
  @Post("register")
  public registerUser(): Message{
    return { message: "registered successfully!" };
  }
  @Post("login")
  public loginUser(): Message{
    return { message: "successfully logged in" };
  }
}