import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-model";
import UserModel from "../4-models/user-model";

async function getAllUsers(): Promise<UserModel[]> {
  const sql = `SELECT * FROM users`;
  const users = await dal.execute(sql);
  delete users.password;
  return users;  
}

async function getOneUser(userId:number): Promise<UserModel> {
  const sql = `SELECT * FROM users WHERE userId = ?`;
  const user = await dal.execute(sql,[userId]);
  delete user.password;
  return user;   
}

async function updateFullUser(user:UserModel):Promise<UserModel> { 
  const errors = user.validatePutUser();
  if(errors) {
    throw new ValidationError(errors);
  }
  const sql = `UPDATE users SET (firstName =?,lastName=?,username=?,password=?,email=?,role=?) WHERE userId =?`;
  const result: OkPacket = await dal.execute(sql,[user.firstName,user.lastName,user.username,user.password,user.email,user.role,user.userId]);
  if(result.affectedRows === 0 ){
    throw new ResourceNotFoundError(user.userId);}
  delete user.password;
  return user;
}

async function updatePartialUser(user:UserModel):Promise<UserModel> {
  const errors = user.validatePatchUser();
  if(errors){
    throw new ValidationError(errors);
  }
  const dbUsers = await getOneUser(user.userId);
  const dbUser= dbUsers[0];

  for(const prop in user){
    if(user[prop] !== undefined){
      dbUser[prop] = user[prop];
    }
  }
  const updatedUser = await updateFullUser(dbUser);
  delete updatedUser.password;
  return updatedUser;
}

async function deleteUser(userId:number):Promise<void> {
  const sql = `DELETE FROM users WHERE userId = ?`;
  const result = await dal.execute(sql,[userId]);
  if(result.affectedRows === 0 ){
    throw new ResourceNotFoundError(userId)
  } 
}

export default {
  getAllUsers,
  getOneUser,
  updateFullUser,
  updatePartialUser,
  deleteUser,
};