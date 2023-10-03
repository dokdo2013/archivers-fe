import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

import {
  MediaCommunitySkin,
  MediaLiveIndicator,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";

const VodId = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {/* <h1>Vod {id}</h1> */}
      <div>
        {/* src="http://localhost:3000/video/stream/5wlvurzz1lb.m3u8" */}
        <Container maxW="container.xl" mt={4}>
          <MediaPlayer
            title="테스트"
            src={`http://localhost:3000/video/stream/${id}.m3u8`}
            // poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
            // thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
            aspectRatio={16 / 9}
            crossorigin=""
          >
            <MediaOutlet>
              {/* <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" /> */}
              {/* <track
              src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
              label="English"
              srcLang="en-US"
              kind="subtitles"
              default
            />
            <track
              src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
              srcLang="en-US"
              kind="chapters"
              default
            /> */}
            </MediaOutlet>
            <MediaCommunitySkin />
          </MediaPlayer>
        </Container>
      </div>
    </div>
  );
};

export default VodId;
