import {User} from "../model/user.js";

export interface UserService {
    addUser(user:User): boolean;
    removeUser(userId: number): User;
    getAllUsers():User[];
    getUserById(userId:number):User;
    updateUser(userId:number, newName:string):boolean
}