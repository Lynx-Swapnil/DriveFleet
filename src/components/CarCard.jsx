import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CarCard = ({car}) => {
    const { _id, carName, carType, seatCapacity, pickupLocation, imageUrl } = car;
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <Image src={imageUrl} alt={carName} width={400} height={300} className="rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">{carName}</h2>
            <p>Type: {carType}</p>
            <p>Seats: {seatCapacity}</p>
            <p>Pickup: {pickupLocation}</p>
            <Link href={`/explore-cars/${_id}`}>
                <Button variant="primary" className="mt-4">View Details</Button>
            </Link>
        </div>
    );
};

export default CarCard;