import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserLoginInfo, UserDocument, Student, StudentDocument } from '../students/students.model';
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import * as configs from "../../config/config";
import { makeUniqueCode } from '../util/message';


@Injectable()
export class AuthService{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>
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
      const activationcode = makeUniqueCode(30);
      newUser.activationcode = activationcode;
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
                   <a href ="http://localhost:3000/api/auth/verifyaccount/${activationcode}" style="color: #fff;  text-decoration:none; margin: 10px 200px; width: 40%; padding: 5px 25px; text-align: center; background: dodgerblue; border-radius: 5px;">Verify your account</a>
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
    try {
      const userMatch = await this.userModel.findOne({ email: user.email });
       if(!userMatch) throw new UnauthorizedException("Invalid credentials!");
      if (user.password === "") throw new UnauthorizedException("Password required!");
      const isMatch = await bcrypt.compare(user.password, userMatch.password);
      if (!isMatch) throw new UnauthorizedException("Invalid credentials!");
      if (!userMatch.active) throw new UnauthorizedException("You need to activate your account!");

      const { _id, username, email} = userMatch;
      const token = this.jwtService.sign({ _id, email, username }, {
        expiresIn: "7d"
      })
      return { token, user: { _id, username, email } };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async activateUserAccount(code: string) {
    let user = await this.userModel.findOne({ activationcode: code });
    if (!user) throw new UnauthorizedException("Invalid code check and try again!");
    user.active = true;
    user.activationcode = undefined;
    user = await user.save();
    const { _id, email, username } = user;
      const token = this.jwtService.sign({ _id, email, username }, {
        expiresIn: "7d"
      })
      return { token, user: { _id, username, email } };
  }

  async getPasswordResetLink(userEmail: UserLoginInfo) {
try {
      let user = await this.userModel.findOne({ email: userEmail.email});
  if (!user) throw new UnauthorizedException("Not found!");
  if (!user.active) throw new UnauthorizedException("You need to comfirm your email!");
    const tokenResetSecret = makeUniqueCode(30);
    user.passwordToken = tokenResetSecret;
    const { username, email } = await user.save();
const sendMailOptions = {
        to: `${email}`,
        from: configs.EmailOptions.email,
        subject: `Reset your rdevTech account password`,
        text: ``,
        html: `
        <html>
           <div style="width: 80%; margin: 0 auto;">
                   <p>Hi ${username}, you asked to change your password for your rdevTech acount!</p>
                   <a href ="http://localhost:3000/api/auth/resetpassword/${tokenResetSecret}" style="color: #fff;  text-decoration:none; margin: 10px 200px; width: 40%; padding: 5px 25px; text-align: center; background: dodgerblue; border-radius: 5px;">Rest Your Account</a>
           </div>
          </html>
        `
      }
      return this.mailerService.sendMail(sendMailOptions)
        .then(res => {
          if (res) return { message: "check your email to reset your password", statusCode: 200 };
        })
        .catch(err =>  new UnauthorizedException(err.message));
 
} catch (error) {
  throw new UnauthorizedException(error.message);
} 
  }
  async resetPassword(code: string, password) {
    const user = await this.userModel.findOne({ passwordToken: code });
    if (!user) throw new UnauthorizedException("Error occured!");
    let hashedpassword = await bcrypt.hash(password, 10);
    user.password = hashedpassword;
    user.passwordToken = undefined;
    await user.save();
    return { message: "password changed successfully!" };
  }
  async checkAuth(req, next) {
try {
      const { _id } = this.jwtService.verify(req.headers.bearer);
      const user = await this.userModel.findById(_id);
      if (!user) throw new UnauthorizedException("unauthorized");
  next();
} catch (error) {
  return new Error(error.message)
}
 }
}