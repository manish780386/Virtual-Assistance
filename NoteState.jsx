import React, { useEffect, useState } from 'react'
import noteContext from './noteContext'


import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function NoteState({ children }) {

    let [bg, setBG] = useState(true)

    // =================================

    const {
        transcript,
        listening,
        resetTranscript,
    } = useSpeechRecognition();

    // ========================================

    function speak(text, callback) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.onend = () => {
            console.log("Speech synthesis completed.");
            if (callback) callback();
        };
        
        synth.speak(utterance);
    }

    // ========================================

    function task(){
        let text = transcript.toLowerCase()
        let query = null

        if (text.includes('good morning')){
            speak('Good Morning, Sir. how may i help you?', SpeechRecognition.startListening)
        }
        else if (text.includes('what is my name')){
            speak('your name is manish dange', SpeechRecognition.startListening)
        }
        
        else if (text.includes('what is my  friend name')){
            speak('your sister name is Parth Despande', SpeechRecognition.startListening)
        }
        
        
        else if (text.includes('open youtube and search')){
            query = text.replace('open youtube and search ', '')
            window.open(`https://www.youtube.com/results?search_query=${query}`)
            speak(`opening youtube and searching for ${query}`)
        }
       
        else if (text.includes('play the song')){
            query = text.replace('play the song ', '')
            window.open(`https://open.spotify.com/search/${query}`)
            speak(`playing ${query} on spotify`)
        }
        else if (text.includes('open')){
            query = text.replace('open ', '')
            window.open(`https://www.${query}.com/`)
            speak(`sure sir, opening ${query}`)
        }
        
        
        else if (text.includes('change the background')){
            setBG(!bg)
            speak('background changed')
        }
        

        resetTranscript()
    }

    // ========================================

    useEffect(()=>{
        (!listening && transcript) 
        && task()
    }, [listening, transcript])

    // ========================================

    return (
        <noteContext.Provider value={{transcript, bg}}>
            {children}
        </noteContext.Provider>
    )
}
