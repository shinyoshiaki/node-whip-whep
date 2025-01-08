import { OpenApiBuilder } from "openapi3-ts/oas31";

import {
  iceEndpoint,
  layerEndpoint,
  offerEndpoint,
  sseEndpoint,
} from "./endpoint.js";

export const openapiJson = new OpenApiBuilder()
  .addInfo({ title: "whep", version: "0.0.1" })
  .addPath(offerEndpoint.path, offerEndpoint.item)
  .addPath(iceEndpoint.path, iceEndpoint.item)
  .addPath(sseEndpoint.path, sseEndpoint.item)
  .addPath(layerEndpoint.path, layerEndpoint.item)
  .getSpecAsJson();
