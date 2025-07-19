// ReportsPage.js بهبود یافته
import { TablePagination } from '@mui/material';

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);

// تغییر TableBody:
{invoices
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((invoice) => (
    <TableRow key={invoice.id}>
      {/* ... */}
    </TableRow>
  ))}

// اضافه کردن در انتهای کامپوننت:
<TablePagination
  rowsPerPageOptions={[10, 25, 50]}
  component="div"
  count={invoices.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(e, newPage) => setPage(newPage)}
  onRowsPerPageChange={(e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }}
  labelRowsPerPage="تعداد در هر صفحه:"
/>