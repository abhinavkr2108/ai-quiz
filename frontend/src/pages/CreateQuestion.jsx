import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Heading,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuestion() {
  const navigate = useNavigate();
  const selectOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  // state variables
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [number, setNumber] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);

  const toast = useToast();

  const generateQuestions = async () => {
    if (!topic || !number || !difficulty) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      if (number == 0) {
        toast({
          title: "Error",
          description: "Please enter a number greater than 0",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/ai/create-question",
        {
          topic,
          number_of_questions: number,
          difficulty,
        }
      );
      console.log(response.data);
      const resQues = response.data.choices;
      setQuestions(resQues);
      if (resQues && resQues.length > 0) {
        navigate("/create/view", { state: { questions: resQues } });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("QUESTIONS");
    console.log(questions);
  }, [questions, loading]);
  return (
    <Box
      h={"100vh"}
      w={"100vw"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Card maxW={"lg"}>
        <CardHeader>
          <Heading size="md">Create a Question</Heading>
        </CardHeader>
        <CardBody>
          <Box className="flex flex-col gap-3">
            <Box>
              <label>Topic for Questions</label>
              <Input
                placeholder="Enter Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </Box>
            <Box>
              <label>Number of Questions</label>
              <Input
                placeholder="Enter Number"
                type="number"
                min={1}
                max={10}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Box>

            <Box>
              <label>Difficulty of Questions</label>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {selectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <Button
            colorScheme="blue"
            onClick={generateQuestions}
            isLoading={loading}
            loadingText="Generating..."
            spinnerPlacement="start"
          >
            Create Questions
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
