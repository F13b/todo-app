import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box component={"header"} sx={{ p: ".75rem .5rem" }}>
      <Typography component={"h1"} variant="h4">
        To-Do
      </Typography>
    </Box>
  );
};

export default Header;
