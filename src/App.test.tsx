import { render, screen } from "@testing-library/react";
import Todo from "./components/Todo";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  test("Checkbox click", async () => {
    const handleClick = () => {};
    render(
      <Todo
        todo={{ id: 1, title: "Title", deadline: new Date(), complited: false }}
        action={handleClick}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
