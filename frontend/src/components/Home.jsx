import { React, useEffect, useMemo, useState } from "react";
import AxiosInstance from "./Axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Dayjs from "dayjs";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const GetData = () => {
    AxiosInstance.get(`project/`).then((res) => {
      setMyData(res.data);
      // console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, [location.state]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => {
          const rawValue = cell.getValue();
          const displayValue = rawValue.replaceAll("_", " ");
          return displayValue;
        },
      },
      {
        accessorKey: "comments",
        header: "Comments",
        size: 200,
      },
      {
        accessorFn: (row) => Dayjs(row.start_date).format("DD-MM-YYYY"),
        header: "Start Date",
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format("DD-MM-YYYY"),
        header: "End Date",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: myData,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "8px" }}>
        <IconButton
          color="secondary"
          component={Link}
          to={`edit/${row.original.id}`}
          onClick={() => console.log("Editar", row.original)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => console.log("Eliminar", row.original)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  });

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
        <MaterialReactTable table={table} />
      )}
    </div>
  );
}
