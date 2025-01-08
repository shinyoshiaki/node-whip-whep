import { useState } from "react";
import { WhipSender } from "./imports/whip.js";

const url = "http://localhost:8801/whip";
//Create whep client
const whip = new WhipSender();

function App() {
  const [id, setId] = useState<string | null>(null);

  const play = async () => {
    const pc = new RTCPeerConnection();

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const [video] = stream.getVideoTracks();
    const [audio] = stream.getAudioTracks();

    pc.addTransceiver(video, {
      direction: "sendonly",
      sendEncodings: [
        { rid: "0", scaleResolutionDownBy: 2 },
        { rid: "1", scaleResolutionDownBy: 1 },
      ],
    });
    pc.addTrack(audio, stream);

    //Start viewing
    await whip.publish(pc, url);
    console.log(whip.resourceURL);
    const id = whip.resourceURL.pathname.split("/").at(-1);
    console.log(id);
    setId(id);
  };

  return (
    <div>
      <button onClick={play}>publish</button>
      <p>id:{id}</p>
    </div>
  );
}

export default App;
