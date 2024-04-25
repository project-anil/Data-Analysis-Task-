// src/App.tsx
import React from 'react';
import { useAgricultureData, computeMaxMinProducingCrops, computeAverageYieldAndCultivationArea } from './utilis/dataUtilis';
import { MaxMinCropTable } from './Table';
import CropAverageTable from './CropTable';
import './App.css'

const App: React.FC = () => {
  const data = useAgricultureData();
  const maxMinCropData = computeMaxMinProducingCrops(data);
  const avgYieldAreaData = computeAverageYieldAndCultivationArea(data);
  console.log(avgYieldAreaData, "aaaaa")

  return (
    <>
      
      <div className="table-wrap">

      <MaxMinCropTable data={maxMinCropData} />
      <CropAverageTable data={avgYieldAreaData} />
      
      </div>
    </>
  );
};

export default App;
