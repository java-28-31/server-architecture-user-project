import {IncomingMessage, ServerResponse} from "node:http";
import {responseJson, responseText} from "../utils/tools.js";
import {loggerController} from "../controllers/loggerController.js";

export const loggerRouter =
    async (req: IncomingMessage, res: ServerResponse) => {
        const {url, method} = req;
        const controller = loggerController;
    switch (url! + method) {
        case '/logger' + 'GET':{
            controller.getAllLogs(req, res);
            break;
        }

        default: {
            responseText(res, 404, "logger not found");
        }

    }
    }