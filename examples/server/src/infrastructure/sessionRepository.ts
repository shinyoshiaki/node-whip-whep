import {
  RTCPeerConnection,
  useOPUS,
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
        audio: [useOPUS()],
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
    const pc = new RTCPeerConnection({
      codecs: {
        video: [useVP8()],
        audio: [useOPUS()],
      },
    });
    const session = new WhepSender(pc, {
      video,
      audio,
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
