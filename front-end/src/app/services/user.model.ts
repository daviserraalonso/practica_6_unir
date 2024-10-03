// user.model.ts
export interface User {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
  password: string; // Aunque no deberías mostrar la contraseña en tu aplicación
  phone?: string;
}

// api-response.model.ts
import { User as UserModel } from './user.model'; // Renombrar la importación

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: UserModel[]; // Usar el nuevo nombre
}
