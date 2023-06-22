import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./App.css";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type TodoType = { id: number; title: string; done: boolean };

function App() {
  const [count, setCount] = useState<TodoType[]>([]);

  const [name, setName] = useState("Cat in the Hat");

  useEffect(() => {
    fetch("http://localhost:3001/todos", {
      method: "GET",
    })
      .then((response) => {
        // console.log(response.body);
        return response.json();
      })
      .then((data: TodoType[]) => {
        console.log("data", data);

        setCount(data);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.checked", event.target.checked);
  };

  const deleteHandler = (todoId: number) => {
    console.log("todoId", todoId);
  };
  const addHandler = () => {
    console.log("addHandler");
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ width: "100%" }}>
          <div>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Controlled"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />

            <Button onClick={addHandler} variant="outlined">
              Add
            </Button>
          </div>
          <Stack spacing={2}>
            {count.length &&
              count.map((item) => {
                console.log("item.done", item.done);
                return (
                  <Item key={item.id} elevation={3}>
                    <Checkbox
                      checked={item.done}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    {item.title}{" "}
                    <Button
                      onClick={() => deleteHandler(item.id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </Item>
                );
              })}
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default App;
