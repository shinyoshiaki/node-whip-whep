import {
  type MediaStreamTrack,
  RTCRtpCodecParameters,
} from "../imports/werift.js";
import { WhepSender } from "../imports/whep.js";

export class SessionRepository {
  private sessions = new Map<string, WhepSender>();

  createSession({
    video,
    audio,
  }: {
    video?: MediaStreamTrack[];
    audio?: MediaStreamTrack;
  }) {
    const session = new WhepSender({
      video,
      audio,
      config: {
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
      },
    });
    this.sessions.set(session.id, session);
    return session;
  }

  getSession(id: string) {
    return this.sessions.get(id);
  }
}
