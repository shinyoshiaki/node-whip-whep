import {
  RTCPeerConnection,
  randomPort,
  navigator,
  useVP8,
} from "./imports/werift.js";
import { $ } from "zx";
import { WhipSender } from "./imports/whip.js";

const url = "http://localhost:8801/whip";

const pc = new RTCPeerConnection({ codecs: { video: [useVP8()] } });

const port = await randomPort();
// const gst = $`gst-launch-1.0 videotestsrc ! video/x-raw,width=640,height=480,format=I420 ! x264enc ! \
// h264parse ! rtph264pay config-interval=10 pt=96 ! \
// udpsink host=127.0.0.1 port=${port}`;
const gst = $`gst-launch-1.0 videotestsrc ! video/x-raw,width=640,height=480,format=I420 ! vp8enc error-resilient=partitions keyframe-max-dist=10 auto-alt-ref=true cpu-used=5 deadline=1 ! rtpvp8pay ! udpsink host=127.0.0.1 port=${port}`;

const { track } = navigator.mediaDevices.getUdpMedia({
  port,
  codec: { clockRate: 90000, mimeType: "video/VP8", payloadType: 96 },
  kind: "video",
});
pc.addTrack(track);

const whip = new WhipSender();
await whip.publish(pc as any, url);
const id = whip.resourceURL.pathname.split("/").at(-1);
console.log(id);

await new Promise((resolve) => setTimeout(resolve, 60_000));

await gst.kill();
