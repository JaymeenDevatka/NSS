// src/components/ErrorBoundary.js
import React from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-xl text-gray-700 mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg text-gray-600">
        <i>{error.statusText || error.message}</i>
      </p>
      <button 
        onClick={() => window.location = '/'}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
}