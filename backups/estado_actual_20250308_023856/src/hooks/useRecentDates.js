import React, { useState, useEffect } from 'react';

export const useRecentDates = () => {
  const [recentDates, setRecentDates] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentDates');
    if (saved) setRecentDates(JSON.parse(saved));
  }, []);

  const addDate = (dateString) => {
    setRecentDates(prev => {
      if (prev.includes(dateString)) return prev;
      const updated = [dateString, ...prev.slice(0, 9)];
      localStorage.setItem('recentDates', JSON.stringify(updated));
      return updated;
    });
  };

  return [recentDates, addDate];
};
