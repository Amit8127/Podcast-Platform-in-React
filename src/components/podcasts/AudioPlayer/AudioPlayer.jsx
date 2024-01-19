import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();
  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
    if(e.target.value == 0) {
        setIsMuted(true);
    } else {
        setIsMuted(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

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

  const togglePlay = () => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  };

  const toggleMute = () => {
    isMuted ? setIsMuted(false) : setIsMuted(true);
  };

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!isMuted) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMuted]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="custom-audio-player">
      <img src={image} alt="image" className="player-image" />
      <audio ref={audioRef} src={audioSrc} />
      <div className="duration-flex">
        <p className="audio-btn" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>
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
