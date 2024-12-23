import React, { useState, useEffect } from "react";
import { Container } from "../index";
import { VideoContainer } from "../index";
import axios from "axios";
import { FloatingActionButton } from "../index";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/videos/")
      .then((res) => {
        console.log("API Response:", res.data);
        setVideos(res.data.data.videos);
      })
      .catch((error) => console.log("Error fetching videos", error));
  }, []);
  console.log("set VIdeos:", videos);
  return (
    <Container>
      <div className="flex flex-wrap my-2 ">
        {videos.length > 0
          ? videos.map((video) => {
              return (
                <VideoContainer
                  key={video._id}
                  videoId={video._id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  views={video.views || 0}
                  createdAt={video.createdAt}
                  description={video.description}
                  src={video.video}
                  owner={video.owner}
                />
              );
            })
          : "No Videos"}
      </div>
      <FloatingActionButton />
    </Container>
  );
}

export default Home;
