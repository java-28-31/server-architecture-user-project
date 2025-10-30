import {IncomingMessage, ServerResponse} from "node:http";
import {userControllerEmbedded} from "../controllers/UserController.js";
import {responseText} from "../utils/tools.js";
import {myLogger} from "../utils/logger.js";

export const appRouter =
    async (req: IncomingMessage, res: ServerResponse) => {
        const {url, method} = req;
        myLogger.log('Got new request ' + method + url)
        const parsedUrl = new URL(url!, `http://${req.headers.host}`);
        const controller = userControllerEmbedded;

        switch (parsedUrl.pathname + method) {
            case "/api/users" + 'POST': {
                await controller.addUser(req, res);
                break;
            }
            case "/api/users" + "GET" :{
                controller.getAllUsers(req,res);
                break;
            }
            case "/api/users" + "DELETE":{
                controller.removeUser(req, res);
                break;
            }
            case "/api/user" + "GET":{
                controller.getUserById(req, res);
                break;
            }
            case "/api/user" + "PATCH":{
                controller.updateUser(req, res);
                break;
            }

            default: {
                responseText(res, 404, "Page not found")
            }
        }
    }