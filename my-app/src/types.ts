export type Renta = {
  id: number
  cliente: string
  vehiculo: string
  fechaInicio: string
  fechaFin: string
  total: number
}

export interface RentaAPI {
  rentaID: number
  nombre: string
  vehiculo: string
  fechaRenta: string
  fechaFinal: string
}

export interface Cliente {
  id?: number
  nombres: string
  apellidos: string
  telefono: string
  direccion: string
  password: string
}

export interface ClienteForm {
  nombres: string
  apellidos: string
  telefono: string
  direccion: string
  password: string
  confirmPassword: string
}

export interface LoginForm {
  email: string  // This field now stores phone number or name
  password: string
}

export type Columna<T> = {
  key: keyof T
  header: string
  render?: (value: any, row: T) => React.ReactNode
} 