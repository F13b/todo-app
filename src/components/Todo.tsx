import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Typography,
} from "@mui/material";
import { ITodo } from "../types";
import { FC, useState } from "react";
import dayjs from "dayjs";

type TodoProps = {
  action: (id: number, checked: boolean) => void;
  todo: ITodo;
};

const Todo: FC<TodoProps> = ({ todo, action }) => {
  const { id, title, deadline, complited } = todo;
  const [checked, setChecked] = useState(complited);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    action(id, event.target.checked);
  };

  return (
    <Card sx={{ mb: "1rem" }} variant="outlined">
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: ".5rem" }}>
          <Checkbox checked={checked} onChange={handleCheck} />
          <Typography
            component={"p"}
            variant="body1"
            sx={{ textDecoration: complited ? "line-through" : "none" }}
          >
            {title}
          </Typography>
        </Box>
        <Chip
          label={dayjs(deadline.toDateString()).format("DD.MM.YYYY")}
          size="small"
          color={complited ? "success" : "primary"}
        />
      </CardContent>
    </Card>
  );
};

export default Todo;
