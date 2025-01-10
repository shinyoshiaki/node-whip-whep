import { createRequire } from "module";
import type * as types from "../../../../submodules/werift/packages/webrtc/src/index.js";
import type * as nonstandard from "../../../../submodules/werift/packages/webrtc/src/nonstandard/index.js";

const require = createRequire(import.meta.url);

const {
  MediaStreamTrack,
  RTCPeerConnection,
  useVP8,
  randomPort,
  IceCandidate,
  Event,
} =
  require("../../../../submodules/werift/packages/webrtc/src/index.js") as typeof types;
const { navigator } =
  require("../../../../submodules/werift/packages/webrtc/src/nonstandard/index.js") as typeof nonstandard;

export {
  MediaStreamTrack,
  RTCPeerConnection,
  useVP8,
  randomPort,
  navigator,
  type types,
  IceCandidate,
  Event,
};

// export * from "werift";
