import {createServer} from "node:http";
import {PORT} from "./config/appConfig.js";
import {appRouter} from "./routers/appRouter.js";
import {myLogger} from "./utils/logger.js";
import {loggerRouter} from "./routers/loggerRouter.js";
import {userServiceEmbedded} from "./service/UserServiceEmbedded.js";

export  const launchServer = async () => {

    const server = createServer(async (req, res) => {
        if (req.url?.startsWith("/api")) await appRouter(req, res);
        else if (req.url?.startsWith("/logger")) await loggerRouter(req, res);
    })
    await userServiceEmbedded.restoreDataFromFile();
    console.log("After restoring")
    server.listen(PORT, () => {
        myLogger.toFile("Server starts")
        console.log(`Server runs at http://localhost:${PORT}`);
    })

    process.on('SIGINT', async () => {
        await userServiceEmbedded.saveDataToFile();
        myLogger.toFile('Server shutdown by Ctrl+C')
        process.exit();
    })
}