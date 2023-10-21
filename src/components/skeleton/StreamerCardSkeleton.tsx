import { Skeleton } from "@chakra-ui/react";

{
  /* <Box
key={streamer.id}
className={`rounded-lg py-2 px-3`}
bgColor={mainColor}
>
<Link href={`/streamer/${streamer.twitch_name}`}>
	<Flex gap={2} align={"center"}>
		<Avatar
			name={streamer.twitch_name}
			src={streamer.profile_image_url}
			size={"md"}
		/>
		<Flex direction={"column"} gap={1}>
			<Heading fontSize={"md"}>{streamer.twitch_display_name}</Heading>
			<Text fontSize={"xs"} color={"gray.500"}>
				{streamer.twitch_name}
			</Text>
		</Flex>
	</Flex>
</Link>
</Box> */
}

const StreamerCardSkeleton = () => {
  return <Skeleton height={"64px"} width="150px" borderRadius={"0.5rem"} />;
};

export default StreamerCardSkeleton;
