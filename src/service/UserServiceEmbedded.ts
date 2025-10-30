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

    getUserById(userId: number) {
        const user = this.users.find(u => u.id === userId)
            return user;
    }

    removeUser(userId: number) {
        const index = this.users.findIndex(u => u.id === userId);
        return index === -1 ? null : this.users.splice(index, 1)[0];
    }

    updateUser(userId: number, newName: string): boolean {
        const index = this.users.findIndex(u => u.id === userId);

        if(index !== -1) {
            this.users[index].userName = newName;
            return true;
        }
        return false;
    }

}

export const userServiceEmbedded = new UserServiceEmbedded();