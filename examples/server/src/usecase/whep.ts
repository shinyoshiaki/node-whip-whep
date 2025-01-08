import type { RequestLayer } from "../imports/whep.js";
import type { SessionRepository } from "../infrastructure/sessionRepository.js";

export class WhepUsecase {
  constructor(private sessionRepository: SessionRepository) {}

  createSession = async ({ sdp, id }: { id: string; sdp: string }) => {
    console.log("createSession");
    const whip = this.sessionRepository.getWhipSession(id);
    if (!whip) {
      throw new Error("whip not found");
    }

    const whep = this.sessionRepository.createWhepSession({
      video: whip.video as any,
      audio: whip.audio as any,
    });
    const { answer, etag } = await whep.setRemoteOffer(sdp);
    return { answer, etag, id: whep.id };
  };

  iceRequest = async ({
    id,
    etag,
    candidate,
  }: {
    id: string;
    etag: string;
    candidate: string;
  }) => {
    console.log("iceRequest", { id, etag });

    const whep = this.sessionRepository.getWhepSession(id);
    if (!whep) {
      throw new Error("session not found");
    }

    await whep.iceRequest({ etag, candidate });
  };

  requestSSE = ({ events, id }: { events: string[]; id: string }) => {
    console.log("requestSSE", { events, id });

    const whep = this.sessionRepository.getWhepSession(id);
    if (!whep) {
      throw new Error("session not found");
    }

    whep.requestEvent(events);
  };

  startSSEStream = ({ id }: { id: string }) => {
    console.log("startSSEStream", { id });

    const whep = this.sessionRepository.getWhepSession(id);
    if (!whep) {
      throw new Error("session not found");
    }

    return {
      event: whep.event,
      startEvent: whep.streamEvent,
    };
  };

  requestLayer = ({
    id,
    request,
  }: {
    id: string;
    request: RequestLayer;
  }) => {
    console.log("requestLayer", { id, request });

    const whep = this.sessionRepository.getWhepSession(id);
    if (!whep) {
      throw new Error("session not found");
    }
    whep.requestLayer(request);
  };
}
