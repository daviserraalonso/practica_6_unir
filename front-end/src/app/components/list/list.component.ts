// list.component.ts
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ApiResponse } from '../../services/api-response.model'; // Asegúrate de importar correctamente
import { User } from '../../services/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  users: User[] = [];
  loading: boolean = true;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: ApiResponse) => {
        this.users = data.results; // Ahora se asigna correctamente
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios', err);
        this.loading = false;
      }
    });
  }
}
