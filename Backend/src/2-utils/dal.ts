import fs from "fs/promises";
import mysql from "mysql";
import LocationModel from "../4-models/location-model";
import UserModel from "../4-models/user-model";
// import config from "./config";


const usersJsonPath = "./src/1-assets/db/users.json";
const locationJsonPath = "./src/1-assets/db/location.json";

const connection = mysql.createPool({
    host: "localhost", // computer name
    user: "root", // database username
    password: "", // database password
    database: "travel" // database name
});
// const connection = mysql.createPool({
//     host: config.sqlHost, // computer name
//     user: config.sqlUser, // database username
//     password: config.sqlPassword, // database password
//     database: config.sqlDatabase // database name
// });

function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

async function fetchLocation():Promise< LocationModel[]>{
    const content: string = await fs.readFile(locationJsonPath,"utf-8");
    const location: LocationModel[] = JSON.parse(content);
    return location;
}

async function saveLocation(location: LocationModel[]):Promise<void>{
    const content: string = JSON.stringify(location, null, 4);
    await fs.writeFile(locationJsonPath,content);

}
async function fetchUsers(): Promise<UserModel[]> {
    const content: string = await fs.readFile(usersJsonPath, "utf-8");
    const users: UserModel[] = JSON.parse(content);
    return users;
}

async function saveUsers(users: UserModel[]): Promise<void> {
    const content: string = JSON.stringify(users, null, 4);
    await fs.writeFile(usersJsonPath, content);
}

export default {
    execute,
    fetchUsers,
    saveUsers,
    fetchLocation,
    saveLocation
}