import { compile, download } from "./endpoints";
import { reviver } from "./acg-lib/util";

import express from "express";
import cors from "cors";


const server = express();
server.use(cors());
server.use(express.json({
  reviver: reviver
}));
const port = 3001;

server.listen(port, () => console.log("Listening on", port));

server.post("/api/compile", compile);
server.get("/api/download/:filename", download);
