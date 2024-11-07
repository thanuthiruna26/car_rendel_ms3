import { Component, OnInit } from '@angular/core';
import { Car } from '../../../model/car';
import { CarServiceService } from '../../car-service.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-car-list-component',
  templateUrl: './car-list-component.component.html',
  styleUrl: './car-list-component.component.css'
})
export class CarListComponentComponent  implements OnInit {
  cars: any[] = [];
  selectedCar: any = null;
  carForm: FormGroup;
  isUpdatePopupOpen = false;
  isDeletePopupOpen = false;

  constructor(private carService: CarServiceService, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      model: '',
      brand: '',
      registrationNo: '',
      rentalPrice: ['', Validators.required],  
  keyMoney: ['', Validators.required] ,
      frontImage: '',
      backImage: '',
      availableSeats: 0
    });
  }

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    this.carService.getCars().subscribe(
      response => this.cars = response,
      error => console.error('Error fetching cars', error)
    );
  }

  openUpdatePopup(car: any) {
    this.selectedCar = { ...car };  // Clone car data for editing
    this.carForm.setValue({
      model: this.selectedCar.model,
      brand: this.selectedCar.brand,
      registrationNo: this.selectedCar.registrationNo,
      rentalPrice: ['', Validators.required],  // New field
      keyMoney: ['', Validators.required],
      frontImage: this.selectedCar.frontImage,
      backImage: this.selectedCar.backImage,
      availableSeats: this.selectedCar.availableSeats
    });
    this.isUpdatePopupOpen = true;
  }

  updateCar() {
    if (this.carForm.invalid) {
      return;
    }
    const updatedCar = { ...this.selectedCar, ...this.carForm.value };
    this.carService.updateCar(updatedCar.id, updatedCar).subscribe(
      () => {
        alert('Car updated successfully');
        this.fetchCars();
        this.closePopup();
      },
      error => console.error('Error updating car', error)
    );
  }

  openDeletePopup(car: any) {
    this.selectedCar = car;
    this.isDeletePopupOpen = true;
  }

  deleteCar() {
    this.carService.deleteCar(this.selectedCar.id).subscribe(
      () => {
        alert('Car deleted successfully');
        this.fetchCars();
        this.closePopup();
      },
      error => console.error('Error deleting car', error)
    );
  }

  closePopup() {
    this.isUpdatePopupOpen = false;
    this.isDeletePopupOpen = false;
    this.selectedCar = null;
  }}