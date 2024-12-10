import React from 'react';
import Table from '../widgets/table';
import { Card } from '../widgets/card';

export interface RecentSales{
	name: string;
	price: number;
	product: string;
}

export const RecentSalesView = () => {
	return (
		<>
			<h2>Recent Sales</h2>
			<Card>
				<Card.InsetBody>
					<Table>
						<Table.Headers>
							<Table.Header>User</Table.Header>
							<Table.Header>Magazine</Table.Header>
							<Table.Header>Price</Table.Header>
						</Table.Headers>
						<Table.Body>
							<Table.Row>
								<Table.Cell>Scratchy</Table.Cell>
								<Table.Cell>Magazine</Table.Cell>
								<Table.Cell>1337</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Felix</Table.Cell>
								<Table.Cell>Magazine</Table.Cell>
								<Table.Cell>1337</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Tomcat</Table.Cell>
								<Table.Cell>Magazine</Table.Cell>
								<Table.Cell>1337</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Card.InsetBody>
			</Card>
		</>
	)
}
