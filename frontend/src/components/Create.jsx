import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./form/MyDatePickerField";
import MyMultilineField from "./form/MyMultilineField";
import MySelectField from "./form/MySelectField";
import MyTextField from "./form/MyTextField";
import { useForm } from "react-hook-form";

export default function Create() {
  const { handleSubmit, reset, setValue, control } = useForm();

  const submission = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            background: "#00003f",
            marginBottom: "10px",
          }}
        >
          <Typography sx={{ marginLeft: "20px", color: "#fff" }}>
            Create record
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            boxShadow: 3,
            padding: 4,
            flexDirection: "column",
            marginBottom: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "10px",
            }}
          >
            <MyTextField
              label="Start date"
              name="name"
              control={control}
              placeholder="Provide a project name"
              width={"30%"}
            />
            <MyDatePickerField
              label="Start date"
              name="start_date"
              control={control}
              width={"30%"}
            />
            <MyDatePickerField
              label="End date"
              name="end_date"
              control={control}
              width={"30%"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <MyMultilineField
              label="Comments"
              name="comments"
              control={control}
              placeholder="Provide a project comments"
              width={"30%"}
            />
            <MySelectField
              label="Status"
              name="status"
              control={control}
              width={"30%"}
            />

            <Box sx={{ width: "30%" }}>
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
}
