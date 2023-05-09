import { UserJoiSchema } from "../validators/index.js";

class UserJoi {
  async signUpJoi(req, res, next) {
    const body = req.body;
    try {
      await UserJoiSchema.signUp.validateAsync(body);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ code: 400, message: err.message });
    }
    next();
  }

  async loginJoi(req, res, next) {
    const body = req.body;
    try {
      await UserJoiSchema.login.validateAsync(body);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ code: 400, message: err.message });
    }
    next();
  }

  async roleChangeJoi(req, res, next) {
    const body = req.body;
    try {
      await UserJoiSchema.roleChange.validateAsync(body);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ code: 400, message: err.message });
    }
    next();
  }
}

const userChecker = new UserJoi();
export { userChecker };
