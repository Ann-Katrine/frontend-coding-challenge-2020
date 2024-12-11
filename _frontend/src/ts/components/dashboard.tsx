import React, { useState, useContext, useEffect, useRef } from 'react';
import { RecentSalesView, RecentSales, RecentSalerScoreBoard } from './views/recent-sales';
import { TopSalesView, TopSaler, TopSalerScoreBoard } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Header } from './views/header';
import { SalesConnnectorContext } from '../context/sales-connector';

export const DashBoardView = () => {
	const { hub, store } = useContext(SalesConnnectorContext)

	const [mode, setMode] = useState<'top' | 'recent'>('top');
	const [splash, setSplash] = useState<boolean>(true);
	const [salesDepartmentTopSales, setSalesDepartmentTopSales] = useState<TopSalerScoreBoard>({saler: [{id: 0, name: '', totalPrice: 0}]})
	const [salesDepartmentRecentSales, setSalesDepartmentRecentSales] = useState<RecentSalerScoreBoard>({sale: [{id: 0, name: '', price: 0, product: ''}]})
	const topSalerArray: Array<TopSaler> = []
	const recentSalesArray: Array<RecentSales> = []
	const recentSalesNotificationArray: Array<RecentSales> = []

	useEffect(() => {
		// initialize callback
		const cb = async (e) => {
			let user = await store.getUser(e.userId)
			let product = await store.getProduct(e.productId)
			
			recentSalesNotificationArray.push({id: user.id, name: user.name, price: product.unitPrice, product: product.name})
			

			addToSalesDeparmentTopSales(user, product)
			addSaleDepartmentRecentSales(user, product)
			


			console.log('User', user.name, 'sold', product.name, 'with subscription length', e.duration)
		}

		
		hub.registerSalesEventListener(cb)
		return () => hub.unregisterSalesEventListener(cb)
	}, []);

	useEffect(() => {
		if(mode == 'top'){
			const timeOut = setTimeout(() => {
				console.log('set to recent')
				setMode('recent')
			// }, 90000)
			}, 1000)
		} else {
			const timeOut = setTimeout(() => {
				console.log('set to top')
				setMode('top')
			}, 30000)
		}
	}, [mode])

	function addSaleDepartmentRecentSales(user, product){
		if(recentSalesArray.length == 0){ // only add if there is not any element in the array
			recentSalesArray.push({id: user.id, name: user.name, price: product.unitPrice, product: product.name})
		} else {
			if(recentSalesArray.length == 10){
				recentSalesArray.shift() // remove the first element in the array, so the array always only has 10 elements
				recentSalesArray.push({id: user.id, name: user.name, price: product.unitPrice, product: product.name})
			} else {
				recentSalesArray.push({id: user.id, name: user.name, price: product.unitPrice, product: product.name})
			}
		}

		setSalesDepartmentRecentSales((prevState) => {
			return {...prevState, sale: recentSalesArray}
		})
	}

	// Add element to SalesDeparmentTopSales
	function addToSalesDeparmentTopSales(user, product){
		if(topSalerArray.length == 0){ // only add if there is not any element in the array
			topSalerArray.push({id: user.id, name: user.name, totalPrice: product.unitPrice})
		} else {

			let sameName = false // To check the topSalerArray for already excited elements in the array
			for (let i = 0; i < topSalerArray.length; i++) {
				if(topSalerArray[i].name == user.name){
					topSalerArray[i].totalPrice=+ product.unitPrice // Add the unitPrice to the already excited person with the same name
					sameName = true
				}
			}

			if(sameName == false){ // Only add to the array if sameName is false, to know there is not a person with the same name in the array
				topSalerArray.push({id: user.id, name: user.name, totalPrice: product.unitPrice})
			}
		}
		
		topSalerArray.sort(function(a,b){return b.totalPrice - a.totalPrice}) // Sort the element in topSalerArray after the highest number
		setSalesDepartmentTopSales((prevState) => {
			return {...prevState, saler: topSalerArray}
		})
	}

	return (
		<>
			<div className="flex-auto p-5">
				<Header />
				{mode === 'recent' ?
					<RecentSalesView sale={salesDepartmentRecentSales.sale} />
					: <TopSalesView saler={salesDepartmentTopSales.saler} />
				}

				{splash &&
					<SplashModal id={0} name={'Jørn Nørregaard Smed'} price={79.95} product={'Curious tails and other short stories'} />
				}
			</div>
		</>
	)
}
