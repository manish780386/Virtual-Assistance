import React, { useContext } from 'react'
import './App.css'
import bg1 from './assets/bg videos/bg1.mp4'
import bg2 from './assets/bg videos/bg2.mp4'

import { FaMicrophoneAlt } from "react-icons/fa";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import noteContext from './context/noteContext';

export default function App() {

                const {
                  browserSupportsSpeechRecognition
                } = useSpeechRecognition();

                let {transcript, bg} = useContext(noteContext)

                if (!browserSupportsSpeechRecognition) {
                  return <span>Browser doesn't support speech recognition.</span>;
                }

                return (
                  <div>
                    <section>
                      <video autoPlay muted loop width='100%' src={bg ? bg1 : bg2}></video>
                    </section>

                    <section className='content'>
                      <h1>Virtual Assistant</h1>
                      <p>{transcript}</p>
                      <button onClick={SpeechRecognition.startListening}><FaMicrophoneAlt /></button>
                    </section>
                  </div>
                )
              }
