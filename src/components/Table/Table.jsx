import * as React from "react";
import { DataGrid, GridToolbarContainer, GridRowModes } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "emp_no", width: 100},
  { field: "first_name", headerName: "First name", width: 130, editable: true },
  { field: "last_name", headerName: "Last name", width: 130, editable: true },
  {
    field: "gender",
    headerName: "Gender",
    type: "character",
    width: 90,
    editable: true,
  },
  {
    field: "birth_date",
    headerName: "Birth Date",
    type: "date",
    width: 130,
    editable: true,
  },
  {
    field: "hire_date",
    headerName: "Hire Date",
    type: "date",
    width: 130,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    width: 130,
    renderCell: (params) => (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            if(window.confirm("Are you sure you want to delete this record?")){
              axios
              .delete(`${process.env.REACT_APP_API_URL}admin/Delete_user`, {
                data: { id: params.row.id },
              })
              .then((res) => {
                if (res.status === 200) {
                  alert("Delete success");
                  window.location.reload();
                }
                else {
                  alert("Delete failed");
                }
              })
              .catch((err) => {
                console.log(err);
              });
            }
          }}
        >
          Delete
        </Button>
      </strong>
    ),
  },
];

export default function DataTable() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin/Get_all_users`)
      .then((res) => {
        const updatedRows = res.data.map((item) => {
          return {
            id: item.id,
            birth_date: new Date(item.birth_date),
            first_name: item.first_name,
            last_name: item.last_name,
            gender: item.gender,
            hire_date: new Date(item.hire_date),
          };
        });
        setRows(updatedRows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function EditToolbar(props) {
    const { setRows } = props;

    const handleClick = () => {
      const id = "";
      setRows((oldRows) => [
        {
          id,
          first_name: "",
          last_name: "",
          gender: "",
          birth_date: "",
          hire_date: "",
          isNew: true,
        },
        ...oldRows
      ]);
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box className="h-700 w-3/4 mx-auto p-10">
      <Typography variant="h5" className="text-left mb-10 font-extrabold">
        Employee Table
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        getRowId={(row) => row.id}
        processRowUpdate={(e) => {
          console.log(e);
          axios
            .put(`${process.env.REACT_APP_API_URL}admin/Update_user`, e, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              if (res.status === 200) {
                alert("Update success");
                window.location.reload();
              }
              else {
                alert("Update failed");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[15, 30, 60]}
      />
    </Box>
  );
}
