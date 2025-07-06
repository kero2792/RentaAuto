import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginCliente } from '../libs/Api/rentaRequest';
import type { LoginForm } from '../types';

interface LoginProps {
    onLogin?: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!form.email || !form.password) {
            setError('Por favor, ingresa tu teléfono/nombre y contraseña.');
            setIsLoading(false);
            return;
        }

        try {
            // Intentar autenticación
            await loginCliente(form);
            
            // Si la autenticación es exitosa
            if (onLogin) {
                onLogin(form.email, form.password);
            }
            
            // Redirigir al dashboard del cliente
            navigate('/dashboard-cliente');
            
        } catch (error) {
            setError('Teléfono/nombre o contraseña incorrectos. Por favor, intenta nuevamente.');
            console.error('Error en el login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
            <Paper elevation={6} sx={{ p: 4, width: 350, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="Teléfono o Nombre"
                        name="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={form.email}
                        onChange={handleChange}
                        autoFocus
                        required
                        disabled={isLoading}
                        helperText="Ingresa tu número de teléfono o nombre"
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1, mb: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Entrar'}
                    </Button>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Link component={RouterLink} to="/signup" underline="hover">
                            ¿No tienes una cuenta? Crea una
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;