import React from 'react';
import { Table } from '@mantine/core';

interface TableProps {
    data: { year: number; maxCrop: string; minCrop: string }[];
}

export const MaxMinCropTable: React.FC<TableProps> = ({ data }) => {
    return (
        <>
        <h1>Maximum and Minimum Producing Crops</h1>
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Year</Table.Th>
                    <Table.Th>Crop with Maximum Production</Table.Th>
                    <Table.Th>Crop with Minimum Production</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {data.map(({ year, maxCrop, minCrop }) => (
                    <Table.Tr key={year}>
                        <Table.Td>{year}</Table.Td>
                        <Table.Td>{maxCrop}</Table.Td>
                        <Table.Td>{minCrop}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
</>
    );
};