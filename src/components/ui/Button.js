import { Button as MuiButton } from '@mui/material';

const Button = ({ children, ...props }) => {
  return (
    <MuiButton
      variant="contained"
      sx={{
        fontFamily: 'Vazirmatn',
        borderRadius: '8px',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;