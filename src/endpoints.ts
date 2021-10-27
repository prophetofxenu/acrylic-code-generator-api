import { SourceManager } from "./acg-lib/inosource";
import { replacer } from "./acg-lib/util";

import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";


const sm = new SourceManager();


export async function compile(req: express.Request, res: express.Response) {
  const json = JSON.stringify(req.body, replacer);
  const hash = crypto.createHash("md5").update(json).digest("hex");
  const filename = `acg-code-${hash.slice(0, 8)}.zip`;
  const zipPath = `./dist/packages/${filename}`;
  sm.setModes(req.body);
  try {
    await fs.promises.stat("./dist/packages");
  } catch (e) {
    await fs.promises.mkdir("./dist/packages");
  }
  await sm.generateZip(zipPath);
  res.send({
    packageName: filename
  });
}


export async function download(req: express.Request, res: express.Response) {
  const filename = req.params.filename;
  const zipPath = `./dist/packages/${filename}`;
  try {
    await fs.promises.stat(zipPath);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.download(zipPath, filename);
  } catch {
    console.log(zipPath);
    res.sendStatus(404);
  }
}
