import React, { useState } from 'react';
import { Card, Title, Button, DateRangePicker } from '@tremor/react';

const ExportData = () => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleExport = async (type) => {
    // Vérifiez que les dates sont sélectionnées
    if (!dateRange.from || !dateRange.to) {
      alert('Veuillez sélectionner une période');
      return;
    }

    // Format the dates to ensure they are in the correct format
    const startDate = dateRange.from.toISOString().split('T')[0];
    const endDate = dateRange.to.toISOString().split('T')[0];

    try {
      const response = await fetch(`${apiUrl}/dashboard/export/${type}?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des données');
        } else {
          const errorText = await response.text();
          throw new Error(errorText || 'Erreur lors de la récupération des données');
        }
      }

      const data = await response.json();

      // Convertir en CSV
      const csv = convertToCSV(data);
      
      // Télécharger le fichier
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export_${type}_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      
      alert(error.message);
    }
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => 
      headers.map(header => 
        JSON.stringify(obj[header] || '')
      ).join(',')
    );
    
    return [
      headers.join(','),
      ...rows
    ].join('\n');
  };

  return (
    <Card className="mt-6 p-8 shadow-lg rounded-lg bg-white dark:bg-gray-800 transition-all duration-300">
      <Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Exporter les données</Title>
      <div className="space-y-6">
        <DateRangePicker
          value={dateRange}
          onValueChange={(value) => {
            console.log('DateRangePicker value changed:', value);
            setDateRange(value);
          }}
          className="max-w-md z-50 relative bg-white dark:bg-gray-700 rounded-lg shadow-md"
          dropdownClassName="z-50 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
        />
        <div className="flex gap-6">
          <Button
            onClick={() => handleExport('orders')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
          >
            Exporter les commandes
          </Button>
          <Button
            onClick={() => handleExport('customers')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
          >
            Exporter les clients
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExportData;