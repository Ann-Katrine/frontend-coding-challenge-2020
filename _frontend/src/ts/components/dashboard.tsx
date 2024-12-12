import React, { useState, useContext, useEffect, useRef } from 'react';
import { RecentSalesView, RecentSales, RecentSalerScoreBoard } from './views/recent-sales';
import { TopSalesView, TopSaler, TopSalerScoreBoard } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Header } from './views/header';
import { SalesConnnectorContext } from '../context/sales-connector';

interface User{
	id: number;
	name: string;
	type: string;
}

interface Product{
	id: number;
	name: string;
	type: string;
	unitPrice: number;
}

export const DashBoardView = () => {
	const { hub, store } = useContext(SalesConnnectorContext)

	const [mode, setMode] = useState<'top' | 'recent'>('top');
	const [splash, setSplash] = useState<boolean>(false);
	const [salesDepartmentTopSales, setSalesDepartmentTopSales] = useState<TopSalerScoreBoard>({saler: []})
	const [salesDepartmentRecentSales, setSalesDepartmentRecentSales] = useState<RecentSalerScoreBoard>({sale: []})
	const [saleNotification, setSaleNotification] = useState<RecentSalerScoreBoard>({sale: []})
	const [isProcessing, setIsProcessing] = useState<boolean>(false)
	const topSalerArray: Array<TopSaler> = []
	const recentSalesArray: Array<RecentSales> = []

	useEffect(() => {
		// initialize callback
		const cb = async (e) => {
			let user = await store.getUser(e.userId)
			let product = await store.getProduct(e.productId)
			
			addToSaleNotifiction(user, product)
			addToSalesDeparmentTopSales(user, product)
			addToSaleDepartmentRecentSales(user, product)
			
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
			}, 90000)
		} else {
			const timeOut = setTimeout(() => {
				console.log('set to top')
				setMode('top')
			}, 30000)
		}
	}, [mode])

	const processNotification = async (item: RecentSalerScoreBoard) => {
		for (let i = 0; i < item.sale.length; i++) {
			setSplash(true)


			await new Promise<void>((resolve) => {
				setTimeout(() => {
					setSplash(false)
					resolve()
				}, 5000)
			})

			setSaleNotification((prevState) => {
				const update = [...prevState.sale] // Copy the existing 'sale' data
				update.shift() // remove the first element in the array, so it not be shown again
				return {sale: update} // overwrite  the existing data with the new from update
			})
		}

		setIsProcessing(false)
	}

	useEffect(() => {
		if(saleNotification.sale.length > 0 && isProcessing == false){
			setIsProcessing(true)
			processNotification(saleNotification)
		}
	}, [saleNotification, isProcessing])

	// Add element to saleNotification
	function addToSaleNotifiction(user: User, product: Product){
		let recentSalesNotificationArray: Array<RecentSales> = []

		recentSalesNotificationArray.push({id: user.id, name: user.name, price: product.unitPrice, product: product.name})
		setSaleNotification((prevState) => {
			return {...prevState, sale: [...prevState.sale, ...recentSalesNotificationArray]} 
			// [...prevState.sale, ...recentSalesNotificationArray] works so you will get the value that is allready in the saleNotification 
			// and the new element from recentSalesNotificationArray, will be merge togeter
		})
	}

	// Add element to saleDepartmentRecentSales
	function addToSaleDepartmentRecentSales(user: User, product: Product){
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
			// {...prevState, sale: recentSalesArray} works så that sale: recentSalesArray will overwrite what 
			// value there would have been in saleDepartmentRecentSales
		})
	}

	// Add element to salesDeparmentTopSales
	function addToSalesDeparmentTopSales(user: User, product: Product){
		if(topSalerArray.length == 0){ // only add if there is not any element in the array
			topSalerArray.push({id: user.id, name: user.name, totalPrice: product.unitPrice})
		} else {

			let sameName = false // To check the topSalerArray for already excited elements in the array
			for (let i = 0; i < topSalerArray.length; i++) {
				if(topSalerArray[i].name == user.name){
					topSalerArray[i].totalPrice += product.unitPrice // Add the unitPrice to the already excited person with the same name
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
			<div className='flex flex-col'>
				{saleNotification.sale.length != 0 && splash &&
					<SplashModal id={saleNotification.sale[0]?.id} name={saleNotification.sale[0]?.name} price={saleNotification.sale[0]?.price} product={saleNotification.sale[0]?.product} />
				}
				<div className="p-5">
					<Header />
					{mode === 'recent' ?
						<RecentSalesView sale={salesDepartmentRecentSales.sale} />
						: <TopSalesView saler={salesDepartmentTopSales.saler} />
					}
				</div>
			</div>
		</>
	)
}
