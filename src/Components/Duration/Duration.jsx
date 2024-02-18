import React from "react";
import styled from "styled-components";

const DurationControl = styled.div`
  display: flex;
`;

const CurrentDuration = styled.div``;

const SliderThumb = styled.input`
  &::-webkit-slider-thumb {
    opacity: 0; /* Hide the thumb */
  }
`;

const SliderWrapper = styled.div`
  padding: 0px 8px;
`;

const Duration = ({
  duration,
  getSeekDuration,
  currentDuration,
  totalSeconds,
  sliderValueInSeconds,
}) => {
  return (
    <DurationControl>
      <CurrentDuration>
        {currentDuration === undefined ? "00:00" : currentDuration}
      </CurrentDuration>
      <SliderWrapper>
        <SliderThumb
          type="range"
          min={0}
          max={totalSeconds}
          step="1"
          value={sliderValueInSeconds}
          onChange={getSeekDuration}
          className="slider"
        />
      </SliderWrapper>

      <div className="duration">{duration}</div>
    </DurationControl>
  );
};

export default Duration;
