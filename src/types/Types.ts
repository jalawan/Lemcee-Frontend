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
  imageURL?: "https://res.cloudinary.com/dwkwtexgk/image/upload/v1765182047/eiivenujhr33d9sui8ov.jpg;"
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
    rental_rate:number;
    total_amount :number;
    booking_status :'pending' | 'paid' | 'Failed'|'confirmed' ;
    created_at:number,
    payments?:Payments [];
}
export interface RecentBookings{
    user_id:number;
    vehicle_id:number;
    booking_date:Date;
    return_date:Date;
    total_amount:number;
    booking_status :string;
    rating:number;
    created_at:number
    
}

export interface Payments {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}


export interface User{
    user_id:number;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    contact_phone:string;
    address:string;
    role: string;
    created_at:string;
    
}
export interface SupportTicketUser_id {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface SupportTicketResponse {
  ticket_id: string;
  subject: string;
  description: string;
  status: string;
  admin_reply?: string | null;
  booking_id?: number | null;
  created_at: Date;
  updated_at: Date;
  user_id?: SupportTicketUser_id | null;
}


export interface DashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    totalVehicles: number;
}
export interface AdminDashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    totalVehicles: number;
}

export interface UserStats {
    totalBookings: number;
    favoriteVehicles: number;
    totalSpent: number;
    loyaltyPoints: number;
}


// status: 'Open' | 'Resolved' | 'Closed';
//   created_at: string;