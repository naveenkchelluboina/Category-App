// PerformanceAlert.tsx
import React, { useState, ChangeEvent } from 'react';

const PerformanceAlert: React.FC = () => {
  const [queryQueue, setQueryQueue] = useState<number>(10);
  const [executionTime, setExecutionTime] = useState<number>(2);
  const [spillage, setSpillage] = useState<number>(25);

  const handleNumberChange = (
    setState: React.Dispatch<React.SetStateAction<number>>
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) setState(value);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Performance Alert</h2>

      {/* Alert Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alert name
        </label>
        <input
          type="text"
          placeholder="Current Prod WHs alert"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Limits Section */}
      <fieldset className="border border-gray-300 rounded-md p-4">
        <legend className="text-sm font-medium text-gray-700">Limits</legend>
        <p className="text-sm text-gray-500 mb-4">
          Receive alerts when one or more of the limits are met.
        </p>

        <div className="space-y-4">
          {/* Query Queue Exceeds */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              readOnly
            />
            <label className="ml-3 text-sm font-medium text-gray-700">
              Query queue exceeds
            </label>
            <input
              type="number"
              value={queryQueue}
              onChange={handleNumberChange(setQueryQueue)}
              className="ml-auto w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">queries</span>
          </div>

          {/* Query Execution Time Exceeds */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              readOnly
            />
            <label className="ml-3 text-sm font-medium text-gray-700">
              Query execution time exceeds
            </label>
            <input
              type="number"
              value={executionTime}
              onChange={handleNumberChange(setExecutionTime)}
              className="ml-auto w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="hours"
            >
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>

          {/* Warehouse Spillage Exceeds */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              readOnly
            />
            <label className="ml-3 text-sm font-medium text-gray-700">
              Warehouse spillage exceeds
            </label>
            <input
              type="number"
              value={spillage}
              onChange={handleNumberChange(setSpillage)}
              className="ml-auto w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">%</span>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default PerformanceAlert;
