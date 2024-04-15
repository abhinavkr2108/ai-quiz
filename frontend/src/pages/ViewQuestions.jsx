import { useLocation } from "react-router-dom";
import { Heading, Container } from "@chakra-ui/react";

export default function ViewQuestions() {
  const location = useLocation();
  const questions = location.state?.questions;

  return (
    <Container maxW={"5xl"}>
      <Heading my={5} textAlign={"center"}>
        Questions based on the Topic Specified
      </Heading>
      <div style={{ whiteSpace: "pre-line" }}>
        {questions.map((question, index) => (
          <div key={index}>
            <h1>{question.message.content}</h1>
          </div>
        ))}
      </div>
    </Container>
  );
}
