import { Component, OnInit } from '@angular/core';
import { FlowerService } from '../../services/flower.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-flower',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-flower.component.html',
  styleUrls: ['./add-flower.component.css']
})
export class AddFlowerComponent implements OnInit {
  flower = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    color: '',
    category: '',
    image: '',
    flowerType: '',
    size: '',
    careTips: '',
    availability: true
  };

  constructor(
    private flowerService: FlowerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.isAdminUser()) {
      this.router.navigate(['/flowers']);
    }
  }

  onSubmit() {
    this.flowerService.addFlower(this.flower).subscribe(
      () => {
        this.router.navigate(['/flowers']);
      },
      error => {
        console.error('Ошибка при добавлении цветка', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result.split(',')[1];
        this.flower.image = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }
}
