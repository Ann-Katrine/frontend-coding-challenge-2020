import React, { useState, useContext, useEffect } from 'react';
import { RecentSalesView, RecentSales } from './views/recent-sales';
import { TopSalesView, TopSaler } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Header } from './views/header';
import { SalesConnnectorContext } from '../context/sales-connector';

interface TopSalerScoreBoard{
	saler: Array<TopSaler>
}

interface RecentSalerScoreBoard{
	sale: Array<RecentSales>
}

export const DashBoardView = () => {
	const { hub, store } = useContext(SalesConnnectorContext)

	const [mode, setMode] = useState<'top' | 'recent'>('top');
	const [splash, setSplash] = useState<boolean>(true);
	const [salesDepartmentTopSales, setSalesDepartmentTopSales] = useState<TopSalerScoreBoard>({saler: [{name: '', totalPrice: 0}]})
	const [salesDepartmentRecentSales, setSalesDepartmentRecentSales] = useState<RecentSalerScoreBoard>({sale: [{name: '', price: 0, product: ''}]})
	let recentSalesArray:  Array<RecentSales> = []

	useEffect(() => {
		// initialize callback
		const cb = async (e) => {
			let user = await store.getUser(e.userId)
			let product = await store.getProduct(e.productId)

			recentSalesArray.push({name: user.name, price: product.unitPrice, product: product.name})
			// setSalesDepartmentRecentSales({sale: recentSalesArray})

			// setSalesDepartmentRecentSales((prevState) => {
			// 	return {sale: recentSalesArray}
			// })

			// setSalesDepartmentRecentSales((prevState) => {
			// 	return {...prevState, sale: recentSalesArray}
			// })

			// console.log(recentSalesArray)
			// console.log(salesDepartmentRecentSales)
			console.log('User', user.name, 'sold', product.name, 'with subscription length', e.duration)
		}

		
		hub.registerSalesEventListener(cb)
		return () => hub.unregisterSalesEventListener(cb)
	}, []);

	useEffect(() => {
		console.log(mode)
		if(mode == 'top'){
			const timeOut = setTimeout(() => {
				console.log('set to recent')
				setMode('recent')
			}, 90000)
		} else {
			const timeOut = setTimeout(() => {
				console.log('set to top')
				setMode('top')
			}, 30000)
		}
	}, [mode])


	return (
		<>
			<div className="flex-auto p-5">
				<Header />
				{mode === 'recent' ?
					<RecentSalesView />
					: <TopSalesView />
				}

				{splash &&
					<SplashModal name={'Jørn Nørregaard Smed'} price={79.95} product={'Curious tails and other short stories'} />
				}
			</div>
		</>
	)
}
