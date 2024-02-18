import React, { useState } from "react";
import Popup from "../PopUp/Pop";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 12px;
  justify-content: center;
  padding-left: 6px;
`;

const AddVideoButton = styled.div`
  color: white;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 720px) {
    padding-left: 12px;
    padding-top: 12px;
  }
`;

export const PlaylistDiv = styled.div`
  width: 150px;
  max-height: 100%;
  border: 1px solid grey;
  margin: 0.5rem 1rem 0.5rem 0rem;
  overflow-y: hidden;
  color: #fff;
`;

export const ImageTag = styled.img`
  height: 100px;
  width: 150px;
  object-fit: fill;
`;

const FilteredAndUnfilteredPlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 8px;
  padding-left: 4px;
`;

const PlaylistDeleteIcon = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 2px;
`;

const InputAndButtonWrapper = styled.div`
  @media (max-width: 720px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const InputDiv = styled.div`
  width: 152px;
  padding: 12px 0px;
  @media (max-width: 720px) {
    padding-top: 12px;
  }
`;

const PlayListWrapper = styled.div`
  @media (max-width: 720px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid white;
  width: 150px;
  height: 2rem;
  border-radius: 12px;
  justify-content: center;
`;

const InputStyled = styled.input`
  outline: none;
  border-radius: 4px;
  height: 26px;
  background-color: black;
  caret-color: white;
  color: white;
  border: 1px solid white;
`;

const StyledPara = styled.p`
  color: white;
`;

const Playlist = ({
  setSelectedVideo,
  data,
  addVideo,
  setAddVideo,
  filteredData,
  setFilteredData,
  handleNext,
  setSearch,
  search,
  setData,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [addPlaylistVideos, setAddPlaylistVideos] = useState([]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("index"));

    if (draggedIndex !== index) {
      if (
        (filteredData?.length === 0 && search !== "") ||
        filteredData?.length > 0
      ) {
        const values = JSON.parse(JSON.stringify(filteredData));
        const temp = values[draggedIndex];
        values[draggedIndex] = values[index];
        values[index] = temp;
        setFilteredData(values);
        return;
      }
      const values = JSON.parse(JSON.stringify(data));
      const temp = values[draggedIndex];
      values[draggedIndex] = values[index];
      values[index] = temp;
      setData(values);
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDelete = (deleteIndex) => {
    setData((preVal) => preVal?.filter((item, index) => index !== deleteIndex));
  };

  const addVideos = () => {
    setShowPopup(!showPopup);
  };

  const handlePlaylist = (videoData, index) => {
    setAddPlaylistVideos((preVal) => [...preVal, videoData]);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const result = data?.filter((item) =>
      item?.snippet?.localized?.title
        ?.toLowerCase()
        ?.includes(value?.toLowerCase())
    );
    setFilteredData(result);
  };

  const debounce = (fn, delay) => {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(handleSearch, 1000);

  const renderPlaylist = (list) => {
    if (list?.length < 1) return <StyledPara>No Videos Found</StyledPara>;
    return list?.map((item, index) => (
      <PlaylistDiv
        onClick={() => setSelectedVideo(item?.id)}
        key={item.id}
        draggable
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={(e) => handleDrop(e, index)}
      >
        <FilteredAndUnfilteredPlaylistWrapper>
          <Title>{item?.snippet?.localized?.title}</Title>

          <ImageTag alt="" src={item?.snippet?.thumbnails?.high?.url} />
          <PlaylistDeleteIcon>
            <DeleteOutlineIcon
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
                handleDelete(index);
              }}
              fontSize="small"
            />
          </PlaylistDeleteIcon>
        </FilteredAndUnfilteredPlaylistWrapper>
      </PlaylistDiv>
    ));
  };

  return (
    <PlaylistWrapper>
      <InputAndButtonWrapper>
        <AddVideoButton onClick={addVideos}>
          <AddButton>
            <AddIcon />
            <p>Add Videos</p>
          </AddButton>
        </AddVideoButton>
        <InputDiv>
          <InputStyled
            aria-placeholder="Please enter"
            type="text"
            onChange={debouncedSearch}
            placeholder="Search Videos"
          />
        </InputDiv>
      </InputAndButtonWrapper>
      <PlayListWrapper>
        {(filteredData?.length === 0 && search !== "") ||
        filteredData?.length > 0
          ? renderPlaylist(filteredData)
          : renderPlaylist(data)}
      </PlayListWrapper>

      <Popup
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        handlePlaylist={handlePlaylist}
        addPlaylistVideos={addPlaylistVideos}
        addVideo={addVideo}
        setData={setData}
        setAddVideo={setAddVideo}
      />
    </PlaylistWrapper>
  );
};

export default Playlist;
