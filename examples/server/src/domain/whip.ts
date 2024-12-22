import type { MediaStreamTrack } from "../imports/werift.js";
import type { WhepReceiver } from "../imports/whip.js";

export class WhipSource {
  audio!: MediaStreamTrack;
  video: MediaStreamTrack[] = [];
  session!: WhepReceiver;

  setup(session: WhepReceiver) {
    this.audio = undefined as any;
    this.video = [];

    this.session = session;
    session.onTrack.subscribe((track) => {
      if (track.kind === "audio") {
        this.audio = track;
      } else {
        this.video.push(track);
      }
    });
  }
}
