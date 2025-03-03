import React from "react";
import { Box, Typography } from "@mui/material";

export default function Create() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          background: "#00003f",
          marginBottom: "10px",
        }}
      >
        <Typography sx={{ marginLeft: "20px" }}>Create</Typography>
      </Box>
    </div>
  );
}
