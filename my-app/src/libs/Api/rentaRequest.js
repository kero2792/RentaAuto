import { API_URL } from '../ApiConfig'


export const getRentas = async () => {
    try {
        const response = await fetch(`${API_URL}/Renta/RentaGet`);
        if (!response.ok) throw new Error('Error en la solicitud');

        const rentas = await response.json();
        return rentas;
      } catch (error) {
        console.error('Error obteniendo tarjetas:', error)
    
        return null
      }
}


export const createRenta = async (renta) => {
    // Mapeo de campos para el backend
    const rentaBackend = {
        nombre: renta.cliente,
        vehiculo: renta.vehiculo,
        fechaRenta: renta.fechaInicio,
        fechaFinal: renta.fechaFin,
        total: renta.total // Si el backend lo usa
    }
    const response = await fetch(`${API_URL}/Renta/RentaPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rentaBackend)
    })
    return response.json()
}

export const updateRenta = async (id, renta) => {
    // Mapeo de campos para el backend
    const rentaBackend = {
        nombre: renta.cliente,
        vehiculo: renta.vehiculo,
        fechaRenta: renta.fechaInicio,
        fechaFinal: renta.fechaFin,
        total: renta.total // Si el backend lo usa
    }
    const response = await fetch(`${API_URL}/Renta/RentaPut/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rentaBackend)
    })
    return response.json()
}

export const deleteRenta = async (id) => {
    const response = await fetch(`${API_URL}/Renta/RentaDelete/${id}`, {
        method: 'DELETE'
    })
    if (response.status === 204) {
        return true
    }
    return response.json()
}

export const registerCliente = async (cliente) => {
    try {
        // Mapeo de campos para el backend según la clase Cliente
        const clienteBackend = {
            nombres: cliente.nombres,
            apellidos: cliente.apellidos,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            password: cliente.password
        }
        
        const response = await fetch(`${API_URL}/Cliente/ClientePost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteBackend)
        })
        
        if (!response.ok) {
            throw new Error(`Error en el registro: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error registrando cliente:', error);
        throw error;
    }
}

export const loginCliente = async (loginData) => {
    try {
        // Primero obtener todos los clientes para buscar por email
        const response = await fetch(`${API_URL}/Cliente/ClienteGet`);
        
        if (!response.ok) {
            throw new Error(`Error obteniendo clientes: ${response.status}`);
        }
        
        const clientes = await response.json();
        
        // Buscar el cliente por email (asumiendo que el email está en algún campo)
        // Por ahora, buscaremos por número de teléfono como identificador único
        const cliente = clientes.find(c => 
            c.telefono === loginData.email || 
            c.nombres.toLowerCase().includes(loginData.email.toLowerCase())
        );
        
        if (!cliente) {
            throw new Error('Usuario no encontrado');
        }
        
        // Verificar contraseña
        if (cliente.password !== loginData.password) {
            throw new Error('Contraseña incorrecta');
        }
        
        return cliente;
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
}

export const getClientes = async () => {
    try {
        const response = await fetch(`${API_URL}/Cliente/ClienteGet`);
        if (!response.ok) throw new Error('Error en la solicitud');

        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error('Error obteniendo clientes:', error);
        return null;
    }
}

export const updateCliente = async (id, cliente) => {
    try {
        const clienteBackend = {
            nombres: cliente.nombres,
            apellidos: cliente.apellidos,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            password: cliente.password
        }
        
        const response = await fetch(`${API_URL}/Cliente/ClientePut/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteBackend)
        });
        
        if (!response.ok) {
            throw new Error(`Error actualizando cliente: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error actualizando cliente:', error);
        throw error;
    }
}

export const deleteCliente = async (id) => {
    try {
        const response = await fetch(`${API_URL}/Cliente/ClienteDelete/${id}`, {
            method: 'DELETE'
        });
        
        if (response.status === 204) {
            return true;
        }
        
        if (!response.ok) {
            throw new Error(`Error eliminando cliente: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error eliminando cliente:', error);
        throw error;
    }
}

