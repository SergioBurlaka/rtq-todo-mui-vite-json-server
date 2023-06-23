import { useCallback, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./App.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import type { TodoDTO } from "./store/TodoTypes";

import { todoApi } from "./store/todoStore";

import TodoItem from "./components/TodoItem";

const App = () => {
  const [name, setName] = useState("");

  const { data: todos } = todoApi.useGetTodosQuery();
  const [updateTodos] = todoApi.useUpdateTodosMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();

  const addHandler = useCallback(() => {
    if (name) {
      addTodo({ id: new Date().getTime(), title: name, done: false });
      setName("");
    }
  }, [addTodo, name]);

  const onToggle = useCallback(
    (todo: TodoDTO) => updateTodos({ ...todo, done: !todo.done }),
    [updateTodos]
  );

  const deleteHandler = useCallback(
    (todo: TodoDTO) => deleteTodo(todo),
    [deleteTodo]
  );

  return (
    <div>
      <CssBaseline />
      <Container>
        <Box sx={{ width: "100%" }}>
          <div className="flex gap-4 shadow-3xl mb-4 p-2 rounded-sm">
            <TextField
              fullWidth
              id="outlined-controlled"
              label="New todo"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />

            <Button onClick={addHandler} variant="outlined">
              Add
            </Button>
          </div>
          <Stack spacing={2}>
            {todos?.map((item) => (
              <TodoItem
                item={item}
                onToggle={() => onToggle(item)}
                deleteHandler={() => deleteHandler(item)}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default App;
