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
  user: User | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe(userData => {
        this.user = userData || { first_name: '', last_name: '', username: '', email: '', image: '' };
      });
    }
  }

  saveUser() {
    if (this.user) {
      this.userService.updateUser(this.user._id, this.user).subscribe(response => {
        console.log('Usuario actualizado:', response);
        if(response){
          alert("Usuario modificado con exito!");
          this.router.navigate([`edit-user/${this.user?._id}`]);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
