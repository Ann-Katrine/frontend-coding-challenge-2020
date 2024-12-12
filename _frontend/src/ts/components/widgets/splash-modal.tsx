import React from 'react';
import { RecentSales } from '../views/recent-sales';

export const SplashModal = (resentSale: RecentSales) => {
	return (
		<div className='w-full bg-[#75E8F0] text-[#000000] text-center py-1 mx-auto '>
			<p className='text-lg'>User {resentSale.name}, sold {resentSale.product} for {resentSale.price}</p>
		</div>
	)
}
