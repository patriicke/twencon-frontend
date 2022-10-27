import { MediationTwoTone } from '@mui/icons-material';
import { processResult } from 'immer/dist/internal';
import React ,{useRef,useState,useEffect} from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useAudioRecorder } from 'react-audio-voice-recorder';
const enum typeStatus {
  AUDIO,
  MESSAGE
}
interface Props{
  setAudio:(msg:any) => void;
  submit: (e:any,status:typeStatus.AUDIO) => void;
}
const  AudioTile : React.FC<Props> = ({submit,setAudio}) => {
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
  const [audioUrl,setAudioUrl] = useState<any>(null);
    const addAudioElement = (blob: Blob | MediaSource) => {
        console.log("finished recording!");
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        setAudioUrl(url);
        setAudio(url);
        audio.controls = true;
        audio.id= 'audio';
        audio.play();
        audioRef.current!.append(audio);
      };
    const discardChanges =  () => {
      console.log('Discard changes');
      audioRef.current!.lastChild!.remove();
      setAudioUrl('');
    };
    const handleSubmit = (e:any) => {
      submit(e,typeStatus.AUDIO);
      setTimeout(() => {
        discardChanges();
      }, 1000);
    }
    return (  
        <div ref={audioRef} className='sm:flex sm:flex-row  items-center justify-center p-1  bottom-20 min-w-fit w-full'>
                  <span ref={spanAudioRef} >
                      <AudioRecorder onRecordingComplete={addAudioElement} />
                  </span>
                  <button className='bg-blue-500 p-2 rounded-sm text-white m-1' onClick={discardChanges} style={{display: audioUrl ?'flex':'none'}}>Discard</button>
                  <button className='bg-blue-500 p-2 rounded-sm text-white m-1' onClick={(e) =>handleSubmit(e)} >Send</button>
        </div>
     );
}

export default AudioTile;