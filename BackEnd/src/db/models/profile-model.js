import { model } from "mongoose";
import UserSchema from "../schemas/user-schema.js";

const User = model("User", UserSchema);

class ProfileModel {
  async uploadeProfile(newUserIcon, email) {
    try {
      const updateProfile = await User.findOneAndUpdate(
        { email: email },
        { userIcon: newUserIcon },
        { new: true }
      );
      console.log("updateProfile:" + updateProfile);
      return updateProfile;
    } catch (error) {
      console.log("업로드프로필 에러 발생:" + error);
      throw new Error(error);
    }
  }
}

const profileModel = new ProfileModel();
export { profileModel };
