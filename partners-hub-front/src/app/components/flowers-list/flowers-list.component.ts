import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlowerService } from "../../services/flower.service";
import { AuthService } from "../../services/auth.service";

interface Flower {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  color: string;
  category: string;
  image: string;
  flowerType: string;
  size: string;
  careTips: string;
  availability: boolean;
}

@Component({
  selector: "app-flowers-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./flowers-list.component.html",
  styleUrls: ["./flowers-list.component.css"],
})
export class FlowersListComponent implements OnInit {
  flowers: Flower[] = [];
  displayedFlowers: Flower[] = [];
  isAdmin = false;
  sortOrder: "asc" | "desc" = "desc";

  constructor(
    private flowerService: FlowerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadFlowers();
    this.isAdmin = this.authService.isAdminUser();
  }

  loadFlowers() {
    this.flowerService.getFlowers().subscribe(
      (flowers) => {
        this.flowers = flowers;
        this.sortFlowersByName();
      },
      (error) => {
        this.flowers = [];
        this.displayedFlowers = [];
        console.error("Error loading flowers", error);
      }
    );
  }

  deleteFlower(flowerId: number) {
    this.flowerService.deleteFlower(flowerId).subscribe(
      () => {
        this.flowers = this.flowers.filter((flower) => flower.id !== flowerId);
        this.sortFlowersByName();
      },
      (error) => {
        console.error("Error deleting flower", error);
      }
    );
  }

  sortFlowersByName() {
    this.displayedFlowers = [...this.flowers].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return this.sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    this.sortFlowersByName();
  }
}
