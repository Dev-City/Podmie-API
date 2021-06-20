import NodeMailer from "nodemailer";
import Ejs from "ejs";
import "babel-polyfill";

class Mailer {
  constructor() {
    //come back to this later
  }

  Transporter = async () => {
    const transporter = NodeMailer.createTransport({
      service: process.env.MAIL_TYPE,
      auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_SENDER_PASSWORD,
      },
    });

    try {
      const success = await transporter.verify();
      console.log(success);
    } catch (error) {
      console.error("first error", error);
    }

    return transporter;
  };

  SendMail = () => {
    throw new Error("this is an abstract method and must be implemented");
  };
}

export default Mailer;
