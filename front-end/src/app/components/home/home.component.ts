import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ApiResponse } from '../../services/api-response.model';
import { User } from '../../services/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: User[] = [];
  displayedUsers: User[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 4; // Cambia esto según lo que desees

  constructor(private userService: UserService, private router: Router) {
      this.loadUsers();
  }

  loadUsers() {
      this.userService.getUsers().subscribe({
          next: (data: ApiResponse) => {
              this.users = data.results; // Asegúrate de reemplazar
              this.updateDisplayedUsers();
              this.loading = false;
          },
          error: (err: any) => {
              console.error('Error al cargar usuarios', err);
              this.loading = false;
          }
      });
  }

  updateDisplayedUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayedUsers = this.users.slice(startIndex, startIndex + this.itemsPerPage);
      console.log('Usuarios mostrados:', this.displayedUsers); // Para verificar la salida
  }

  nextPage() {
      if (this.currentPage * this.itemsPerPage < this.users.length) {
          this.currentPage++;
          this.updateDisplayedUsers();
      }
  }

  previousPage() {
      if (this.currentPage > 1) {
          this.currentPage--;
          this.updateDisplayedUsers();
      }
  }

  totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

    viewDetails(user: User) {
        console.log(user);
        this.router.navigate([`/user-details/${user._id}`]);
    }

    home() {
        this.router.navigate(['/']);
    }

    newUser() {
        this.router.navigate(['/new-user']);
    }

    deleteUser(userId: string | undefined) {
        if (!userId) {
            console.error('ID de usuario no disponible');
            return;
        }
        
        const confirmation = confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmation) {
            this.userService.deleteUser(userId).subscribe({
                next: (response) => {
                  console.log(response)
                  alert("usuario eliminado correctametne")
                },
                error: (error) => {
                    console.error('Error al eliminar el usuario:', error);
                }
            });
        }
    }
    
    editUser(user: User) {
        this.router.navigate([`/edit-user/${user._id}`]);
    }
}



