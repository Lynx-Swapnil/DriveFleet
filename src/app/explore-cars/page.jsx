import CarCard from '@/components/CarCard';
import React from 'react';

const page = async () => {

    const res = await fetch('http://localhost:5000/cars');
    const cars = await res.json();
    console.log(cars);

    return (
        <div>
            <h1>Explore Cars</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {
                    cars.map(car => (
                       <CarCard key={car._id} car={car} />  
                    ))
                }
            </div>
        </div>
    );
};

export default page;