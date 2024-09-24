import React from 'react';

const TemporaryUrlPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
    <svg
      className="w-24 h-24 text-gray-400 dark:text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
      Please enter a valid URL or check if the URL is working correctly.
    </p>
  </div>
);

export default TemporaryUrlPlaceholder;