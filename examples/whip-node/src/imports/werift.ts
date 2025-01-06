import { createRequire } from "module";
import type * as Werift from "../../../../submodules/werift/packages/webrtc/src/index.js";
import type * as Nonstandard from "../../../../submodules/werift/packages/webrtc/src/nonstandard/index.js";

const require = createRequire(import.meta.url);

const { MediaStreamTrack, RTCPeerConnection, useVP8, randomPort } =
  require("../../../../submodules/werift/packages/webrtc/src/index.js") as typeof Werift;
const { navigator } =
  require("../../../../submodules/werift/packages/webrtc/src/nonstandard/index.js") as typeof Nonstandard;

export { MediaStreamTrack, RTCPeerConnection, useVP8, randomPort, navigator };

// export * from "werift";
