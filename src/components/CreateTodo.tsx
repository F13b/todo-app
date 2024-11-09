import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Zoom,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { FC, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type CreateTodoProps = {
  action: (title: string, deadline: string) => void;
};

const CreateTodo: FC<CreateTodoProps> = ({ action }) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      deadline: null as Dayjs | null,
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Create new Todo" arrow TransitionComponent={Zoom}>
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new Todo</DialogTitle>
        <form
          onSubmit={handleSubmit(({ title, deadline }) => {
            action(title, dayjs(deadline).format("MM.DD.YYYY"));
            handleClose();
          })}
        >
          <DialogContent>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required field" }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(title) => field.onChange(title)}
                  margin="dense"
                  label="Title"
                  required
                  fullWidth
                  error={errors.title ? true : false}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={field.value}
                      inputRef={field.ref}
                      onChange={(date) => field.onChange(date)}
                      label="Deadline"
                      sx={{ width: "100%", mt: "1rem" }}
                      format="DD.MM.YYYY"
                      disablePast
                      slotProps={{
                        textField: {
                          error: errors.deadline?.message ? true : false,
                          helperText: errors.deadline?.message,
                          required: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                );
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateTodo;
