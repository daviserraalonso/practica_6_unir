import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import $ from 'jquery';



@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  userIdToDelete: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: user => {
          console.log(user)
            this.user = user;
        },
        error: err => {
            console.error('Error al cargar el usuario:', err);
        }
    });
    }
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

  goBack() {
    this.router.navigate(['/']);
  }
}
