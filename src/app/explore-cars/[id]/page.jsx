import BookingCard from '@/components/BookingCard';
import { AlertDialog, DeleteAlert } from '@/components/DeleteAlert';
import { EditModal } from '@/components/EditModal';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const page = async ({ params }) => {
    const { id } =  await params;
     
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
     
    const res = await fetch(`http://localhost:5000/cars/${id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );
    const car = await res.json();

    console.log(car);

     const { _id, carName, carType, seatCapacity, pickupLocation, imageUrl } = car;
     
    return (
        <div className='flex gap-8 items-center mx-auto'>
             <div>
                <h1>Car Details</h1>
            <EditModal car={car} />
            <DeleteAlert car={car} />
            <Image src={imageUrl} alt={carName} width={600} height={400} className="rounded-lg" />
            <p>Name: {carName}</p>
            <p>Type: {carType}</p>
            <p>Seats: {seatCapacity}</p>
            <p>Pickup: {pickupLocation}</p>
            </div>
            <BookingCard car={car} /> 
        </div>
    );
};

export default page;