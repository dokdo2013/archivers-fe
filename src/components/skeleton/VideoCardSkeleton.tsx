import { AspectRatio, Flex, Skeleton } from "@chakra-ui/react";

{
  /* <Flex>
<div key={video.id} className="w-full">
	<Link href={link} className="relative min-h-[140px]">
		<VideoTypeBadge type={video.is_live ? "live" : "vod"} />
		<Flex>
			<AspectRatio ratio={16 / 9} w={"100%"}>
				<Image
					src={
						video.is_live
							? getLiveThumbnailAddress(streamer)
							: video.thumbnail_url
					}
					alt={video.title}
					fill
					className="rounded-lg bg-gray-100"
					loading="lazy"
				/>
			</AspectRatio>
		</Flex>
	</Link>
	<Flex direction={"row"} mt={2} gap={2}>
		<Link
			// href={
			//   isLive
			//     ? `https://twitch.tv/${streamer?.twitch_id}`
			//     : `/streamer/${streamer?.twitch_name}`
			// }
			href={`/streamer/${streamer?.twitch_name}`}
			className="min-w-[36px] min-h-[36px]"
		>
			<Img
				src={streamer?.profile_image_url}
				alt={streamer?.twitch_name}
				borderRadius="full"
				width={9}
				height={9}
				loading="lazy"
				// style={
				//   isLive ? { border: "2px solid #f56565", padding: "2px" } : {}
				// }
			/>
		</Link>
		<Flex direction={"column"}>
			<Text noOfLines={2} className="hover:underline">
				<Link href={link}>{video.title}</Link>
			</Text>
			<Flex gap={2}>
				<Text fontSize="xs" className="hover:underline">
					<Link href={`/streamer/${streamer?.twitch_name}`}>
						{streamer?.twitch_display_name}
					</Link>
				</Text>
				<Text fontSize="xs">{date}</Text>
			</Flex>
		</Flex>
	</Flex>
</div>
</Flex>
 */
}

const VideoCardSkeleton = () => {
  return (
    <Flex>
      <div className="w-full">
        <div className="relative min-h-[140px]">
          <Flex>
            <AspectRatio ratio={16 / 9} w={"100%"}>
              <Skeleton width="100%" height="100%" />
            </AspectRatio>
          </Flex>
        </div>
        <Flex direction={"row"} mt={2} gap={2}>
          <div className="min-w-[36px] min-h-[36px]">
            <Skeleton width="100%" height="100%" borderRadius="100px" />
          </div>
          <Flex direction={"column"} gap={1}>
            <Skeleton width="120px" height="17.5px" />
            <Flex gap={2}>
              <Skeleton width="60px" height="13px" />
              <Skeleton width="40px" height="13px" />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default VideoCardSkeleton;
