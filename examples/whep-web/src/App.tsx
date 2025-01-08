import { type FC, useRef, useState } from "react";
import { WhepReceiver } from "./imports/whep.js";

//Create whep client
const whep = new WhepReceiver();

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [whip, setWhip] = useState("");
  const [layers, setLayers] = useState<{
    [mid: string]: { layers: { encodingId: string }[] };
  }>({});

  const play = async () => {
    const video = videoRef.current!;

    const pc = new RTCPeerConnection();

    //Add recv only transceivers
    // pc.addTransceiver("audio");
    pc.addTransceiver("video");

    pc.ontrack = (event) => {
      const track = event.track;
      if (!video.srcObject) {
        video.srcObject = new MediaStream([track]);
      } else {
        (video.srcObject as MediaStream).addTrack(track);
      }
    };

    const url = `http://localhost:8801/whip/${whip}/whep`;

    whep.addEventListener("message", (e: any) => {
      console.log(e);
      if (e.detail.event === "layers") {
        console.log(e.detail.data);
        setLayers(e.detail.data);
      }
    });

    //Start viewing
    await whep.view(pc, url);
  };

  return (
    <div>
      <input
        placeholder="whip id"
        onChange={(e) => {
          setWhip(e.target.value);
        }}
        value={whip}
      />
      <button onClick={play}>play</button>
      <video ref={videoRef} controls autoPlay />
      {Object.entries(layers).map(([mid, info]) => (
        <div key={mid}>
          <div>mid {mid}</div>
          {info.layers.map((layer) => (
            <RequestLayer
              key={layer.encodingId}
              encodingId={layer.encodingId}
              mid={mid}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;

const RequestLayer: FC<{ encodingId: string; mid: string }> = ({
  encodingId,
  mid,
}) => {
  const request = () => {
    whep.selectLayer({ encodingId, mediaId: mid });
  };

  return (
    <div>
      <button onClick={request}>request Layer {encodingId}</button>
    </div>
  );
};
