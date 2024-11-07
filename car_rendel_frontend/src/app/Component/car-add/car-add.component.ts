import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CarServiceService } from '../../car-service.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent {
  carForm: FormGroup;

  constructor(private fb: FormBuilder, private carService: CarServiceService) {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      registrationNo: ['', Validators.required],
      rentalPrice: ['', Validators.required, this.priceValidator], 
      keyMoney: ['', Validators.required, this.priceValidator],
      frontImage: ['', Validators.required],
      backImage: ['', Validators.required,],
      availableSeats: [0, [Validators.required, Validators.min(1)]]
    });
  }

  priceValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^\d+(\.\d{1,2})?$/;  // Matches numbers with up to two decimal places
    return regex.test(control.value) ? null : { invalidPrice: true };
  }
  saveCar() {
    if (this.carForm.invalid) {
      return;
    }

    this.carService.getCars().subscribe((cars) => {
      const duplicateCar = cars.find(car => car.registrationNo === this.carForm.value.registrationNo);
      if (duplicateCar) {
        alert('Registration number already exists.');
      } else {
        this.carService.addCar(this.carForm.value).subscribe(
          () => {
            alert('Car added successfully');
            this.carForm.reset();
          },
          error => console.error('Error adding car', error)
        );
      }
    });
  }}

  