import { BookingCancelAlert } from '@/components/BookingCancelAlert';
import CarCard from '@/components/CarCard';
import { auth } from '@/lib/auth';
import { Button } from '@heroui/react';
import { headerVariants } from '@heroui/styles';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const page = async () => {

    const session = await auth.api.getSession({
            headers: await headers()
        }
    );

    const {token} = await auth.api.getToken({
            headers: await headers()
        });
   
    console.log('session : ', session);

    const user = session?.user;

    const res = await fetch(`http://localhost:5000/bookings/${user?.id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const bookings = await res.json();      

    console.log(bookings);

    return (
        <div>
            my bookings page

            <div>
                {
                    bookings.map(booking => (
                       <div key={booking._id} className="border rounded-lg p-4 shadow-md">
                           <Image src={booking.imageUrl} alt={booking.carName} width={400} height={300} className="rounded-lg" />
                           <h2 className="text-xl font-semibold mt-4">{booking.carName}</h2>
                            <p>Type: {booking.carType}</p>
                            <p>Seats: {booking.seatCapacity}</p>
                            <p>Pickup: {booking.pickupLocation}</p>
                            <BookingCancelAlert booking={booking} />
                       </div>
                     )
                    )
                }
            </div>
        </div>
    );
};

export default page;