import { MediaRecorder, RTCPeerConnection, useVP8 } from "./imports/werift.js";
import { WhepReceiver } from "./imports/whep.js";

const whep = new WhepReceiver();
const path = `./vp8-${Date.now()}.webm`;
const recorder = new MediaRecorder({
  path,
  numOfTracks: 1,
});

const [id] = process.argv.slice(2);

const pc = new RTCPeerConnection({ codecs: { video: [useVP8()] } });
pc.ontrack = async (event) => {
  const track = event.track;
  await recorder.addTrack(track);
};
pc.addTransceiver("video");

const url = `http://localhost:8801/whip/${id}/whep`;

await whep.view(pc, url);

await new Promise((r) => setTimeout(r, 5000));
await recorder.stop();

await whep.stop();

console.log("done", path);
process.exit(0);
