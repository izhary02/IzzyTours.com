import Joi from "joi";

class FollowerModel{
  userId:number;
  locationId: number 

  public constructor(follower:FollowerModel){
    this.userId = follower.userId,
    this.locationId = follower.locationId
  }

  private static postFollowerValidationSchema = Joi.object({
    userId: Joi.number().required(),
    locationId: Joi.number().required(),
  });

  public validatePostFollower(): string {
    const result = FollowerModel.postFollowerValidationSchema.validate(this)
    return result.error?.message;
  }
}

export default FollowerModel