import { ToggleButton, ToggleButtonGroup, Tooltip, Zoom } from "@mui/material";
import { FC, MouseEvent } from "react";

type ToggleProps = {
    filter: string,
    action: (event: MouseEvent<HTMLElement>, newFilter: string) => void
}

const ToggleButtons: FC<ToggleProps> = ({filter, action}) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={filter}
      exclusive
      onChange={action}
      aria-label="typed todos"
      size="small"
    >
      <Tooltip
        title="Show all todos"
        arrow
        TransitionComponent={Zoom}
        className="second-step"
      >
        <ToggleButton value="All" aria-label="All" className="second-all-step">
          All
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Show complited todos" arrow TransitionComponent={Zoom}>
        <ToggleButton
          value="Complited"
          aria-label="Complited"
          className="second-complited-step"
        >
          Complited
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Show unfinished todos" arrow TransitionComponent={Zoom}>
        <ToggleButton
          value="Unfinished"
          aria-label="Unfinished"
          className="second-unfinished-step"
        >
          Unfinished
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
