import {IncomingMessage, ServerResponse} from "node:http";
import {userControllerEmbedded} from "../controllers/UserController.js";

export const appRouter =
    async (req: IncomingMessage, res: ServerResponse) => {
        const {url, method} = req;
        const parsedUrl = new URL(url!, `http://${req.headers.host}`);
        console.log(parsedUrl)
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
            default: {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end("Page not found")
            }
        }
    }