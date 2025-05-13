import { Box, Button, Container, TextField, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useState, useRef } from 'react';
import { confirmPayment, payment } from '../services/PaymentService';

export const Payment: React.FC = () => {
    const [formKey, setFormKey] = useState(0);
    const [cliente, setCliente] = useState({
        document: '',
        cellphone: '',
        amount: 0,
    });
    const [message, setMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<{
        document?: string;
        cellphone?: string;
        amount?: string
    }>({});
    // Modal state
    const [openModal, setOpenModal] = useState(false);
    const [sessionData, setSessionData] = useState({ sessionId: '', token: '' });

    // Timer ref for auto-hide messages
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const showMessage = (msg: string) => {
        setMessage(msg);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setMessage(null), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        // Solo permitir números en documento, celular y saldo
        if (name === 'document' || name === 'cellphone' || name === 'amount') {
            newValue = newValue.replace(/\D/g, '');
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
        if (!cliente.amount) {
            newErrors.amount = 'El monto es requerido';
        } else if (!/^\d+$/.test(String(cliente.amount))) {
            newErrors.amount = 'El monto solo debe contener numeros';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSessionData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!validate()) return;
        const dataToSend = {
            ...cliente,
            amount: Number(cliente.amount),
        };
        try {
            const response: any = await payment(dataToSend);
            console.log('Respuesta del servidor:', response); // 👈 Asegúrate del código
            if (response.statusCode === 201) {
                setSessionData({
                    sessionId: response.data.sessionId,
                    token: '',
                })
                setFormKey((prev) => prev + 1);
                showMessage(response.message);
                setOpenModal(true); // Abrir modal al éxito
            } else {
                showMessage(response.message);
            }
        } catch (error) {
            showMessage('Error al recargar el cliente.');
            console.error('Error al recargar el cliente:', error);
        }
    };

    const handleSendSession = async () => {
        // Aquí puedes manejar el envío del sessionId y token
        console.log('Session ID:', sessionData.sessionId);
        console.log('Token:', sessionData.token);
        const dataToSend = {
            sessionId: sessionData.sessionId,
            token: sessionData.token,
        };
        try {
            const response: any = await confirmPayment(dataToSend);
            console.log('Respuesta del servidor:', response); // 👈 Asegúrate del código
            if (response.statusCode === 201) {
                setOpenModal(false);
                setCliente({ document: '', cellphone: '', amount: 0 });
                setMessage(response.message);
                setSessionData({ sessionId: '', token: '' });
            } else {
                showMessage(response.message);
            }
        } catch (error) {
            showMessage('Error al recargar el cliente.');
            console.error('Error al recargar el cliente:', error);
        }

    };

    return (
        <Container maxWidth="sm">
            <h2>Realizar Pago</h2>
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
                    label="Monto a pagar"
                    name="amount"
                    value={cliente.amount === 0 ? '' : cliente.amount}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!errors.amount}
                    helperText={errors.amount}
                    inputProps={{ maxLength: 3, inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Pagar
                </Button>
            </Box>

            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" >
                <DialogTitle>Aprobar pago</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                    <TextField
                        label="Session ID"
                        name="sessionId"
                        value={sessionData.sessionId}
                        onChange={handleSessionChange}
                        required
                        disabled
                        autoComplete="off"
                    />
                    <TextField
                        label="Token"
                        name="token"
                        value={sessionData.token}
                        onChange={handleSessionChange}
                        required
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
                    <Button onClick={handleSendSession} variant="contained" color="primary">
                        Aprobar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
