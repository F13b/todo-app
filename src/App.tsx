import "./App.css";
import Header from "./components/Header";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Zoom,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ITodo } from "./types";
import Todo from "./components/Todo";
import CreateTodo from "./components/CreateTodo";
import { ChangeEvent, useState } from "react";

function App() {
  const Todos: ITodo[] = [
    {
      id: 1,
      title: "Go to shop",
      deadline: new Date(2024, 10, 11),
      complited: false,
    },
    {
      id: 2,
      title: "Do my home work",
      deadline: new Date(2024, 8, 8),
      complited: false,
    },
    {
      id: 3,
      title: "Watch Arcane",
      deadline: new Date(2024, 9, 12),
      complited: true,
    },
  ];

  const [todos, setTodos] = useState(Todos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    setFilter(newFilter);
  };

  const createTodo = (title: string, deadline: string) => {
    const todo: ITodo = {
      id: Math.random(),
      title: title,
      deadline: new Date(deadline),
      complited: false,
    };

    setTodos([...todos, todo]);
  };

  const handleCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          complited: (item.complited = checked),
        };
      } else return item;
    });

    setTodos(newTodos);
  };

  return (
    <>
      <Header />
      <Box component={"main"} sx={{ width: "85%", m: "3rem auto 0 auto" }}>
        <Stack sx={{ mb: "2rem" }} direction={"row"} spacing={5}>
          <TextField
            size="small"
            label="Search"
            placeholder="Type something..."
            value={search}
            onChange={handleSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={handleFilter}
            aria-label="typed todos"
            size="small"
          >
            <Tooltip title="Show all todos" arrow TransitionComponent={Zoom}>
              <ToggleButton value="All" aria-label="All">
                All
              </ToggleButton>
            </Tooltip>
            <Tooltip
              title="Show complited todos"
              arrow
              TransitionComponent={Zoom}
            >
              <ToggleButton value="Complited" aria-label="Complited">
                Complited
              </ToggleButton>
            </Tooltip>
            <Tooltip
              title="Show uncomplited todos"
              arrow
              TransitionComponent={Zoom}
            >
              <ToggleButton value="Uncomplited" aria-label="Uncomplited">
                Uncomlited
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
          <CreateTodo action={createTodo} />
        </Stack>
        <Box>
          {todos
            .filter((item) => {
              if (filter === "Complited") {
                return item.complited === true;
              } else if (filter === "Uncomplited") {
                return item.complited === false;
              } else {
                return item;
              }
            })
            .filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((todo) => (
              <Todo key={todo.id} todo={todo} action={handleCheck} />
            ))}
        </Box>
      </Box>
    </>
  );
}

export default App;
