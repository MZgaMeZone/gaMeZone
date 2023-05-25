import { profileModel } from "../db/models/profile-model.js";

class ProfileService {
  constructor() {
    this.profileModel = profileModel;
  }

  //POST
  async uploadeProfile(userIcon, email) {
    return await profileModel.uploadeProfile(userIcon, email);
  }

  async deleteProfile(image, email) {
    return await profileModel.deleteProfile(image, email);
  }
}

const profileService = new ProfileService();
export { profileService };
