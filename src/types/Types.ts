export interface Vehicles{
vehicle_id :number;
vehicle_spec_id: number;
rental_rate :number;
availability :boolean;

}
export interface VehicleSpecifications {
 
  vehicleSpec_id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;

  
  vehicle_id: number;
  rental_rate: number;
  availability: boolean;
  imageURL?: string;
}


export type UserFormValues={
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    contact_phone:number;
    address:string
}
export interface Bookings{
    booking_id :number;
    user_id :number;
    vehicle_id :number;
    location_id:number;
    booking_date:string;
    return_date :string;
    total_amount :number;
    booking_status :string;
    created_at:number
}
export interface RecentBookings {
    id: number;
    user: string;
    amount: number;
    status: 'Delivered' | 'Preparing' | 'Ready' | 'Cancelled';
    time: string;
}

export interface User{
    role: string;
    user_id:number;
    first_name:string;
    last_name:string;
    email:string;
    contact_phone:string;
    created_at:string;
    user_type:string
}

export interface DashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalCustomers: number;
    totalVehicles: number;
}
export interface AdminDashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalCustomers: number;
    totalVehicles: number;
}

export interface UserStats {
    totalBookings: number;
    favoriteItems: number;
    totalSpent: number;
    loyaltyPoints: number;
}


