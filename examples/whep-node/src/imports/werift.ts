// import { createRequire } from "module";
// import type * as werift from "../../../../submodules/werift/packages/webrtc/src/index.js";
// import type * as nonstandard from "../../../../submodules/werift/packages/webrtc/src/nonstandard/index.js";

// const require = createRequire(import.meta.url);

// const { MediaStreamTrack, RTCPeerConnection, useVP8, randomPort } =
//   require("../../../../submodules/werift/packages/webrtc/src/index.js") as typeof werift;
// const { navigator, MediaRecorder } =
//   require("../../../../submodules/werift/packages/webrtc/src/nonstandard/index.js") as typeof nonstandard;

// export {
//   MediaStreamTrack,
//   RTCPeerConnection,
//   useVP8,
//   randomPort,
//   navigator,
//   MediaRecorder,
//   type werift,
// };

export * from "werift";
export * from "werift/nonstandard";
