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
import Joyride, { Step } from "react-joyride";
import { ChangeEvent, useState } from "react";

const steps: Step[] = [
  {
    target: ".first-step",
    content:
      "This is the field for searching for your tasks. You can search for tasks by their name.",
  },
  {
    target: ".second-step",
    content: "And this is the task filtering panel.",
  },
  {
    target: ".second-all-step",
    content: "You can display all tasks.",
  },
  {
    target: ".second-complited-step",
    content: "And you can display only complete tasks.",
  },
  {
    target: ".second-unfinished-step",
    content: "Or just unfinished tasks.",
  },
  {
    target: ".thrid-step",
    content: "To create a new task, click on this button.",
  },
];

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
      <Joyride
        steps={steps}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
            backgroundColor: "#f0f0f0",
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
            <ToggleButtonGroup
              color="primary"
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="typed todos"
              size="small"
            >
              <Tooltip
                title="Show all todos"
                arrow
                TransitionComponent={Zoom}
                className="second-step"
              >
                <ToggleButton
                  value="All"
                  aria-label="All"
                  className="second-all-step"
                >
                  All
                </ToggleButton>
              </Tooltip>
              <Tooltip
                title="Show complited todos"
                arrow
                TransitionComponent={Zoom}
              >
                <ToggleButton
                  value="Complited"
                  aria-label="Complited"
                  className="second-complited-step"
                >
                  Complited
                </ToggleButton>
              </Tooltip>
              <Tooltip
                title="Show unfinished todos"
                arrow
                TransitionComponent={Zoom}
              >
                <ToggleButton
                  value="Unfinished"
                  aria-label="Unfinished"
                  className="second-unfinished-step"
                >
                  Unfinished
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
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
