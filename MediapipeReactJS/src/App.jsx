import "./App.css";
import { Holistic } from "@mediapipe/holistic";
import * as Holisticc from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

import React from "react";
import { useEffect, useRef } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { templateHand } from "./objectTemplate";

function App() {
  const webRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;
  const connect = window.drawConnectors

  function onResults(results){
    let objPoseRightLeftHand, objLeftHand, objRightHand;
    // const arrayTest = results.leftHandLandmarks.map(test => {
    //   testX : test.x;
    //   testY : test.y;
    //   testZ: test.z;
    // })
    canvasRef.current.width=webRef.current.video.videoWidth
    canvasRef.current.height=webRef.current.video.videoHeight

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d")
    canvasCtx.save()

    canvasCtx.clearRect(0,0, canvasElement.width, canvasElement.height)
    canvasCtx.drawImage(results.image, 0,0, canvasElement.width, canvasElement.height)

    //20 pontos nas maos
    //Somente o pose aparece a visibility - v
    //Se as maos ainda não estejam sendo reconhecidas, solta os pontos como 0

    //caso não estejam sendo reconhecidos, retorne os pontos todos como 0
    objLeftHand = {"LEFT_HAND" : results.leftHandLandmarks ? {...results.leftHandLandmarks} : templateHand};
    objRightHand = {"RIGHT_HAND" : results.rightHandLandmarks ? {...results.rightHandLandmarks} : templateHand}


    objPoseRightLeftHand = {"POSE" : {...results.poseLandmarks}, 
                            objLeftHand, 
                            objRightHand}


    console.log(objLeftHand);
    console.log(results);

    // if (results.leftHandLandmarks) console.log(" ====== Mão esquerda aparecendo ====")

    // if (results.rightHandLandmarks) console.log(" ******* Mão Direita aparecendo")

    // if (results.faceLandmarks) console.log("///// Face Aparecendo /////////")

      
      //for (const landmarks of results.multiFaceLandMarks){
      //   connect(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      //     { color: '#000000', lineWidth: 4 });
      //   connect(canvasCtx, results.poseLandmarks,
      //     { color: 'purple', lineWidth: 2 });
      //   connect(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
      //     { color: '#C0C0C070', lineWidth: 1 });
      //   connect(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
      //     { color: '#CC0000', lineWidth: 5 });
      //   connect(canvasCtx, results.leftHandLandmarks,
      //     { color: '#00FF00', lineWidth: 2 });
      //   connect(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
      //     { color: '#00CC00', lineWidth: 5 });
      //   connect(canvasCtx, results.rightHandLandmarks,
      //     { color: '#FF0000', lineWidth: 2 });
      // //}

      canvasCtx.restore()
      }
  

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.onResults(onResults);


    if(typeof webRef.current !== "undefined" && webRef.current !== null){
      camera = new cam.Camera(webRef.current.video, {
        onFrame : async ()=>{
          await holistic.send(({image:webRef.current.video}))
        },
        width: 640,
        height: 480
      })
      camera.start()
    }

  });

  return (
    <div className="App">
      <Webcam
        hidden
        ref={webRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}

export default App;
