import { whipSource } from "../dependencies.js";
import { RTCRtpCodecParameters } from "../imports/werift.js";
import { WhepReceiver } from "../imports/whip.js";

export class WhipUsecase {
  createSession = async (sdp: string) => {
    console.log("createSession");

    const session = new WhepReceiver({
      codecs: {
        video: [
          new RTCRtpCodecParameters({
            mimeType: "video/H264",
            clockRate: 90000,
            rtcpFeedback: [
              { type: "nack" },
              { type: "nack", parameter: "pli" },
              { type: "goog-remb" },
            ],
          }),
        ],
        audio: [
          new RTCRtpCodecParameters({
            mimeType: "audio/opus",
            clockRate: 48000,
            channels: 2,
          }),
        ],
      },
    });
    whipSource.setup(session);

    const { answer, etag } = await session.setRemoteOffer(sdp);
    return { answer, etag, id: session.id };
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

    const session = whipSource.session;
    if (!session) {
      throw new Error("session not found");
    }

    await session.iceRequest({ etag, candidate });
  };
}
