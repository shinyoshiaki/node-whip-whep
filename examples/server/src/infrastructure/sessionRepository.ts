import {
  RTCPeerConnection,
  RTCRtpCodecParameters,
  useOpus,
  useVP8,
  type types,
} from "../imports/werift.js";
import { WhepSender } from "../imports/whepServer.js";
import { WhipReceiver } from "../imports/whipServer.js";

export class SessionRepository {
  private whepSessions = new Map<string, WhepSender>();
  private whipSessions = new Map<string, WhipReceiver>();

  createWhipSession() {
    const pc = new RTCPeerConnection({
      codecs: {
        video: [useVP8()],
        audio: [useOpus()],
      },
    });
    const session = new WhipReceiver(pc);
    this.whipSessions.set(session.id, session);
    return session;
  }

  createWhepSession({
    video,
    audio,
  }: {
    video?: types.MediaStreamTrack[];
    audio?: types.MediaStreamTrack;
  }) {
    const session = new WhepSender({
      video: video as any,
      audio: audio as any,
      config: {
        codecs: {
          video: [useVP8()],
          audio: [
            new RTCRtpCodecParameters({
              mimeType: "audio/opus",
              clockRate: 48000,
              channels: 2,
            }),
          ],
        },
      },
    });
    this.whepSessions.set(session.id, session);
    return session;
  }

  getWhepSession(id: string) {
    return this.whepSessions.get(id);
  }

  getWhipSession(id: string) {
    return this.whipSessions.get(id);
  }
}
