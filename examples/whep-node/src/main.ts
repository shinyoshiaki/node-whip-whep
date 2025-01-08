import { RTCPeerConnection, useVP8, type werift } from "./imports/werift.js";
import { WhepReceiver } from "./imports/whep.js";

const whep = new WhepReceiver();

const [id] = process.argv.slice(2);

const pc = new RTCPeerConnection({ codecs: { video: [useVP8()] } });
pc.addTransceiver("video");
pc.ontrack = (event) => {
  const track = event.track;
};

const url = `http://localhost:8801/whip/${id}/whep`;

await whep.view(pc as werift.RTCPeerConnection, url);
