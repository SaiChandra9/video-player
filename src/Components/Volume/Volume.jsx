import React from "react";

const VolumeControl = ({ setVolume, volume, handleVolumeChange }) => {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        className="slider"
      />
    </div>
  );
};

export default VolumeControl;
