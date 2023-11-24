import Role from "./RoleModel";

class UserModel{
    public userId : number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: Role;
    public email: string;
}

export default UserModel;