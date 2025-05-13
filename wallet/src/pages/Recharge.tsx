import { Alert, Box, Button, Container, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { rechargeBalance } from '../services/clientService';

export const Recharge: React.FC = () => {
    const [formKey, setFormKey] = useState(0);
    const [recharge, setRecharge] = useState({
        document: '',
        cellphone: '',
        amount: 0
    });
    const [message, setMessage] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        // Solo permitir números en documento, celular y saldo
        if (name === 'document' || name === 'cellphone' || name === 'amount') {
            newValue = newValue.replace(/\D/g, '');
        }
        setRecharge((prev) => ({
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
        if (!recharge.document) {
            newErrors.document = 'El documento es requerido';
        } else if (!/^\d{6,10}$/.test(recharge.document)) {
            newErrors.document = 'El documento debe tener entre 6 y 10 dígitos numéricos';
        }
        if (!recharge.cellphone) {
            newErrors.cellphone = 'El celular es requerido';
        } else if (!/^\d{10}$/.test(recharge.cellphone)) {
            newErrors.cellphone = 'El celular debe tener 10 dígitos numéricos';
        }
        if (!recharge.amount) {
            newErrors.amount = 'El monto es requerido';
        } else if (!/^\d+$/.test(String(recharge.amount))) {
            newErrors.amount = 'El monto solo debe contener números';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!validate()) return;
        const dataToSend = {
            ...recharge,
            amount: Number(recharge.amount),
        };
        try {
            const response: any = await rechargeBalance(dataToSend);
            console.log('Respuesta del servidor:', response, '---------', dataToSend); // 👈 Asegúrate del código
            if (response.statusCode === 201) {
                setFormKey((prev) => prev + 1);
                setRecharge({ document: '', cellphone: '', amount: 0 });
                showMessage(response.message);
            } else {
                showMessage(response.message);
                // setRecharge({ document: '', cellphone: '', amount: 0 });
            }
        } catch (error) {
            showMessage('Error al crear el cliente.');
            console.error('Error al crear el cliente:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Recargar Saldo</h2>
            {message && <Alert severity="info" style={{ marginBottom: 20 }}>{message}</Alert>}
            <Box
                key={formKey}
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                autoComplete="off"
            >
                <TextField
                    label="Número de documento"
                    name="document"
                    value={recharge.document}
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
                    value={recharge.cellphone}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!errors.cellphone}
                    helperText={errors.cellphone}
                    inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}

                />
                <TextField
                    label="Saldo"
                    name="amount"
                    value={recharge.amount === 0 ? '' : recharge.amount}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    error={!!errors.amount}
                    helperText={errors.amount}
                    inputProps={{ maxLength: 3, inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Recargar
                </Button>
            </Box>
        </Container>
    );
};
