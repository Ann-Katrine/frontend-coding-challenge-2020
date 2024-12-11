import React from 'react';
import Table from '../widgets/table';
import { Card } from '../widgets/card';

export interface TopSaler{
	id: number;
	name: string;
	totalPrice: number;
}

export interface TopSalerScoreBoard{
	saler: Array<TopSaler>
}

export const TopSalesView = (scoreboardInfo: TopSalerScoreBoard) => {
	return (
		<>
			<h2>Top sellers</h2>
			<Card>
				<Card.InsetBody>
					<Table>
						<Table.Headers>
							<Table.Header>User</Table.Header>
							<Table.Header>Value</Table.Header>
						</Table.Headers>
						<Table.Body>
							{ scoreboardInfo.saler.length != 0 ? 
								<>
									{/* Using the slice() to only show 10 element of the array   */}
									{scoreboardInfo.saler.slice(0, 10).map((item) =>(
										<>
											<Table.Row key={item.name + item.id}>
												<Table.Cell> {item.name} </Table.Cell>
												<Table.Cell>{item.totalPrice}</Table.Cell>
											</Table.Row>
										</>
									))}
								
								</> 
								: 
								<>
									<Table.Row>
										<p>There has not been found any sales in the system...</p>
									</Table.Row>
								</>
							}
						</Table.Body>
					</Table>
				</Card.InsetBody>
			</Card>
			
		</>
	)
}
