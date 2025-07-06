import { Renta, RentaAPI, Cliente, LoginForm } from '../../types';

export const getRentas: () => Promise<RentaAPI[] | null>;
export const createRenta: (renta: Renta) => Promise<RentaAPI>;
export const updateRenta: (id: number, renta: Renta) => Promise<RentaAPI>;
export const deleteRenta: (id: number) => Promise<boolean>;
export const getClientes: () => Promise<Cliente[] | null>;
export const registerCliente: (cliente: Omit<Cliente, 'id'>) => Promise<Cliente>;
export const updateCliente: (id: number, cliente: Omit<Cliente, 'id'>) => Promise<Cliente>;
export const deleteCliente: (id: number) => Promise<boolean>;
export const loginCliente: (loginData: LoginForm) => Promise<Cliente>;
export const API_URL: string; 