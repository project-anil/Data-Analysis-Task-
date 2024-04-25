
import { useEffect, useState } from 'react';
import agricultureData from '../data.json';

interface CropData {
    Country: string;
    Year: string;
    CropName: string;
    CropProduction: number;

    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
    "Area Under Cultivation (UOM:Ha(Hectares))": number;


}



export function useAgricultureData() {
    const [data, setData] = useState<CropData[]>([]);

    useEffect(() => {

        const parsedData: CropData[] = agricultureData.map(entry => ({
            Country: entry.Country,
            Year: (entry.Year.match(/\d+/)?.[0] || ""),
            CropName: entry["Crop Name"],
            CropProduction: Number(entry["Crop Production (UOM:t(Tonnes))"]),
            "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": Number(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]),
            "Area Under Cultivation (UOM:Ha(Hectares))": Number(entry["Area Under Cultivation (UOM:Ha(Hectares))"]),
        }));


        setData(parsedData);
    }, []);

    return data;
}


export function computeMaxMinProducingCrops(data: CropData[]) {
    const result: { year: number; maxCrop: string; minCrop: string }[] = [];


    let currentYear = (data[0]?.Year.match(/\d+/)?.[0] || "");
    let maxCrop = data[0]?.CropName;
    let minCrop = data[0]?.CropName;
    let maxProduction = data[0]?.CropProduction;
    let minProduction = data[0]?.CropProduction;

    for (const entry of data) {
        if (entry.Year !== currentYear) {
            result.push({ year: parseInt(currentYear), maxCrop, minCrop });
            currentYear = entry.Year;
            maxCrop = entry.CropName;
            minCrop = entry.CropName;
            maxProduction = entry.CropProduction;
            minProduction = entry.CropProduction;
        } else {
            if (entry.CropProduction > maxProduction) {
                maxCrop = entry.CropName;
                maxProduction = entry.CropProduction;
            }
            if (entry.CropProduction < minProduction) {
                minCrop = entry.CropName;
                minProduction = entry.CropProduction;
            }
        }
    }

    result.push({ year: parseInt(currentYear), maxCrop, minCrop }); 

    return result;
}


export function computeAverageYieldAndCultivationArea(data: CropData[]) {
    const yieldMap: { [crop: string]: number[] } = {};
    const areaMap: { [crop: string]: number[] } = {};

    for (const entry of data) {
        if (!yieldMap[entry.CropName]) {
            yieldMap[entry.CropName] = [];
            areaMap[entry.CropName] = [];
        }
        yieldMap[entry.CropName].push(entry.CropProduction);
        areaMap[entry.CropName].push(entry["Area Under Cultivation (UOM:Ha(Hectares))"]);
    }


    const result: { crop: string; averageYield: number; averageArea: number }[] = [];

    for (const crop in yieldMap) {
        const yieldSum = yieldMap[crop].reduce((acc, val) => acc + val, 0);
        const areaSum = areaMap[crop].reduce((acc, val) => acc + val, 0);
        const averageYield = yieldSum / yieldMap[crop].length;
        const averageArea = areaSum / areaMap[crop].length;
        result.push({
            crop,
            averageYield: Math.round(averageYield * 1000) / 1000,
            averageArea: Math.round(averageArea * 1000) / 1000,
        });
    }

    return result;
}

export function computeAverageYieldAndCultivation(data: CropData[]) {

    if (!Array.isArray(data)) {
        console.error('Data is not an array');
        return [];
    }


    const filteredData = data.filter(entry => {
        const year = parseInt(entry.Year.match(/\d+/)?.[0] || "");
        return !isNaN(year) && year >= 1950 && year <= 2020;
    });


    const cropMap: { [crop: string]: { yieldSum: number; areaSum: number; count: number } } = {};

    for (const entry of filteredData) {
        const cropName = entry.CropName;
        const yieldValue = (entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]);
        const areaValue = (entry["Area Under Cultivation (UOM:Ha(Hectares))"]);

        if (cropName && !isNaN(yieldValue) && !isNaN(areaValue)) {
            if (!cropMap[cropName]) {
                cropMap[cropName] = { yieldSum: 0, areaSum: 0, count: 0 };
            }
            cropMap[cropName].yieldSum += yieldValue;
            cropMap[cropName].areaSum += areaValue;
            cropMap[cropName].count++;
        }
    }



    const result: { crop: string; averageYield: number; averageArea: number }[] = [];

    for (const crop in cropMap) {
        const averageYield = cropMap[crop].yieldSum / cropMap[crop].count;
        const averageArea = cropMap[crop].areaSum / cropMap[crop].count;
        result.push({
            crop,
            averageYield: Math.round(averageYield * 1000) / 1000, 
            averageArea: Math.round(averageArea * 1000) / 1000,
        });
    }

    return result;
}


