import { CustomerType } from "../customer/types";


export type AppointmentType = {
    id?: number;
    type?: string;
    date: string;
    customer?: CustomerType;
}