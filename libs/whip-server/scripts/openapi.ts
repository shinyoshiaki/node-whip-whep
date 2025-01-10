import { mkdir, writeFile } from "fs";

import { openapiJson } from "../src/index.js";

mkdir("docs", { recursive: true }, () => {});
writeFile("docs/openapi.json", openapiJson, () => {});
