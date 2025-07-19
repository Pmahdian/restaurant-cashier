// src/components/ui/PrintButton.js
import { useReactToPrint } from 'react-to-print';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const PrintButton = ({ componentRef }) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Button
      variant="contained"
      startIcon={<PrintIcon />}
      onClick={handlePrint}
      sx={{ mt: 2 }}
    >
      چاپ فاکتور
    </Button>
  );
};

export default PrintButton;