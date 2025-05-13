import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#fff' }}>Clientes</Button>
                </Link>
                <Link to="/recargas" style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#fff' }}>Recargas</Button>
                </Link>
                <Link to="/consultar-saldo" style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#fff' }}>Consultar Saldo</Button>
                </Link>
                <Link to="/pagos" style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#fff' }}>Pagos</Button>
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ color: '#fff' }}>
                    billetera
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
