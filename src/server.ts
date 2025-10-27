import {createServer} from "node:http";
import {PORT} from "./config/appConfig.js";
import {appRouter} from "./routers/appRouter.js";
import {myLogger} from "./utils/logger.js";

export  const launchServer = () => {

    const server = createServer(async (req, res) => {
        await appRouter(req, res);
    })
    server.listen(PORT, () => {
        myLogger.log("Server starts")
        console.log(`Server runs at http://localhost:${PORT}`);
    })
}