'use client';

import { useState, useEffect } from 'react';

const SYMBOLS: Record<string, string> = {
  BDT: '৳', USD: '$', EUR: '€', INR: '₹', GBP: '£',
};

const LOCALES: Record<string, string> = {
  BDT: 'en-BD', INR: 'en-IN', USD: 'en-US', EUR: 'en-DE', GBP: 'en-GB',
};

export function useCurrency() {
  const [currency, setCurrency] = useState('BDT');
  const [symbol, setSymbol] = useState('৳');
  const [locale, setLocale] = useState('en-BD');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.settings?.currency) {
          const c = data.settings.currency;
          setCurrency(c);
          setSymbol(SYMBOLS[c] || '৳');
          setLocale(LOCALES[c] || 'en-BD');
        }
      })
      .catch(() => {});
  }, []);

  return { currency, symbol, locale };
}
