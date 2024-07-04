import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { CustomFooter } from "./customFooter";
import { CustomToolbar } from "./customToolbar";
import { CustomCheckbox } from "./customCheckbox";
import { UserData } from "@/types";


interface MembersTableProps {
  memberData: UserData[];
  isLoading: boolean;
}

export default function MembersTable({ memberData, isLoading }: MembersTableProps) {
  const [rows, setRows] = useState<UserData[]>([]);
  const [selection, setSelection] = useState<GridRowSelectionModel>([]);

  const columns: GridColDef<UserData>[] = [
    {
      field: 'profile_photo',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      width: 70,
      renderCell: (params) => {
        const fileUrl = params.formattedValue.length ? params.formattedValue[0].file_url : '/images/placeholder.jpg';
        return <img className="w-full h-full object-cover" src={fileUrl} />
      },
    },
    { field: 'first_name', headerName: 'FIRST NAME', disableColumnMenu: true, width: 125 },
    { field: 'last_name', headerName: 'LAST NAME', disableColumnMenu: true, width: 125 },
    { field: 'email', headerName: 'E-MAIL', disableColumnMenu: true, width: 250 },
    {
      field: 'job_title',
      headerName: 'JOB TITLE',
      disableColumnMenu: true,
      width: 250,
      valueGetter: (value, row) => row.job_info?.title,
    },
    {
      field: 'company_name',
      headerName: 'COMPANY NAME',
      disableColumnMenu: true,
      width: 250,
      valueGetter: (value, row) => row.job_info?.company_name,
    },
  ];

  useEffect(() => {
    setRows(memberData ?? []);
  }, [memberData])

  useEffect(() => {
    if (isLoading) {
      setRows([]);
    };
  }, [isLoading])

  return (
    <Box sx={{ 
      width: '100%', 
      backgroundColor: 'white', 
      "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
        display: "none!important"
      },
      "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
        outline: "none!important",
      },
      "& .MuiInput-root": {
        backgroundColor: "white",
        padding: "2px 8px 2px 8px"
      },
      "& .header-tools .MuiButtonBase-root": {
        color: "#1976D2",
      },
      // FIXME: attempt to hide Print button, not working
      "& div.MuiDataGrid-menu ul.MuiDataGrid-menuList li.MuiMenuItem-root:nth-child(2)": {
        display: "none!important",
        color: "red",
      },
      }}>
      <DataGrid
        rows={rows ?? []}
        columns={columns}
        autoHeight {...rows}
        loading={isLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        slots={{
          toolbar: CustomToolbar,
          footer: CustomFooter,
          baseCheckbox: CustomCheckbox,
        }}
        slotProps={{
          toolbar: {
            rowTotal: rows.length,
            selectionTotal: selection.length,
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={setSelection}
      />
    </Box>
  );
}
