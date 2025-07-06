import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavbarCliente from './navbarCliente';

// Datos de ejemplo de vehículos
const vehiculos = [
  {
    id: 1,
    modelo: 'Toyota Corolla',
    descripcion: 'Sedán compacto ideal para la ciudad, económico y confiable.',
    precioPorDia: 4500,
    imagen: 'https://wallpapercat.com/w/full/a/8/7/1681882-1920x1080-desktop-full-hd-toyota-corolla-background.jpg'
  },
  {
    id: 2,
    modelo: 'Honda CR-V',
    descripcion: 'SUV versátil perfecto para viajes familiares y aventuras.',
    precioPorDia: 65,
    imagen: 'https://www.hdwallpapers.in/download/honda_cr_v_ehev_black_edition_2020_4k_5k_hd-HD.jpg'
  },
  {
    id: 3,
    modelo: 'Ford Mustang',
    descripcion: 'Deportivo clásico americano con potencia y estilo inigualables.',
    precioPorDia: 120,
    imagen: 'https://images4.alphacoders.com/135/1353438.png'
  },
  {
    id: 4,
    modelo: 'BMW X5',
    descripcion: 'SUV de lujo con tecnología avanzada y máximo confort.',
    precioPorDia: 150,
    imagen: 'https://wallpapercat.com/w/full/1/7/7/1682692-2249x1500-desktop-hd-bmw-x5-background-photo.jpg'
  },
  {
    id: 5,
    modelo: 'Nissan Versa',
    descripcion: 'Hatchback económico perfecto para uso diario y viajes cortos.',
    precioPorDia: 35,
    imagen: 'https://es.nissanusa.com/content/dam/Nissan/us/vehicles/versa_sedan/2025/gallery/pfa/2025-nissan-versa-front-view-parked-front-containerized-building.jpg'
  },
  {
    id: 6,
    modelo: 'Mercedes-Benz Clase C',
    descripcion: 'Sedán ejecutivo con elegancia y prestaciones superiores.',
    precioPorDia: 180,
    imagen: 'https://cdn.motor1.com/images/mgl/Akkwn2/s1/lanzamiento-mercedes-benz-clasec-1.jpg'
  }
];

const DashboardCliente: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleHomeClick = () => {
    navigate('/dashboard-cliente');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  const handleAlquilar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <NavbarCliente onHomeClick={handleHomeClick} onLogoutClick={handleLogoutClick} />
      
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Vehículos Disponibles
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3 
        }}>
          {vehiculos.map((vehiculo) => (
            <Card 
              key={vehiculo.id}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={vehiculo.imagen}
                alt={vehiculo.modelo}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {vehiculo.modelo}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {vehiculo.descripcion}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${vehiculo.precioPorDia}/día
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={handleAlquilar}
                  sx={{ 
                    mt: 'auto',
                    fontWeight: 'bold',
                    py: 1.5
                  }}
                >
                  Alquilar Vehículo
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="info" 
          sx={{ width: '100%' }}
        >
          Funcionalidad no disponible por el momento
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardCliente;
