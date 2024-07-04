import {
  gridPageSelector,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

export default function CustomPagination () {
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