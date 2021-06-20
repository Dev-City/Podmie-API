import "babel-polyfill";
import BaseController from "./BaseController";

class OAuthController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.req = req;
    this.res = res;
  }

  static googleAuthentication = async (req, res, next) => {
    // handle google strategy authentication
    try {
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  };
}
export default OAuthController;
