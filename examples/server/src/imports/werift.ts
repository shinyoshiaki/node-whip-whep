import { createRequire } from "module";
import type * as werift from "../../../../submodules/werift/packages/webrtc/src/index.js";

const require = createRequire(import.meta.url);

const { MediaStreamTrack, RTCRtpCodecParameters, useVP8 } =
  require("../../../../submodules/werift/packages/webrtc/src/index.js") as typeof werift;

export { MediaStreamTrack, RTCRtpCodecParameters, useVP8, type werift };

// export * from "werift";
