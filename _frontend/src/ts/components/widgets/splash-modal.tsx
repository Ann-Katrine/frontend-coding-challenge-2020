import React from 'react';
import { RecentSales } from '../views/recent-sales';

export const SplashModal = (resentSale: RecentSales) => {
	return (
		<div className=' fixed top-0 left-0 w-full  h-16 '>
			<div className='bg-[#3639A4] text-[#FAFAFB] text-center py-3 w-4/12 mx-auto rounded-md' >
				<p className='text-lg'>{resentSale.name}</p>
				<p className='text-lg'>solgt {resentSale.product} for {resentSale.price} </p>
			</div>
		</div>
	)
}
