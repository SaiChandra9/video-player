import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PlaylistDiv, Title, ImageTag } from "../Playlist/Playlist";
import styled from "styled-components";

const PopupDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  height: 80%;
  width: 82%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTab = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PopupTitle = styled.div`
  color: #ccc;
`;

const VideoTile = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: white;
  cursor: pointer;
`;

const PopupContent = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: max-content;
`;

const PopupComplete = styled.div`
  color: #ccc;
  cursor: pointer;
  padding: 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddVideoButton = styled.div`
  width: max-content;
  border: 1px solid white;
  padding: 8px 8px;
  border-radius: 8px;
`;

const Popup = ({
  showPopup,
  setShowPopup,
  handlePlaylist,
  addVideo,
  addPlaylistVideos,
  setData,
  setAddVideo,
}) => {
  const [id, setId] = useState([]);
  useEffect(() => {
    setId(addPlaylistVideos?.map((item) => item?.id));
  }, [addPlaylistVideos]);
  const togglePopup = () => {
    setData((preVal) => [...preVal, ...addPlaylistVideos]);
    const IdData = addPlaylistVideos?.map((item) => item?.id);
    const remaingDisplay = JSON.parse(JSON.stringify(addVideo));
    const result = remaingDisplay?.filter(
      (item) => !IdData?.includes(item?.id)
    );
    setAddVideo(result);
    setShowPopup(!showPopup);
  };

  const renderPlayList = () => {
    return addVideo?.map((item, index) => (
      <PlaylistDiv
        onClick={() => handlePlaylist(item, index)}
        key={item.id}
        style={{ opacity: id?.includes(item?.id) ? 0.5 : 1 }}
      >
        <VideoTile>
          <Title>{item?.snippet?.localized?.title}</Title>
          <ImageTag alt="" src={item?.snippet?.thumbnails?.high?.url} />
        </VideoTile>
      </PlaylistDiv>
    ));
  };

  return (
    <div>
      {showPopup && (
        <PopupDiv>
          <PopupWrapper>
            <InfoTab>
              <PopupTitle>Click on the video to add to playlist</PopupTitle>
              <StyledCloseIcon onClick={() => setShowPopup(!showPopup)} />
            </InfoTab>
            <PopupContent>{renderPlayList()}</PopupContent>
            <PopupComplete>
              <AddVideoButton onClick={togglePopup}>Add Videos</AddVideoButton>
            </PopupComplete>
          </PopupWrapper>
        </PopupDiv>
      )}
    </div>
  );
};

export default Popup;
