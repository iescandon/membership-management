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
import { ChapterUserData } from "@types";
import { useMediaQuery } from "@hooks";

interface MembersTableProps {
  memberData: ChapterUserData[];
  isLoading: boolean;
}

function CustomToolbar (props: any) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { rowTotal, selectionTotal } = props;
  return (
    <GridToolbarContainer className={`bg-[#eff0f3] flex ${isMobile ? "flex-col-reverse" : "justify-between"} items-center p-3`}>
      <div className={isMobile ? "w-full" : ""}>
        <GridToolbarQuickFilter sx={{ width: "100%" }} />
      </div>
      <div className={`${isMobile ? "w-full" : ""} flex justify-between items-center space-x-6 header-tools`}>
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
        <div className={isMobile ? "hidden" : ""}>
          <GridToolbarExport />
        </div>
      </div>
    </GridToolbarContainer>
  );
}

function CustomPagination () {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!pageCount) {
    return;
  }

  return (
    <div className={`${isMobile ? "w-screen" : "w-full"} flex justify-center`}>
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

function CustomNoRowsOverlay () {
  return (
    <div className="w-full h-full flex justify-center items-center text-center p-8">
      Select a chapter from the dropdown above to retrieve members.
    </div>
  )
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
      return (
        <img
          className="w-[50px] h-[50px] object-cover"
          alt={`${params.row.first_name} profile photo`}
          src={fileUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src='/images/placeholder.jpg';
          }}
        />
      )
    },
  },
  { field: 'first_name', headerName: 'FIRST NAME', disableColumnMenu: true, flex: 2, minWidth: 100 },
  { field: 'last_name', headerName: 'LAST NAME', disableColumnMenu: true, flex: 2, minWidth: 100 },
  { field: 'title', headerName: 'JOB TITLE', disableColumnMenu: true, flex: 3, minWidth: 150 },
  { field: 'company_name', headerName: 'COMPANY NAME', disableColumnMenu: true, flex: 3, minWidth: 150 },
  { 
    field: 'linkedin_url',
    headerName: '',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => {
        return params.formattedValue ? <a href={params.formattedValue} target="_blank" rel="noopener noreferrer"><LinkedIn className="text-[#0072b1]" /></a> : ""
    },
  },
];

export function MembersTable({ memberData, isLoading }: MembersTableProps) {
  const [rows, setRows] = useState<ChapterUserData[]>([]);
  const [selection, setSelection] = useState<GridRowSelectionModel>([]);
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery('(max-width: 768px)');

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
    <div className="py-8">
      <Box sx={{ 
        width: `${isMobile ? "92vw" : "85vw"}`,
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
        "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
          color: "white",
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
          apiRef={apiRef}
          rows={rows ?? []}
          columns={columns}
          autoHeight {...rows}
          loading={isLoading}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
            baseCheckbox: CustomCheckbox,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              rowTotal: rows.length,
              selectionTotal: selection.length,
            },
          }}
          onRowClick={handleClick}
          checkboxSelection
          hideFooterSelectedRowCount
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
