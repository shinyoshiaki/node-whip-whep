import type { SessionRepository } from "../infrastructure/sessionRepository.js";

export class WhipUsecase {
  constructor(private sessionRepository: SessionRepository) {}

  createSession = async (sdp: string) => {
    console.log("createSession");

    const whip = this.sessionRepository.createWhipSession();

    const { answer, etag } = await whip.setRemoteOffer(sdp);
    return { answer, etag, id: whip.id };
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

    const whip = this.sessionRepository.getWhipSession(id);
    if (!whip) {
      throw new Error("session not found");
    }

    await whip.iceRequest({ etag, candidate });
  };
}
