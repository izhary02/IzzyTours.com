import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../4-models/error-model";
import Role from "../4-models/role-model";
import UserModel from "../4-models/user-model";
async function register(user:UserModel):Promise<string> {
    
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
  
    // user.password = user.password

    
    // TO DO Joi Validation
    const users = await dal.fetchUsers();
    const error = await user.validatePostUser();
    
    // TO DO Unique Email  and username Validation
    const sql = `SELECT email FROM users WHERE email = ? `;
    const secondSql = `SELECT username FROM users WHERE username = ? `;
    const userMail = await dal.execute(sql,[user.email]);
    const userName = await dal.execute(secondSql,[user.username]);
    if(userMail.length !== 0){
        throw new ValidationError("this email already been taken");
    }
    if(userName.length !== 0){
        throw new ValidationError("this username already been taken");
    }
    if(error){
        throw new ValidationError(error);
    }
     else{
         user.role = Role.User;
         user.password = cyber.hash(user.password);
         users.push(user);
         const sql = `INSERT INTO users (firstName,lastName,username,email,password,role) VALUES (?,?,?,?,?,?) `
         const result: OkPacket = await dal.execute(sql,[user.firstName,user.lastName,user.username,user.email,user.password,user.role]);
         user.userId = result.insertId;
         delete user.password;
         await dal.saveUsers(users);
         
        }
    
   const token = cyber.getNewToken(user);
   return token;
  

}


// async function registerEmail(user:UserModel):Promise<string> {

//     user.email = user.email.toLowerCase();
    
//     const users = await dal.fetchUsers();
//     const usersEmail = users.find(u => u.email !== user.email);
//     if(!user){
//         throw new ValidationError("this email already been taken");
//     }
//     delete user.password;
//     const token = cyber.getNewToken(usersEmail);
//     return token;

// }


async function login(credentials:CredentialsModel):Promise<string> {

    credentials.username = credentials.username.toLowerCase();
    const errors = await credentials.validatePostCredentialsModel()
    if(errors){
        throw new UnauthorizedError(errors);
    }
    credentials.password = cyber.hash(credentials.password);
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const users = await dal.execute(sql,[credentials.username, credentials.password]);
    if (users.length === 0){
         throw new UnauthorizedError("incorrect username or password");
        };
    const user = users[0];
    delete user.password;
    const token = cyber.getNewToken(user);
    return token;
}


   export default {
    register,
    login,
    // registerEmail,
    
   } 