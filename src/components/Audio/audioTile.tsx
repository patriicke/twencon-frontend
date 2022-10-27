import React ,{useRef} from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { useEffect } from 'react';
const  AudioTile : React.FC = () => {
    const {
        startRecording,
        stopRecording,
        togglePauseResume,
        recordingBlob,
        isRecording,
        isPaused,
        recordingTime,
      } = useAudioRecorder();
      const audioRef = useRef<HTMLDivElement>(null);
      const spanAudioRef = useRef<HTMLSpanElement>(null);

    const addAudioElement = (blob: Blob | MediaSource) => {
        console.log("finished recording!");
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        audio.play();
        spanAudioRef.current!.innerHTML = '';
        audioRef.current!.append(audio);
      };
    useEffect(() => {
        console.log('useEffect called');
        
         audioRef.current!.style.visibility = 'visible';
    },[])
    const discardChanges = () => {
    audioRef.current!.style.visibility = 'hidden'
    }
    return (  
        <div ref={audioRef} className='flex items-center justify-center p-1  bottom-20 min-w-fit w-8/12'>
                  <span ref={spanAudioRef} >
                      <AudioRecorder onRecordingComplete={addAudioElement} />
                  </span>
                  <button id='button' className='bg-blue-500 p-2 rounded-sm text-white m-1 '>Send</button>
                  <button className='bg-blue-500 p-2 rounded-sm text-white m-1 ' onClick={discardChanges}>Discard</button>
        </div>
     );
}

export default AudioTile;