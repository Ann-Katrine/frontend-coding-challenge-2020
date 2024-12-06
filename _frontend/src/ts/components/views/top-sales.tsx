import React from 'react';
import Table from '../widgets/table';
import { Card } from '../widgets/card';

export const TopSalesView = () => {
	return (
		<Card>
			<Card.InsetBody>
				<Table>
					<Table.Headers>
						<Table.Header>User</Table.Header>
						<Table.Header>Value</Table.Header>
					</Table.Headers>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Scratchy</Table.Cell>
							<Table.Cell>1337</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Felix</Table.Cell>
							<Table.Cell>1337</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Tomcat</Table.Cell>
							<Table.Cell>1337</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Card.InsetBody>
		</Card>
	)
}
