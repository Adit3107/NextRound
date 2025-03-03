import whisper
import sounddevice as sd
# import numpy as np
import os
# from IPython.display import Audio
import scipy.io.wavfile as wavfile
import torch 
import threading
import time
import numpy as np
import wave
import tempfile

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")


recording = False
audio_data = None
sample_rate = 16000
max_duration = 500
audio_file = "recorded.wav"
model = whisper.load_model('medium', device=device)

def record_audio():
  global recording,audio_data
  print("press button to start recording")
  while recording:
    audio_data = sd.rec(int(max_duration*sample_rate),samplerate=sample_rate,channels=1)
    sd.wait()
    if not recording:
      print("stopping recording")
      break
    print("recording...")
    time.sleep(1)

def start_recording():
  global recording
  recording = True
  record_audio()


def transcribe_audio(audio_file):
  try:
    with tempfile.NamedTemporaryFile(delete=False,suffix=".wav") as temp_audio:
      audio_file.save(temp_audio.name)
      temp_path = temp_audio.name
    pass
    result = model.transcribe(temp_path)
    os.remove(temp_path)
    print(result['text'])
    return result['text']
  except Exception as e:
    print(str(e))
    return None


def stop_recording():
  global recording
  recording = False
  
  if audio_data is not None:
    wavfile.write(audio_file,sample_rate,audio_data)
    print(f"audio data saved to {audio_file}")

  transcribed_text = transcribe_audio(audio_file)
  os.remove(audio_file)
  return transcribed_text






