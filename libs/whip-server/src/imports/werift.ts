// import { createRequire } from "module";
// import type * as types from "../../../../submodules/werift/packages/webrtc/src/index.js";
// export * from "../../../../submodules/werift/packages/webrtc/src/index.js";

// const require = createRequire(import.meta.url);

// const {
//   MediaStreamTrack,
//   RTCRtpCodecParameters,
//   IceCandidate,
//   RTCPeerConnection,
//   useSdesRTPStreamId,
// } =
//   require("../../../../submodules/werift/packages/webrtc/src/in") as typeof types;

// export {
//   MediaStreamTrack,
//   RTCRtpCodecParameters,
//   IceCandidate,
//   RTCPeerConnection,
//   useSdesRTPStreamId,
//   type types,
// };

import type * as types from "werift";
export * from "werift";
export type { types };
