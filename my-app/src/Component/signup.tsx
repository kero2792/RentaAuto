import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registerCliente } from '../libs/Api/rentaRequest';
import type { ClienteForm } from '../types';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<ClienteForm>({
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validaciones básicas
    if (!form.nombres || !form.apellidos || !form.telefono || !form.direccion || !form.password || !form.confirmPassword) {
      setError('Por favor, completa todos los campos requeridos.');
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      // Enviar datos al backend
      await registerCliente({
        nombres: form.nombres,
        apellidos: form.apellidos,
        telefono: form.telefono,
        direccion: form.direccion,
        password: form.password
      });
      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setError('Error en el registro. Por favor, intenta nuevamente.');
      console.error('Error en el registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Paper elevation={6} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Crear cuenta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Nombres"
            name="nombres"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.nombres}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <TextField
            label="Apellidos"
            name="apellidos"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.apellidos}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <TextField
            label="Número de teléfono"
            name="telefono"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.telefono}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <TextField
            label="Dirección"
            name="direccion"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.direccion}
            onChange={handleChange}
            required
            disabled={isLoading}
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
            helperText="Mínimo 6 caracteres"
          />
          <TextField
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" underline="hover">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
