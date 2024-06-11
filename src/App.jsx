import React, { useRef, useState, useEffect } from "react";
import { render } from "react-dom";

const CameraComponent = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  };

  useEffect(() => {
    getVideo();
  }, []);

  const takePhoto = () => {
    const width = 400;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let context = photo.getContext("2d");
    context.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  return (
    <div className="camera">
      <div className="camera__view">
        <video ref={videoRef}></video>
        <button onClick={getVideo}>Open Camera</button>
      </div>
      <button onClick={takePhoto}>Take Photo</button>
      <div className={`result ${hasPhoto ? "hasPhoto" : ""}`}>
        <canvas ref={photoRef}></canvas>
        {hasPhoto && <button onClick={closePhoto}>Close Photo</button>}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <h1>Camera App</h1>
      <CameraComponent />
    </div>
  );
};

export default App;

render(<App />, document.getElementById("root"));
