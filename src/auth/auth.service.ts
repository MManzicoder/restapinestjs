import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from '../students/students.model';
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import * as configs from "../../config/config";

@Injectable()
export class AuthService{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) { }
  async registerUser(user) {
    try {
         const userMatch = await this.userModel.findOne({ email: user.email });
       if(userMatch) throw new UnauthorizedException("Email already exists");
       if (user.password === "") throw new UnauthorizedException("Password required!");
       if (user.password !== user.comfirmPassword) return new UnauthorizedException("Password don't match!");
       const hashedPassword = await bcrypt.hash(user.password, 10);
       const newUser = new this.userModel({
          names: user.names,
          username: user.username,
          email: user.email,
          password: hashedPassword
       })   
      const {_id, username, email} = await newUser.save();
      const token = this.jwtService.sign({ _id, username, email }, {
      expiresIn: "7d"
      })
      const sendMailOptions = {
        to: `${email}`,
        from: configs.EmailOptions.email,
        subject: `Hi ${username} verify your account`,
        text: ``,
        html: `
        <html>
           <div style="width: 80%; margin: 0 auto;">
                   <p>Hi ${username}, thank you for creating account on our platform click the link below to verify your acount!</p>
                   <a href ="http://localhost:3000/verifyaccount" style="color: #fff;  text-decoration:none; margin: 10px 200px; width: 40%; padding: 5px 25px; text-align: center; background: dodgerblue; border-radius: 5px;">Verify your account</a>
           </div>
          </html>
        `
      }
      return this.mailerService.sendMail(sendMailOptions)
        .then(res => {
          if (res) return { message: "check your email to verify your account", statusCode: 200 };
        })
        .catch(err => new UnauthorizedException(err.message));
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

 async loginUser(user) {
    
  }
  async sendEmail(user) {
    
  }
}