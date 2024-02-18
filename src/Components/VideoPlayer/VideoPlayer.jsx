import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const LazyControls = lazy(() => import("../Controls/Controls"));

const VideoPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledReactPlayer = styled.div`
  flex: 2;
`;

function VideoPlayer({ selectedVideo, handleNext, handlePrev }) {
  const [playBackRate, setPlayBackRate] = useState(1);
  const [duration, setDuration] = useState("0:00");
  const [currentDuration, SetCurrentDuration] = useState();
  const [totalSeconds, setTotalSeconds] = useState();
  const [play, setPlay] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [sliderValueInSeconds, setSliderValueInSeconds] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event?.key === "f") return handleFullScreen();
      if (event?.key === " ") return setPlay((val) => !val);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  };

  const handleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    var elem = document.getElementById("video");
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    }
  };

  const handleDuration = (dur) => {
    setTotalSeconds(dur);
    var min = Math.floor(dur / 60);
    var sec = parseInt(dur - min * 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    setDuration(min + ":" + sec);
  };

  const handleGetDuration = (e) => {
    const dur = e.playedSeconds;
    setSliderValueInSeconds(dur);
    var min = Math.floor(dur / 60);
    var sec = parseInt(dur - min * 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    SetCurrentDuration(min + ":" + sec);
  };

  const handleAutoPlayVideo = () => {
    if (isAutoPlay) {
      handleNext();
    }
  };

  return (
    <VideoPlayerWrapper id="video">
      <StyledReactPlayer>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${selectedVideo}`}
          controls={false}
          width="100%"
          height="100%"
          playing={play}
          volume={volume}
          onDuration={handleDuration}
          onReady={handleDuration}
          playbackRate={playBackRate * 1}
          onProgress={handleGetDuration}
          ref={playerRef}
          onEnded={handleAutoPlayVideo}
          light={false}
        />
      </StyledReactPlayer>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <LazyControls
        setPlay={setPlay}
        handleNext={handleNext}
        handlePrev={handlePrev}
        setVolume={setVolume}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        handleFullScreen={handleFullScreen}
        isAutoPlay={isAutoPlay}
        handleAutoPlay={handleAutoPlay}
        setIsAutoPlay={setIsAutoPlay}
        isFullScreen={isFullScreen}
        setPlayBackRate={setPlayBackRate}
        playBackRate={playBackRate}
        duration={duration}
        currentDuration={currentDuration}
        totalSeconds={totalSeconds}
        sliderValueInSeconds={sliderValueInSeconds}
        setSliderValueInSeconds={setSliderValueInSeconds}
        playerRef={playerRef}
        play={play}
      />
      <Suspense />
    </VideoPlayerWrapper>
  );
}

export default VideoPlayer;
