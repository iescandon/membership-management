import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  gridPageSelector,
  gridPageCountSelector,
  useGridApiContext,
  useGridApiRef,
  useGridSelector,
  GridEventListener,
} from '@mui/x-data-grid';
import { Box, Pagination, Typography } from '@mui/material';
import { GroupOutlined, CheckCircle, LinkedIn } from '@mui/icons-material';
import { ChapterUserData, UserData } from "@/types";

interface MembersTableProps {
  memberData: ChapterUserData[];
  isLoading: boolean;
}

function CustomToolbar (props: any) {
  const { rowTotal, selectionTotal } = props;
  return (
    <GridToolbarContainer className="bg-[#eff0f3] flex justify-between items-center p-3">
      <GridToolbarQuickFilter />
      <div className="flex items-center space-x-6 header-tools">
        <div className="flex space-x-2">
          <GroupOutlined />
          <Typography>
            {rowTotal} total
          </Typography>
        </div>
        <div className="flex space-x-2">
          <CheckCircle className="text-green-600" />
          <Typography>
            {selectionTotal} checked in
          </Typography>
        </div>
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
}

function CustomPagination () {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  if (!pageCount) {
    return;
  }

  return (
    <div className="w-full flex justify-center">
      <Pagination
        sx={(theme) => ({ padding: theme.spacing(1.5, 0) })}
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </div>
  );
}

function CustomCheckbox (props: any) {
  return <CheckCircle className={props.checked ? 'text-green-600' : 'text-gray-300'} />
}

const columns: GridColDef<ChapterUserData>[] = [
  {
    field: 'profile_photo',
    headerName: '',
    sortable: false,
    disableColumnMenu: true,
    disableExport: true,
    width: 70,
    renderCell: (params) => {
      const fileUrl = params.formattedValue.length ? params.formattedValue[0] : '/images/placeholder.jpg';
      return <img className="w-full h-full object-cover" src={fileUrl} alt={`${params.row.first_name} profile photo`} />
    },
  },
  { field: 'first_name', headerName: 'FIRST NAME', disableColumnMenu: true, width: 150 },
  { field: 'last_name', headerName: 'LAST NAME', disableColumnMenu: true, width: 150 },
  { field: 'title', headerName: 'JOB TITLE', disableColumnMenu: true, width: 300 },
  { field: 'company_name', headerName: 'COMPANY NAME', disableColumnMenu: true, width: 300 },
  { 
    field: 'linkedin_url',
    headerName: '',
    disableColumnMenu: true,
    width: 70,
    renderCell: (params) => {
        return params.formattedValue ? <a href={params.formattedValue} target="_blank" rel="noopener noreferrer"><LinkedIn className="text-[#0072b1]" /></a> : ""
    },
  },
];

// const columns: GridColDef<UserData>[] = [
//   {
//     field: 'profile_photo',
//     headerName: '',
//     sortable: false,
//     disableColumnMenu: true,
//     disableExport: true,
//     width: 70,
//     renderCell: (params) => {
//       const fileUrl = params.formattedValue.length ? params.formattedValue[0].file_url : '/images/placeholder.jpg';
//       return <img className="w-full h-full object-cover" src={fileUrl} alt={`${params.row.name} profile photo`} />
//     },
//   },
//   { field: 'first_name', headerName: 'FIRST NAME', disableColumnMenu: true, width: 125 },
//   { field: 'last_name', headerName: 'LAST NAME', disableColumnMenu: true, width: 125 },
//   { field: 'email', headerName: 'E-MAIL', disableColumnMenu: true, width: 250 },
//   {
//     field: 'job_title',
//     headerName: 'JOB TITLE',
//     disableColumnMenu: true,
//     width: 250,
//     valueGetter: (value, row) => row.job_info?.title,
//   },
//   {
//     field: 'company_name',
//     headerName: 'COMPANY NAME',
//     disableColumnMenu: true,
//     width: 250,
//     valueGetter: (value, row) => row.job_info?.company_name,
//   },
// ];

export default function MembersTable({ memberData, isLoading }: MembersTableProps) {
  const [rows, setRows] = useState<ChapterUserData[]>([]);
  const [selection, setSelection] = useState<GridRowSelectionModel>([]);
  const apiRef = useGridApiRef();

  const handleClick: GridEventListener<'rowClick'> = (
    params,
    event,
    details,
  ) => {
    if (event.type === "click" && event.detail === 2) {
      let selectedIds;
      if (selection.includes(params.id)) {
        selectedIds = selection.filter((id) => id !== params.id)
      } else {
        selectedIds = [...selection, params.id];
      }
      apiRef.current.setRowSelectionModel(selectedIds);
      setSelection(selectedIds);
    }
  };

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
      "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus-within": {
        outline: "none!important",
      },
      "& .MuiInput-root": {
        backgroundColor: "white",
        padding: "2px 8px 2px 8px"
      },
      "& .header-tools .MuiButtonBase-root": {
        color: "#1976D2",
      },
      }}>
      <DataGrid
      sx={{ height: "595px" }}
        apiRef={apiRef}
        rows={rows ?? []}
        columns={columns}
        // autoHeight {...rows}
        loading={isLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
          // sorting: { sortModel: [{ field: 'last_name', sort: 'asc' }]},
        }}
        slots={{
          toolbar: CustomToolbar,
          pagination: CustomPagination,
          baseCheckbox: CustomCheckbox,
        }}
        slotProps={{
          toolbar: {
            rowTotal: rows.length,
            selectionTotal: selection.length,
          },
        }}
        onRowClick={handleClick}
        checkboxSelection
        // onRowSelectionModelChange={setSelection}
        hideFooterSelectedRowCount
        disableRowSelectionOnClick
      />
    </Box>
  );
}
