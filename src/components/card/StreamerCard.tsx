import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

const StreamerCard = ({ streamer }: any) => {
  const mainColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
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
    </Box>
  );
};

export default StreamerCard;
