export interface Car {
  id?: number;               // Optional, for cases where ID is auto-generated
  model: string;
  brand: string;
  registrationNo: string;
  frontImage: string;        
  backImage: string;         
  availableSeats: number;
  rentalPrice: number;
  keyMoney: number;
}
  