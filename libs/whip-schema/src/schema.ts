import { OpenApiBuilder } from "openapi3-ts/oas31";
import { iceEndpoint, offerEndpoint } from "./endpoint.js";

export const openapiJson = new OpenApiBuilder()
  .addInfo({ title: "whip", version: "0.0.1" })
  .addPath(offerEndpoint.path, offerEndpoint.item)
  .addPath(iceEndpoint.path, iceEndpoint.item)
  .getSpecAsJson();
