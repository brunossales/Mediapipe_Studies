import './App.css'
import { Holstic } from '@mediapipe/holistic'
import * as Holisticc from '@mediapipe/holistic'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'

import React from 'react'
import {
  useEffect,
  useRef
} from 'react'

const WebcamComponent = () => <Webcam 
                                style={{
                                  position: 'absolute',
                                  marginRight: 'auto',
                                  marginLeft: 'auto',
                                  left: 0,
                                  right: 0,
                                  textAlign: 'center',
                                  zIndex:9,
                                  width: 640,
                                  height: 480,
                                }}
                              />

function App() {

  return (
    <div className="App">
      <WebcamComponent />
    </div>
  )
}

export default App
