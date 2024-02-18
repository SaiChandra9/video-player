import React, { useCallback, useState } from "react";
import VolumeControl from "../Volume/Volume";
import PositionedMenu from "../PlayBackSpeed/PlayBackComponent";
import Duration from "../Duration/Duration";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import styled from "styled-components";

const Footer = styled.div`
  bottom: 0;
  right: 0;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  background-color: #333; /* Just an example color */
  color: #fff; /* Just an example color */
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
`;

const IconButton = styled.div`
  height: 10px;
  color: white;
  cursor: pointer;
  padding: 0px 5px;
  display: flex;
  align-items: center;
`;

const DurationDiv = styled(IconButton)`
  display: flex;
  flex: 1;
`;

const VolumeHover = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-110%);
  display: none;
  @media (max-width: 820px) {
    transform: rotate(270deg);
    left: -3rem;
    bottom: 5rem;
  }
`;

const VolumeContainer = styled(IconButton)`
  position: relative;
  display: inline-block;
  padding-bottom: 14px;
  cursor: pointer; /* Ensure the cursor changes on hover */

  &:hover ${VolumeHover} {
    display: block;
    opacity: 1;
  }
`;

const ToggleAutoPlay = styled(IconButton)`
  padding-left: 20px;
`;

const ToggleFullScreen = styled(IconButton)`
  padding-right: 16px;
`;

export default function Controls({
  setPlay,
  handleNext,
  handlePrev,
  volume,
  setVolume,
  handleVolumeChange,
  handleFullScreen,
  setIsAutoPlay,
  isAutoPlay,
  isFullScreen,
  handleAutoPlay,
  setPlayBackRate,
  playBackRate,
  duration,
  currentDuration,
  totalSeconds,
  sliderValueInSeconds,
  setSliderValueInSeconds,
  playerRef,
  play,
}) {
  const [backUpVolume, setBackUpVolume] = useState(0);
  const getSeekDuration = (event) => {
    setSliderValueInSeconds(event.target.value);
    playerRef.current.seekTo(event.target.value, "seconds");
  };

  const getVolumeIcon = useCallback(() => {
    if (volume > 0 && volume < 0.4) return <VolumeMuteIcon />;
    else if (volume > 0.3 && volume < 0.7) return <VolumeDownIcon />;
    else if (volume > 0.6) return <VolumeUpIcon />;
    return <VolumeOffIcon />;
  }, [volume]);

  const handleVolume = () => {
    if (volume !== 0) {
      setBackUpVolume(volume);
      setVolume(0);
    } else {
      setVolume(backUpVolume);
    }
  };

  return (
    <Footer>
      <IconButton onClick={handlePrev}>
        <SkipPreviousIcon />
      </IconButton>

      <IconButton onClick={() => setPlay((val) => !val)}>
        {play ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>

      <IconButton onClick={handleNext}>
        <SkipNextIcon />
      </IconButton>

      <DurationDiv>
        <Duration
          duration={duration}
          getSeekDuration={getSeekDuration}
          currentDuration={currentDuration}
          totalSeconds={totalSeconds}
          sliderValueInSeconds={sliderValueInSeconds}
        />
      </DurationDiv>

      <VolumeContainer>
        <div onClick={handleVolume}>{getVolumeIcon()}</div>
        <VolumeHover>
          <VolumeControl
            onVolumeChange={setVolume}
            setVolume={setVolume}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
          />
        </VolumeHover>
      </VolumeContainer>

      <ToggleAutoPlay onClick={handleAutoPlay}>
        {isAutoPlay ? <ToggleOnIcon /> : <ToggleOffIcon />}
      </ToggleAutoPlay>

      <IconButton>
        <PositionedMenu
          setPlayBackRate={setPlayBackRate}
          playBackRate={playBackRate}
        />
      </IconButton>

      <ToggleFullScreen onClick={handleFullScreen}>
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </ToggleFullScreen>
    </Footer>
  );
}
