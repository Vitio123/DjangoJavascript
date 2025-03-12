import { React, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./form/MyDatePickerField";
import MyMultilineField from "./form/MyMultilineField";
import MySelectField from "./form/MySelectField";
import MyTextField from "./form/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PuffLoader } from "react-spinners";

export default function Create() {
  const [projectmanager, setProjectmanager] = useState([]);
  const [loading, setLoading] = useState(true);

  const hardcode_options = [
    { id: "open", name: "Open" },
    { id: "in_progress", name: "In Progress" },
    { id: "completed", name: "Completed" },
  ];

  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) => {
      setProjectmanager(res.data);
      // console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const DefaultValues = {
    name: "",
    comments: "",
    status: "",
    start_date: "",
    end_date: "",
  };

  const schema = yup
    .object({
      name: yup.string().required("Name is required field"),
      status: yup.string().required("Status is required field"),
      projectmanager: yup
        .string()
        .required("Project Manager is required field"),
      comments: yup.string(),
      start_date: yup.date().required("Start date is required field"),
      end_date: yup
        .date()
        .required("End date is required field")
        .min(yup.ref("start_date"), "End date must be after start date"),
    })
    .required();

  const { handleSubmit, control } = useForm({
    defaultValues: DefaultValues,
    resolver: yupResolver(schema),
  });

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    AxiosInstance.post(`project/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      comments: data.comments,
      status: data.status,
      start_date: StartDate,
      end_date: EndDate,
    })
      .then((response) => {
        console.log("Project created successfully:", response.data);
        navigate(`/`);
      })
      .catch((error) => {
        console.error(
          "There was an error creating the project:",
          error.response.data
        );
      });
  };
  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <PuffLoader color="blue" size={80} />
        </div>
      ) : (
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
                options={hardcode_options}
              />

              <MySelectField
                label="Project Manager"
                name="projectmanager"
                control={control}
                width={"30%"}
                options={projectmanager}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginTop: "40px",
              }}
            >
              <Button variant="contained" type="submit" sx={{ width: "30%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
}
