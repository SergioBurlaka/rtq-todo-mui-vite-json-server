import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

type TodoType = { id: number; title: string; done: boolean };

type TodoItemType = {
  onToggle: () => void;
  deleteHandler: () => void;
  item: TodoType;
};

const TodoItem = ({ onToggle, deleteHandler, item }: TodoItemType) => {
  return (
    <Item key={item.id} elevation={3}>
      <Checkbox
        checked={item.done}
        onChange={onToggle}
        inputProps={{ "aria-label": "controlled" }}
      />
      {item.title}
      <Button onClick={deleteHandler} variant="outlined">
        Delete
      </Button>
    </Item>
  );
};

export default TodoItem;
