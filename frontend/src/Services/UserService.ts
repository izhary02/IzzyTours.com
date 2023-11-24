import axios from "axios";
import store from "../Redux/Store";
import config from "../Utils/Config";
import UserModel from "../Models/UserModel";
import { addUserAction, deleteUserAction, fetchUsersAction, updateUserAction } from "../Redux/UserState";
import Role from "../Models/RoleModel";

class UserService {

    
    public async getAllUsers(): Promise<UserModel[]> {
        let users = store.getState().usersState.users;
        if (users.length === 0) {
            const response = await axios.get<UserModel[]>(config.usersUrl);
            users = response.data;
            store.dispatch(fetchUsersAction(users)); 
        }
        return users;
    }

   
    public async getOneUser(id: number): Promise<UserModel> {
        const users = await this.getAllUsers();
        const user = users.find(l => l.userId === id);
        return user;
    }

    public async getUserRole(id: number): Promise<Role> {
        const users = await this.getAllUsers();
        const user = users.find(l => l.userId === id);
        const role = user.role
        return role;
    }


    public async addUser(user: UserModel): Promise<UserModel> {
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email); 
        formData.append("username", user.username) 
        formData.append("password", user.password.toString()) 
        formData.append("role", user.role) 
     
        const response = await axios.post<UserModel>(config.usersUrl, formData);
        const addedUser = response.data;
        store.dispatch(addUserAction(addedUser));        
        return addedUser;
    }

   
    public async updateUser(user: UserModel): Promise<UserModel> {
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email); 
        formData.append("username", user.username) 
        formData.append("password", user.password.toString()) 
        formData.append("role", user.role) 

        const response = await axios.put<UserModel>(config.usersUrl + user.userId, formData);
        const updatedProduct = response.data;
        store.dispatch(updateUserAction(updatedProduct));
        return updatedProduct;
    }

  
    public async deleteUser(id: number): Promise<void> {
        await axios.delete(config.usersUrl + id);
        store.dispatch(deleteUserAction(id));
    }

    

}

const userService = new UserService();

export default userService;