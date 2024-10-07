import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface RatingControls {
  design: number;
  performance: number;
  comfort: number;
  service: number;
  value: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
[x: string]: any;
  reviewForm: FormGroup;
  ratingCategories = ["Design", 'Performance', 'Comfort', 'Service', 'Value'];
  bikeImage = "../assets/slide2.jpg" // Replace with actual image path

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      overallRating: [0, Validators.required],
      ratings: this.fb.group(this.createRatingControls()),
      mileage: [0, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  createRatingControls(): RatingControls {
    return {
      design: 0,
      performance: 0,
      comfort: 0,
      service: 0,
      value: 0
    };
  }

  formatControlName(category: string): keyof RatingControls {
    return category.toLowerCase().replace(/ /g, '') as keyof RatingControls;
  }

  setRating(category: string, rating: number) {
    console.log(`Setting rating for ${category}: ${rating}`);
    if (category === 'Overall') {
      console.log(category);
      this.reviewForm.patchValue({ overallRating: rating });
    } else {
      this.reviewForm.get('ratings')?.patchValue({ [this.formatControlName(category)]: rating });
    }
  }

  submitReview() {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
      // Handle form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }
  onMileageChange(value: string) {
    const mileageValue = parseInt(value, 10); // Parse the input value
    this.reviewForm.get('mileage')?.setValue(mileageValue); // Use optional chaining
  }
  
  

  getSliderBackground() {
    const value = this.reviewForm.get('mileage')?.value || 0;
    const max = 150; // Replace with your actual max value
    const percentage = (value / max) * 100;
  
    // Set color based on the percentage value
    return `linear-gradient(to right, #4CAF50 ${percentage}%, #ddd ${percentage}%)`;
  }
  
  
}
