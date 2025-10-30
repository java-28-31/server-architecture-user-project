import {userServiceEmbedded} from "../service/UserServiceEmbedded.js";
import {UserService} from "../service/UserService.js";
import {IncomingMessage, ServerResponse} from "node:http";
import {parsBody, responseJson, responseText} from "../utils/tools.js";
import {User} from "../model/user.js";

export class UserController {
    constructor(private userService : UserService) {
    }

    async addUser(req: IncomingMessage, res: ServerResponse) {

        try {
           const body = await parsBody(req);
            const result = this.userService.addUser(body as User);
            if(result){
                responseText(res, 201, "User was successfully added")
            } else {
                responseText(res, 409, "User already exists")
            }
        } catch (e) {
            const err = e as Error;
            responseText(res, 400, err.message)
        }
    }

    getAllUsers(req: IncomingMessage, res: ServerResponse) {
        const result = this.userService.getAllUsers();
       responseJson(res, 200, result);
    }

    removeUser(req: IncomingMessage, res: ServerResponse) {
        const urlObj = new URL(req.url!, `http://${req.headers.host}`);
        const id = urlObj.searchParams.get('userId')
        if(id){
            const removed = this.userService.removeUser(+id);
            if(removed)  responseJson(res, 200, removed);
            else responseText(res, 404, `User with id ${id} not found`)
        } else responseText(res, 400, "No request params found")
    }

    getUserById(req: IncomingMessage, res: ServerResponse) {
        const urlObj = new URL(req.url!, `http://${req.headers.host}`);
        const id = urlObj.searchParams.get('userId')
        if(id){
            const result = this.userService.removeUser(+id);
            if(result)  responseJson(res, 200, result);
            else responseText(res, 404, `User with id ${id} not found`)
        } else responseText(res, 400, "No request params found")
    }

    updateUser(req: IncomingMessage, res: ServerResponse) {
        const urlObj = new URL(req.url!, `http://${req.headers.host}`);
        const id = urlObj.searchParams.get('userId');
        const newName = urlObj.searchParams.get('newName');
        if(!id || !newName) responseText(res, 400, "No request params found");
        else{
            const result = this.userService.updateUser(+id, newName);
            if(result) responseText(res, 200, "User successfully updated");
            else responseText(res, 404,`User with id ${id} not found`);
        }

    }
}

export const userControllerEmbedded = new UserController(userServiceEmbedded)