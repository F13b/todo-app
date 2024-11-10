import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ITodo } from "./types";
import { steps } from "./steps";
import Header from "./components/Header";
import Todo from "./components/Todo";
import CreateTodo from "./components/CreateTodo";
import ToggleButtons from "./components/ToggleButtons";
import Joyride from "react-joyride";
import { ChangeEvent, useState } from "react";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
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
      <Joyride
        steps={steps}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#00aaff",
          },
        }}
      />
      <Header />
      <Box component={"main"} sx={{ width: "85%", m: "3rem auto 0 auto" }}>
        <Stack
          sx={{ mb: "2rem" }}
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 5 }}
        >
          <TextField
            className="first-step"
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
          <Stack direction={"row"} spacing={{ sx: 1, sm: 5 }}>
            <ToggleButtons filter={filter} action={handleFilter} />
            <CreateTodo action={createTodo} />
          </Stack>
        </Stack>
        <Box>
          {todos
            .filter((item) => {
              if (filter === "Complited") {
                return item.complited === true;
              } else if (filter === "Unfinished") {
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
