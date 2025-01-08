import {
  RTCRtpCodecParameters,
  useVP8,
  type werift,
} from "../imports/werift.js";
import { WhepSender } from "../imports/whep.js";
import { WhipReceiver } from "../imports/whip.js";

export class SessionRepository {
  private whepSessions = new Map<string, WhepSender>();
  private whipSessions = new Map<string, WhipReceiver>();

  createWhipSession() {
    const session = new WhipReceiver({
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
    });
    this.whipSessions.set(session.id, session);
    return session;
  }

  createWhepSession({
    video,
    audio,
  }: {
    video?: werift.MediaStreamTrack[];
    audio?: werift.MediaStreamTrack;
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
