import { Button, Box, AppBar, Toolbar, Typography} from "@mui/material";
import { useState } from "react";

const Navbar = ({ setSelectedFilter }) => {
  const [selected, setSelected] = useState("all");

  const handleButtonClick = (value) => {
    setSelected(value);
    setSelectedFilter(value);
  };

  return (
    <AppBar position="static">
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Taskify
          </Typography>
        <Box sx={{ flexGrow: 1 }}>
        <Button
        color="inherit"
          variant={selected === "all" ? "contained" : "text"}
          onClick={() => handleButtonClick("all")}
        >
          All
        </Button>
        <Button
        color="inherit"
          variant={selected === "completed" ? "contained" : "text"}
          onClick={() => handleButtonClick("completed")}
        >
          Completed
        </Button>
        <Button
        color="inherit"
          variant={selected === "pending" ? "contained" : "text"}
          onClick={() => handleButtonClick("pending")}
        >
          Pending
        </Button>
          </Box>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;