import Joi from "joi";

class CredentialsModel{
  public username: string;
  public password: string;
   
  public constructor(credentials : CredentialsModel){
    this.username = credentials.username;
    this.password = credentials.password;    
  }

  private static postValidationSchema = Joi.object({
    username: Joi.string().required().min(4).max(30),
    password: Joi.string().required().min(4).max(50),    
  })

  public validatePostCredentialsModel(): string {
    const result = CredentialsModel.postValidationSchema.validate(this)
    return result.error?.message;
  }
}

export default CredentialsModel;