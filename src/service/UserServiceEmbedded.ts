import {UserService} from "./UserService.js";
import {User} from "../model/user.js";

export class UserServiceEmbedded implements UserService{
    private users: User[] = [{id:7, userName:"Bond"}];

    addUser(user: User): boolean {
        if(this.users.find(u => u.id === user.id))
        return false;
        this.users.push(user);
        return  true;
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    getUserById(userId: number): User {
        throw "";
    }

    removeUser(userId: number): User {
        throw "";
    }

    updateUser(userId: number, newName: string): boolean {
        return false;
    }

}

export const userServiceEmbedded = new UserServiceEmbedded();