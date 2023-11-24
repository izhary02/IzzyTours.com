import Joi from "joi";
import Role from "./role-model";

class UserModel{
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public username: string;
    public role: Role;

    public constructor(user : UserModel){
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.username = user.username;
        this.role = user.role;
    }
    

    private static postUserValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(3).max(50),
        email: Joi.string().email().required().min(7).max(80),
        password: Joi.string().required().min(4).max(128),
        username: Joi.string().required().min(4).max(50),
        role: Joi.optional(),
    });

    public static putUserValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(3).max(50),
        email: Joi.string().email().required().min(7).max(80),
        password: Joi.string().required().min(4).max(128),
        username: Joi.string().required().min(4).max(50),
        role: Joi.optional(),
    });

    public static patchUserValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().optional().min(2).max(50),
        lastName: Joi.string().optional().min(3).max(50),
        email: Joi.string().email().optional().min(7).max(80),
        password: Joi.string().optional().min(4).max(128),
        username: Joi.string().optional().min(4).max(50),
        role: Joi.optional(),
    });




    public validatePostUser(): string {
        const result = UserModel.postUserValidationSchema.validate(this)
        return result.error?.message;
    }
    public validatePutUser(): string {
        const result = UserModel.putUserValidationSchema.validate(this)
        return result.error?.message;
    }
    public validatePatchUser(): string {
        const result = UserModel.patchUserValidationSchema.validate(this)
        return result.error?.message;
    }
}
export default UserModel;