import React from 'react';
import { Table } from '@mantine/core';

interface TableProps {
    data: { averageArea: any; averageYield: any; crop: any }[];
}
export const CropAverageTable: React.FC<TableProps> = ({ data }) => {
    return (
        <>
            <h1>Average Yield and Cultivation Area of Crops (1950-2020)</h1>

            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Crop Name</Table.Th>
                        <Table.Th>Average Yield (Kg/Ha)</Table.Th>
                        <Table.Th>Average Cultivation Area (Ha)</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map(({ crop, averageYield, averageArea }: any) => (
                        <Table.Tr key={crop}>
                            <Table.Td>{crop}</Table.Td>
                            <Table.Td>{averageYield}</Table.Td>
                            <Table.Td>{averageArea}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );
};

export default CropAverageTable;
