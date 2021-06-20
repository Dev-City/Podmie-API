import Ejs from "ejs";
import "babel-polyfill";
import Mailer from "./Mailer";

class VerificationMail extends Mailer {
  constructor() {
    //come back to this later
    super();
  }

  SendMail = async (reciever_mail, data) => {
    try {
      const ejs_data = await Ejs.renderFile(
        `${__dirname}/../Views/emails/Verification.Email.ejs`,
        { data }
      );

      //reciever details
      const mailOptions = {
        from: process.env.MAIL_NAME,
        to: reciever_mail,
        subject: "Account Verification",
        html: ejs_data,
      };

      //send message
      const info = await (await this.Transporter()).sendMail(mailOptions);
      console.log(info);
    } catch (error) {
      console.error(error);
    }
  };
}

export default VerificationMail;
