import React from 'react';
import Table from '../widgets/table';
import { Card } from '../widgets/card';

export interface RecentSales{
	id: number;
	name: string;
	price: number;
	product: string;
}

export interface RecentSalerScoreBoard{
	sale: Array<RecentSales>
}

export const RecentSalesView = (scoreboardRecentSale: RecentSalerScoreBoard) => {
	return (
		<>
			<h2 className='text-xl'>Recent Sales</h2>
			<Card>
				<Card.InsetBody>
					<Table>
						<Table.Headers>
							<Table.Header>User</Table.Header>
							<Table.Header>Magazine</Table.Header>
							<Table.Header>Price</Table.Header>
						</Table.Headers>
						<Table.Body>
							{ scoreboardRecentSale.sale.length != 0 &&
								<>
									{/* Using the slice() to only show 10 element of the array   */}
									{/* using the reverse() to change the order of the element*/}
									{scoreboardRecentSale.sale.slice(0, 10).reverse().map((item) => (
										<>
											<Table.Row>
												<Table.Cell> {item.name} </Table.Cell>
												<Table.Cell> {item.product} </Table.Cell>
												<Table.Cell> {item.price} </Table.Cell>
											</Table.Row>
										</>
									))}
								</>
							}
						</Table.Body>
					</Table>
					{ scoreboardRecentSale.sale.length == 0 && 
						<>
							<p className='bg-zinc-50 text-center text-base'>
								There has not been found any sales in the system...
							</p>
						</> 
					}
				</Card.InsetBody>
			</Card>
		</>
	)
}
