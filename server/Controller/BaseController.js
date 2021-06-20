import "babel-polyfill";

/**
 * this is an Interface that has the response methods and every class
 * implementing this interface must implement the methods
 */

class BaseController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /** handle response errors */
  static _responseError = (res) => {
    return res.status(400).json({ error_msg: "error" });
  };
}

export default BaseController;
