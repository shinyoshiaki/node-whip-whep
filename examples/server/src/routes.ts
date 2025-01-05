import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import { FastifySSEPlugin } from "fastify-sse-v2";

import {
  whepIce,
  whepLayer,
  whepOffer,
  whepSse,
  whepSseStream,
} from "./controller/whep.js";
import { whipIce, whipOffer } from "./controller/whip.js";
import {
  layerEndpoint,
  responseHeaders,
  sseEndpoint,
  sseStreamPath,
  iceEndpoint as whepIceEndpoint,
  offerEndpoint as whepOfferEndpoint,
} from "./imports/whepSchema.js";
import {
  iceEndpoint as whipIceEndpoint,
  offerEndpoint as whipOfferEndpoint,
} from "./imports/whipSchema.js";

export async function registerExternalRoutes(server: FastifyInstance) {
  await server.register(cors, {
    origin: true,
    exposedHeaders: Object.values(responseHeaders),
  });
  server.register(FastifySSEPlugin);

  server.addContentTypeParser(
    "application/sdp",
    { parseAs: "string" },
    (_, body, done) => {
      done(null, body);
    },
  );
  server.addContentTypeParser(
    "application/trickle-ice-sdpfrag",
    { parseAs: "string" },
    (_, body, done) => {
      done(null, body);
    },
  );

  server.post(convertPath(whipOfferEndpoint.path), whipOffer);
  server.patch(convertPath(whipIceEndpoint.path), whipIce);

  const whepBase = `/whip/:whip/`;
  server.post(whepBase + convertPath(whepOfferEndpoint.path), whepOffer);
  server.patch(whepBase + convertPath(whepIceEndpoint.path), whepIce);
  server.post(whepBase + convertPath(sseEndpoint.path), whepSse);
  server.get(whepBase + convertPath(sseStreamPath), whepSseStream);
  server.post(whepBase + convertPath(layerEndpoint.path), whepLayer);
}

function convertPath(openApiPath: string): string {
  return openApiPath.replace(/{(.*?)}/g, ":$1");
}
