import {createServer} from "node:http";
import {PORT} from "./config/appConfig.js";
import {appRouter} from "./routers/appRouter.js";
import {myLogger} from "./utils/logger.js";
import {loggerRouter} from "./routers/loggerRouter.js";

export  const launchServer = () => {

    const server = createServer(async (req, res) => {
       if(req.url?.startsWith("/api")) await appRouter(req, res);
       else if(req.url?.startsWith("/logger"))   await loggerRouter(req, res);
    })
    server.listen(PORT, () => {
        myLogger.toFile("Server starts")
        console.log(`Server runs at http://localhost:${PORT}`);
    })
}