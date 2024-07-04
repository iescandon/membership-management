import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { GroupOutlined, CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';


export default function CustomToolbar (props: any) {
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