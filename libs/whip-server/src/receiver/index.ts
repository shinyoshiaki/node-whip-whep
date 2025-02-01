import { Event } from "rx.mini";
import { type MediaAttributes, parse, write } from "sdp-transform";
import { v4 } from "uuid";
import {
  IceCandidate,
  type types,
  useSdesRTPStreamId,
} from "../imports/werift.js";

export class WhipReceiver {
  readonly id = v4();
  readonly etag = v4();

  audio?: types.MediaStreamTrack;
  video: types.MediaStreamTrack[] = [];

  readonly onTrack = new Event<[types.MediaStreamTrack]>();

  constructor(readonly pc: types.RTCPeerConnection) {
    this.pc.setConfiguration({
      ...this.pc.config,
      headerExtensions: { video: [useSdesRTPStreamId()] },
    });
  }

  async setRemoteOffer(sdp: string) {
    this.pc.onTransceiverAdded.subscribe((transceiver) => {
      transceiver.onTrack.subscribe((track) => {
        if (track.kind === "audio") {
          this.audio = track;
        } else {
          this.video.push(track);
        }

        this.onTrack.execute(track);

        track.onReceiveRtp.once((rtp) => {
          if (track.kind === "video") {
            setInterval(() => {
              transceiver.receiver.sendRtcpPLI(rtp.header.ssrc);
            }, 1000);
          }
        });
      });
    });

    await this.pc.setRemoteDescription({ type: "offer", sdp });

    const answer = await this.pc.setLocalDescription(
      await this.pc.createAnswer(),
    );

    const obj = parse(answer.toSdp().sdp);

    return { answer: write(obj), etag: this.etag };
  }

  async iceRequest({ etag, candidate }: { etag: string; candidate: string }) {
    if (etag !== this.etag) {
      // throw new Error("invalid etag");
    }

    const obj = parse(candidate);
    if (obj.media.length > 0) {
      await this.setRemoteIceCandidate(obj.media[0].candidates ?? []);
    } else {
      throw new Error("ice restart is not supported yet");
    }
  }

  private async setRemoteIceCandidate(
    candidates: NonNullable<MediaAttributes["candidates"]>,
  ) {
    for (const candidate of candidates) {
      await this.pc.addIceCandidate(
        new IceCandidate(
          candidate.component,
          candidate.foundation,
          candidate.ip,
          candidate.port,
          Number(candidate.priority),
          candidate.transport,
          candidate.type,
        ).toJSON(),
      );
    }
  }
}
