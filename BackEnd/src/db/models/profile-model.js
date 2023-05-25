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

  async deleteProfile(image, email) {
    try {
      const deleteProfile = await User.findOneAndUpdate(
        { email: email },
        { userIcon: image },
        { new: true }
      );
      console.log("deleteProfile:" + deleteProfile);
      return deleteProfile;
    } catch (error) {
      console.log("delete 프로필 에러 발생:" + error);
      throw new Error(error);
    }
  }
}

const profileModel = new ProfileModel();
export { profileModel };
