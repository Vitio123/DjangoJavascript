import { React, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./form/MyDatePickerField";
import MyMultilineField from "./form/MyMultilineField";
import MySelectField from "./form/MySelectField";
import MyTextField from "./form/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const MyParam = useParams();
  const MyID = MyParam.id;
  // const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`project/${MyID}`).then((res) => {
      console.log(res.data);
      setValue("name", res.data.name);
      setValue("comments", res.data.comments);
      setValue("status", res.data.status.toLowerCase());
      setValue("start_date", Dayjs(res.data.start_date));
      setValue("end_date", Dayjs(res.data.end_date));
      // setLoading(false);
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

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: DefaultValues,
  });

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    AxiosInstance.put(`project/${MyID}/`, {
      name: data.name,
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
            Edit record
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
