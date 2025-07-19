import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReportsPage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const querySnapshot = await getDocs(collection(db, 'invoices'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        گزارش فروش
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>شماره فاکتور</TableCell>
              <TableCell>مشتری</TableCell>
              <TableCell>تعداد آیتم‌ها</TableCell>
              <TableCell>مبلغ کل</TableCell>
              <TableCell>تاریخ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id.slice(0, 6)}...</TableCell>
                <TableCell>{invoice.customerName || 'ناشناس'}</TableCell>
                <TableCell>{invoice.items.length}</TableCell>
                <TableCell>{invoice.total.toLocaleString()} تومان</TableCell>
                <TableCell>
                  {new Date(invoice.timestamp?.toDate()).toLocaleString('fa-IR')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportsPage;