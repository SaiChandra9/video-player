import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";

const PlaybackButton = styled.div`
  color: white;
  font-size: 12px;
`;

const OptionsWrapper = styled.div`
  background-color: #333;
  color: white;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const StyledMenu = styled(Menu)`
  ul {
    background-color: #333;
  }
`;
export default function PositionedMenu({ setPlayBackRate, playBackRate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, i, val) => {
    setAnchorEl(null);
    if (val !== "" && val !== undefined) {
      const value = val.replace("x", "");
      setPlayBackRate(value);
    }
  };
  const options = ["1x", "1.25x", "1.5x", "1.75x", "2x"];
  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PlaybackButton>{playBackRate + "x"}</PlaybackButton>
      </Button>
      <StyledMenu
        className="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {options?.map((option, index) => (
          <MenuItem key={option} onClick={(e) => handleClose(e, index, option)}>
            <OptionsWrapper>{option}</OptionsWrapper>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}
