// api-response.model.ts
import { User } from './user.model'; // Asegúrate de que User esté definido aquí

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: User[]; // Aquí se utiliza el tipo User que ya definiste
}
