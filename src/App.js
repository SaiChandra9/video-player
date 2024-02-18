import { useCallback, useEffect, useState, Suspense, lazy } from "react";
import styled from "styled-components";
import axios from "axios";

const VideoPlayer = lazy(() => import("./Components/VideoPlayer/VideoPlayer"));

const Playlist = lazy(() => import("./Components/Playlist/Playlist"));
const AppContainer = styled.div`
  text-align: center;
  height: 100vh;
  text-align: center;
  overflow: hidden;
`;

const PlaylistVideoPlayerWrapper = styled.div`
  display: flex;
  height: 91%;
  @media (max-width: 720px) {
    flex-direction: column-reverse;
  }
`;

const PlaylistContainer = styled.div`
  padding-right: 22px;
  overflow-y: scroll;
  height: 100%;
  background-color: black;
  padding-left: 6px;
`;

const VideoPlayerContainer = styled.div`
  width: 99%;
  height: 100%;
`;
const Title = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  font-size: 2rem;
`;
function App() {
  const [data, setData] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [addVideo, setAddVideo] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchId = (data) => {
    let ind;
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.id === selectedVideo) {
        ind = i;
        break;
      }
    }
    return ind;
  };

  const handleNext = () => {
    if (
      (filteredData?.length === 0 && search !== "") ||
      filteredData?.length > 0
    ) {
      const ind = fetchId(filteredData);
      if (ind + 1 >= filteredData?.length)
        return setSelectedVideo(filteredData?.[0]?.id);
      return setSelectedVideo(filteredData?.[ind + 1]?.id);
    }
    const ind = fetchId(data);
    if (ind + 1 >= data?.length) return setSelectedVideo(data?.[0]?.id);
    return setSelectedVideo(data?.[ind + 1]?.id);
  };

  const handlePrev = () => {
    if (
      (filteredData?.length === 0 && search !== "") ||
      filteredData?.length > 0
    ) {
      const ind = fetchId(filteredData);
      if (ind - 1 < 0)
        return setSelectedVideo(filteredData?.[filteredData?.length - 1]?.id);
      return setSelectedVideo(filteredData?.[ind - 1]?.id);
    }

    const ind = fetchId(data);
    if (ind - 1 < 0) return setSelectedVideo(data?.[data?.length - 1]?.id);
    return setSelectedVideo(data?.[ind - 1]?.id);
  };

  const fetchData = useCallback(async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyCMwoXXL6uhu8POGLAxfA-lbNxKxfLeg7o&chart=mostPopular&maxResults=100",
    };
    await axios
      .request(config)
      .then((response) => {
        const data = JSON.parse(JSON.stringify(response.data));
        const d1 = data?.items?.slice(0, 25);
        const d2 = data?.items?.slice(25, data?.length);
        setData(d1);
        setAddVideo(d2);
        setSelectedVideo(data?.items?.[0]?.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    document.title = "Video Player Application";
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContainer>
      <Title>VIDEO PLAYER APPLICATION</Title>
      <PlaylistVideoPlayerWrapper>
        <PlaylistContainer>
          <Suspense fallback={<div>Loading Playlist...</div>}>
            <Playlist
              setSelectedVideo={setSelectedVideo}
              data={data}
              addVideo={addVideo}
              setAddVideo={setAddVideo}
              setFilteredData={setFilteredData}
              filteredData={filteredData}
              handleNext={handleNext}
              search={search}
              setSearch={setSearch}
              setData={setData}
            />
          </Suspense>
        </PlaylistContainer>
        <VideoPlayerContainer>
          <Suspense fallback={<div>Loading VideoPlayer...</div>}>
            <VideoPlayer
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </Suspense>
        </VideoPlayerContainer>
      </PlaylistVideoPlayerWrapper>
    </AppContainer>
  );
}

export default App;
