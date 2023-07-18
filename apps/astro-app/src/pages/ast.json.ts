import { parse } from "@astrojs/compiler";
import { readFileSync } from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));


export async function get({params, request}) {
  const url = new URL(request.url)
  const page = url.searchParams.get("path")
  const fileContent = readFileSync(path.resolve(__dirname, `./${page}`), {
    encoding: "utf-8",
  });
  
  const result = await parse(fileContent);

  return {
    body: JSON.stringify(result),
  };
}