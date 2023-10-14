import {
  Alert,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";

const AdminIndex = () => {
  return (
    <>
      <Container maxW="1200px" mt={8}>
        <Heading as="h1" fontSize={"2xl"}>
          관리자 모시깽이
        </Heading>

        <SimpleGrid minChildWidth={"400px"} spacing={8} mt={12}>
          <Box>
            <Heading as="h2" fontSize={"xl"}>
              스트리머 추가
            </Heading>

            <Box mt={4}>
              <Alert status="warning" borderRadius={"md"}>
                <UnorderedList>
                  <ListItem>이미 등록된 스트리머는 등록할 수 없어요</ListItem>
                  <ListItem>
                    id 말고 name으로 입력해야해요 (twapi에서 확인)
                  </ListItem>
                  <ListItem>
                    처리 순서 : DB에 있는지 확인 - 유저 데이터 조회 - DB 추가 -
                    EventSub 등록
                  </ListItem>
                </UnorderedList>
              </Alert>

              <form>
                <FormControl mt={4}>
                  <FormLabel>스트리머 이름 (name)</FormLabel>
                  <Flex gap={2}>
                    <Input type="name" name="streamer_name" />
                    <Button colorScheme="blue" type="submit">
                      추가하기
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Box>
          </Box>

          <Box>
            <Heading as="h2" fontSize={"xl"}>
              스트리머 삭제
            </Heading>

            <Box mt={4}>
              <Alert status="warning" borderRadius={"md"}>
                <UnorderedList>
                  <ListItem>영상은 추후 삭제됩니다</ListItem>
                  <ListItem>
                    id 말고 name으로 입력해야해요 (twapi에서 확인)
                  </ListItem>
                  <ListItem>
                    처리 순서 : DB에 있는지 확인 - DB에서 제거 - EventSub 제거 -
                    영상 삭제
                  </ListItem>
                </UnorderedList>
              </Alert>

              <form>
                <FormControl mt={4}>
                  <FormLabel>스트리머 이름 (name)</FormLabel>
                  <Flex gap={2}>
                    <Input type="name" name="streamer_name" />
                    <Button colorScheme="red" type="submit">
                      삭제하기
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Box>
          </Box>

          <Box>
            <Heading as="h2" fontSize={"xl"}>
              수동 녹화 시작
            </Heading>

            <Box mt={4}>
              <Alert status="warning" borderRadius={"md"}>
                <UnorderedList>
                  <ListItem>이중 녹화가 되지 않도록 주의해주세요</ListItem>
                  <ListItem>
                    녹화를 위해선 스트리머가 반드시 등록된 상태여야 해요
                  </ListItem>
                  <ListItem>
                    id 말고 name으로 입력해야해요 (twapi에서 확인)
                  </ListItem>
                </UnorderedList>
              </Alert>

              <form>
                <FormControl mt={4}>
                  <FormLabel>스트리머 이름 (name)</FormLabel>
                  <Flex gap={2}>
                    <Input type="name" name="streamer_name" />
                    <Button colorScheme="blue" type="submit">
                      시작하기
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default AdminIndex;
