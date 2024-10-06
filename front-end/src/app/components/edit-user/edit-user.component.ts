// edit-user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = { _id: '', id: 0, first_name: '', last_name: '', username: '', email: '', image: '', password: '' };
  isEditMode: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
          this.userService.getUserById(userId).subscribe(userData => {
              this.user = userData;
          });
      } else {
          // Inicializa con valores por defecto
          this.user = {
              _id: '', // Asignar un string vacío o un valor por defecto
              id: undefined, // O simplemente omitir esta propiedad
              first_name: '',
              last_name: '',
              username: '',
              email: '',
              image: '',
              password: ''
          };
      }
  }


  saveUser() {
    if (this.user) {
      if (this.isEditMode) {
        // Actualizar usuario existente
        this.userService.updateUser(this.user._id, this.user).subscribe(response => {
          console.log('Usuario actualizado:', response);
          alert("Usuario modificado con éxito!");
          this.router.navigate(['/']);
        });
      } else {
        // Crear nuevo usuario
        this.userService.createUser(this.user).subscribe(response => {
          console.log('Usuario creado:', response);
          alert("Usuario creado con éxito!");
          this.router.navigate(['/']);
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  newUser() {
    this.router.navigate(['/new-user']);
  }
}
