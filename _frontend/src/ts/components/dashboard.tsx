import React from 'react';
import { RecentSalesView } from './views/recent-sales';
import { TopSalesView } from './views/top-sales';
import { SplashModal } from './widgets/splash-modal';
import { Header } from './views/header';
import { SalesConnnectorContext } from '../context/sales-connector';

export const DashBoardView = () => {
	const { hub, store } = React.useContext(SalesConnnectorContext)

	const [mode, setMode] = React.useState<'top' | 'recent'>('top');
	const [splash, setSplash] = React.useState<boolean>(true);

	React.useEffect(() => {
		// initialize callback
		const cb = async (e) => {
			let user = await store.getUser(e.userId)
			let product = await store.getProduct(e.productId)

			console.log('User', user.name, 'sold', product.name, 'with subscription length', e.duration)
		}

		hub.registerSalesEventListener(cb)
		return () => hub.unregisterSalesEventListener(cb)
	}, []);

	return (
		<>
			<div className="flex-auto p-5">
				<Header />
				{mode === 'recent' ?
					<RecentSalesView />
					: <TopSalesView />
				}

				{splash &&
					<SplashModal />
				}
			</div>
		</>
	)
}
