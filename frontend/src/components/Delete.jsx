import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";

export default function Delete() {
  const MyParam = useParams();
  const MyId = MyParam.id;

  const [myData, setMyData] = useState({});
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`)
      .then((response) => {
        setMyData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const submission = () => {
    AxiosInstance.delete(`project/${MyId}/`)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
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
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              background: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "#fff" }}>
              Delete project : {myData.name}
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
            Are you sure that you want to delete this project: {myData.name}
          </Box>
          <Box sx={{ width: "30%" }}>
            <Button
              variant="contained"
              onClick={submission}
              sx={{ width: "100%" }}
            >
              Delete the project
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
}
