import { Box, Button, Container, TextField, Alert } from '@mui/material';
import React, { useState, useRef } from 'react';
import { createClient } from '../services/clientService';

export const Clients: React.FC = () => {
    const [formKey, setFormKey] = useState(0);
    const [cliente, setCliente] = useState({
        document: '',
        cellphone: '',
        name: '',
        email: '',
    });
    const [message, setMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<{
        document?: string;
        cellphone?: string;
        name?: string;
        email?: string;
    }>({});
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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
        if (!cliente.name) {
            newErrors.name = 'El nombre es requerido';
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(cliente.name)) {
            newErrors.name = 'El nombre solo debe contener letras y espacios';
        }
        if (!cliente.email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(cliente.email)) {
            newErrors.email = 'El correo electrónico no es válido';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!validate()) return;
        try {
            const response: any = await createClient(cliente);
            if (response.statusCode === 201) {
                setFormKey((prev) => prev + 1);
                setCliente({ document: '', cellphone: '', name: '', email: '' });
                setErrors({});
                showMessage(response.message);
            } else {
                showMessage(response.message);
            }
        } catch (error) {
            showMessage('Error al crear el cliente.');
            console.error('Error al crear el cliente:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Crear Nuevo Cliente</h2>
            {message && <Alert severity="info" style={{ marginBottom: 20 }}>{message}</Alert>}
            <Box
                component="form"
                key={formKey}
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                autoComplete="off"
            >
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
                <TextField
                    label="Nombre"
                    name="name"
                    value={cliente.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!errors.name}
                    helperText={errors.name}
                    inputProps={{ maxLength: 50, pattern: '[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]*' }}
                />
                <TextField
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={cliente.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <Button type="submit" variant="contained" color="primary">
                    Crear Cliente
                </Button>
            </Box>
        </Container>
    );
};
