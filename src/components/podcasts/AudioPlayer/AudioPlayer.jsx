import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
  // All useState variables
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();

  //   function for play duration handling
  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  //   function for volume handling
  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
    if (e.target.value == 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  //   for AudioPlayer playing timmimg function
  useEffect(() => {
    const audio = audioRef.current;
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Handle the play error (e.g., autoplay policy)
        console.error("Play error:", error);
      }
    };
    if (isPlaying) {
      // Check if the audio is ready before attempting to play
      if (audio.readyState >= 2) {
        playAudio();
      } else {
        // If not ready, set a listener for the 'loadeddata' event
        const handleLoadedData = () => {
          playAudio();
          // Remove the event listener after the first 'loadeddata' event
          audio.removeEventListener("loadeddata", handleLoadedData);
        };
        audio.addEventListener("loadeddata", handleLoadedData);
      }
    } else {
      audio.pause();
    }
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying, audioSrc]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  //   for pause and play toggle button function
  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  //   for mute and unmute toggle button function
  const toggleMute = () => {
    isMuted ? setIsMuted(false) : setIsMuted(true);
  };

  //   for pause and play function
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  //   for mute and unmute function
  useEffect(() => {
    if (!isMuted) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMuted]);

  //   custom time converter function
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="custom-audio-player">
      <img src={image} alt="image" className="player-image" />
      <audio ref={audioRef} src={audioSrc} />
      <div className="duration-flex">
        <p className="audio-btn" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </p>
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          value={currentTime}
          max={duration}
          step={0.01}
          className="duration-range"
          onChange={handleDuration}
        />
        <p>-{formatTime(duration - currentTime)}</p>
        <p className="audio-btn" onClick={toggleMute}>
          {!isMuted ? <FaVolumeUp /> : <FaVolumeMute />}
        </p>
        <input
          type="range"
          value={volume}
          max={1}
          min={0}
          step={0.01}
          className="volume-range"
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
