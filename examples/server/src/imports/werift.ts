import { createRequire } from "module";
import type * as Werift from "../../../../submodules/werift/packages/webrtc/src/index.js";

const require = createRequire(import.meta.url);

const { MediaStreamTrack, RTCRtpCodecParameters, useVP8 } =
  require("../../../../submodules/werift/packages/webrtc/src/index.js") as typeof Werift;

export { MediaStreamTrack, RTCRtpCodecParameters, useVP8 };

// export * from "werift";
