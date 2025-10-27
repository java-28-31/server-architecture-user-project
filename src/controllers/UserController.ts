import {userServiceEmbedded} from "../service/UserServiceEmbedded.js";
import {UserService} from "../service/UserService.js";
import {IncomingMessage, ServerResponse} from "node:http";
import {parsBody} from "../utils/tools.js";
import {User} from "../model/user.js";

export class UserController {
    constructor(private userService : UserService) {
    }

    async addUser(req: IncomingMessage, res: ServerResponse) {

        const body = await parsBody(req);
        const result = this.userService.addUser(body as User);
        if(result){
            res.writeHead(201, {"Content-Type":"text/plain"});
            res.end('User was successfully added');
        } else {
            res.writeHead(409, {"Content-Type":"text/plain"});
            res.end('User already exists');
        }

    }

    getAllUsers(req: IncomingMessage, res: ServerResponse) {
        const result = this.userService.getAllUsers();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(result))
    }
}

export const userControllerEmbedded = new UserController(userServiceEmbedded)