import { Ajv } from "ajv";
import type { FastifyReply, FastifyRequest } from "fastify";
import { config } from "../config.js";
import { whipUsecase } from "../dependencies.js";
import {
  type IceParams,
  type OfferParams,
  iceParams,
  offerParams,
  responseHeaders,
} from "../imports/whipServer.js";

const ajv = new Ajv();

const checkOfferRequestBody = ajv.compile(offerParams.body);

export async function whipOffer(
  req: FastifyRequest<{
    Body: OfferParams["body"];
  }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    checkOfferRequestBody(req.body);

    const offer = req.body;
    console.log("whipOffer", offer);

    const { answer, etag, id } = await whipUsecase.createSession(offer);

    const responseBody: OfferParams["responseBody"] = answer;

    const location = `${config.endpoint}/whip/resource/${id}`;

    await reply
      .code(201)
      .headers({
        [responseHeaders.etag]: etag,
        [responseHeaders.location]: location,
      })
      .send(responseBody);
  } catch (error) {
    console.log(error);
    await reply.code(500).send({ error });
  }
}

const checkResourceRequestBody = ajv.compile(iceParams.body);

export async function whipIce(
  req: FastifyRequest<{
    Body: IceParams["body"];
    Headers: IceParams["params"];
    Params: IceParams["params"];
  }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    checkResourceRequestBody(req.body);

    const candidate = req.body;
    const { id } = req.params;
    const etag = req.headers["IF-Match"];
    await whipUsecase.iceRequest({ candidate, etag, id });

    await reply.code(204).send();
  } catch (error) {
    console.log(error);
    await reply.code(500).send({ error });
  }
}
