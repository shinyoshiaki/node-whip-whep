// import { createRequire } from "module";
// import type * as types from "../../../../submodules/werift/packages/webrtc/src/index.js";

// const require = createRequire(import.meta.url);

// const {
//   MediaStreamTrack,
//   RTCRtpCodecParameters,
//   useVP8,
//   RTCPeerConnection,
//   useOPUS,
// } =
//   require("../../../../submodules/werift/packages/webrtc/src/index.js") as typeof types;

// export {
//   MediaStreamTrack,
//   RTCRtpCodecParameters,
//   useVP8,
//   type types,
//   RTCPeerConnection,
//   useOPUS,
// };

import type * as types from "werift";
export * from "werift";
export type { types };
