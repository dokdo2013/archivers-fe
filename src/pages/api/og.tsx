/* eslint-disable @next/next/no-img-element */
import {
  serverGetStreamer,
  serverGetStreamerByName,
} from "@/fetchers/get-streamer";
import { serverGetVod } from "@/fetchers/get-vod";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import dayjs from "dayjs";

export const config = {
  runtime: "edge",
  // runtime: "experimental-edge",
};

export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ?type={streamer|vod}&id={id}
    const hasType = searchParams.has("type");
    const hasId = searchParams.has("id");

    if (!hasType || !hasId) {
      throw new Error("Missing type or id parameter");
    }

    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (type !== "streamer" && type !== "vod") {
      throw new Error("Invalid type parameter");
    }

    if (!id) {
      throw new Error("Missing id parameter");
    }

    const host = request.headers.get("host") || "https://archivers.app";
    const isHttps = host.includes("localhost") ? false : true;

    if (type === "streamer") {
      const streamer = await serverGetStreamerByName(host, id, isHttps);

      return getStreamerImage(streamer);
    } else if (type === "vod") {
      const vod = await serverGetVod(host, id, isHttps);
      const streamer = await serverGetStreamer(host, vod?.streamer_id, isHttps);

      return getVodImage(vod, streamer);
    }
  } catch (e: any) {
    console.log(`${e.message}`);
    return getDefaultImage();
  }
}

interface IStreamer {
  id: number;
  twitch_id: number;
  twitch_name: string;
  twitch_display_name: string;
  profile_image_url: string;
  subscribe_start: string;
  subscribe_end: string;
  memo: string;
  issuer_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  default_expire_days: number;
}

interface IVod {
  stream_id: string;
  title: string;
  is_live: boolean;
  m3u8_address: string;
  storage_provider: string;
  download_address: string;
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
  streamer_id: number;
  deleted_at: string;
  thumbnail_url: string;
}

const getStreamerImage = (streamer: IStreamer) => {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "white",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              background: "black",
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            rauchg.com
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px 50px",
            margin: "0 42px",
            fontSize: 40,
            width: "auto",
            maxWidth: 550,
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            lineHeight: 1.4,
          }}
        >
          Making the Web. Faster.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
};

const getVodImage = async (vod: IVod, streamer: IStreamer) => {
  console.log(vod, streamer);

  // edge runtime doesn't support nodejs native modules (fs, path, etc.)
  // so we have to use fetch instead of fs.readFileSync
  const pretendardBold = await fetch(
    "https://archivers.app/fonts/Pretendard-Bold.ttf"
  ).then((res) => res.arrayBuffer());
  const pretendardExtraBold = await fetch(
    "https://archivers.app/fonts/Pretendard-ExtraBold.ttf"
  ).then((res) => res.arrayBuffer());
  const pyeongchangBold = await fetch(
    "https://archivers.app/fonts/PyeongChangPeace-Bold.ttf"
  ).then((res) => res.arrayBuffer());

  console.log("fonts loaded");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          padding: "40px",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#e6e6e6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <img
              src={streamer?.profile_image_url}
              width={48}
              height={48}
              style={{ borderRadius: 48 }}
              alt={streamer?.twitch_display_name}
            />

            <span
              style={{
                marginLeft: 8,
                fontSize: 28,
                fontFamily: "Prentendard-ExtraBold",
              }}
            >
              {streamer?.twitch_display_name}
            </span>
          </div>

          <span
            style={{
              fontSize: 26,
              fontFamily: "PyeongChangPeace-Bold",
            }}
          >
            ARCHIVERS
          </span>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 30,
          }}
        >
          <img
            src={vod.thumbnail_url}
            alt={vod.title}
            width={783}
            height={440}
            style={{ borderRadius: 20 }}
          />

          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              lineHeight: 1.5,
              gap: 20,
            }}
          >
            <span
              style={{
                width: "320px",
                fontSize: 28,
                fontFamily: "Pretendard-Bold",
              }}
            >
              {vod?.title}
            </span>

            <span
              style={{
                color: "gray",
              }}
            >
              {dayjs(vod?.start_at).format("YYYY/MM/DD HH:mm")} ~
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Pretendard-ExtraBold",
          data: await pretendardExtraBold,
          style: "normal",
          weight: 800,
        },
        {
          name: "Pretendard-Bold",
          data: await pretendardBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "PyeongChangPeace-Bold",
          data: await pyeongchangBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
};

const getDefaultImage = async () => {
  const pyeongchangBold = await fetch(
    "https://archivers.app/fonts/PyeongChangPeace-Bold.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "white",
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontFamily: "PyeongChangPeace-Bold",
          }}
        >
          ARCHIVERS
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "PyeongChangPeace-Bold",
          data: await pyeongchangBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
};
