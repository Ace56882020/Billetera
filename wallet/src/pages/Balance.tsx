import { Box, Button, Container, TextField, Alert } from '@mui/material';
import React, { useRef, useState } from 'react';
import { getBalance } from '../services/clientService';

export const Balance: React.FC = () => {
    const [saldo, setSaldo] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [cliente, setCliente] = useState({
        document: '',
        cellphone: '',
    });
    const [errors, setErrors] = useState<{
        document?: string;
        cellphone?: string;
        amount?: string;
    }>({});
    const showMessage = (msg: string) => {
        setMessage(msg);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setMessage(null), 3000);
    };

      const validate = () => {
        const newErrors: typeof errors = {};
        if (!cliente.document) {
            newErrors.document = 'El documento es requerido';
        } else if (!/^\d{6,10}$/.test(cliente.document)) {
            newErrors.document = 'El documento debe tener entre 6 y 10 dígitos numéricos';
        }
        if (!cliente.cellphone) {
            newErrors.cellphone = 'El celular es requerido';
        } else if (!/^\d{10}$/.test(cliente.cellphone)) {
            newErrors.cellphone = 'El celular debe tener 10 dígitos numéricos';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!validate()) return;
        const response: any = await getBalance(cliente.document, cliente.cellphone);
        if (response.statusCode === 200 && response.data && response.data.balance !== undefined) {
            setSaldo(response.data.balance);
            showMessage(response.message);
        } else {
            setSaldo('');
            showMessage(response.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'document' || name === 'cellphone') {
            // Solo permitir números
            newValue = newValue.replace(/\D/g, '');
        }
        if (name === 'name') {
            // Solo permitir letras y espacios
            newValue = newValue.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
        }

        setCliente((prev) => ({
            ...prev,
            [name]: newValue,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    };

    return (
        <Container maxWidth="sm">
            <h2>Saldo de Cliente</h2>
            {message && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Número de documento"
                    name="document"
                    value={cliente.document}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!errors.document}
                    helperText={errors.document}
                    inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <TextField
                    label="Celular"
                    name="cellphone"
                    value={cliente.cellphone}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!errors.cellphone}
                    helperText={errors.cellphone}
                    inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Consultar
                </Button>
            </Box>
            <Box mt={4}>
                <TextField
                    label="Saldo"
                    value={saldo}
                    disabled
                    InputProps={{
                        readOnly: false,
                    }}
                    fullWidth
                />
            </Box>
        </Container>
    );
};
