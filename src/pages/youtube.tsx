import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
} from "@chakra-ui/react";

const YoutubePage = () => {
  return (
    <Container maxW="1000px" p={4}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius="lg"
      >
        <AlertIcon boxSize="40px" />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          준비중입니다
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          유튜브 관련 기능은 준비중입니다. 조금만 기다려주세요!
        </AlertDescription>
      </Alert>
    </Container>
  );
};

export default YoutubePage;
