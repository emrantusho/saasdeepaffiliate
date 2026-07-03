import { prisma } from './prisma';

const CURRENCY_SYMBOLS: Record<string, string> = {
    'BDT': '৳',
    'USD': '$',
    'EUR': '€',
    'INR': '₹',
    'GBP': '£',
    'BGN': 'лв.',
    'CAD': 'CA$',
    'AUD': 'A$',
};

const CURRENCY_LOCALE: Record<string, string> = {
    'BDT': 'en-BD',
    'INR': 'en-IN',
    'USD': 'en-US',
    'EUR': 'en-DE',
    'GBP': 'en-GB',
};

export async function getCurrencySymbol(): Promise<string> {
    try {
        const settings = await prisma.programSettings.findFirst();
        const currency = settings?.currency || 'BDT';
        return CURRENCY_SYMBOLS[currency] || '৳';
    } catch (error) {
        console.error('Failed to fetch currency symbol:', error);
        return '৳';
    }
}

export async function getCurrency(): Promise<string> {
    try {
        const settings = await prisma.programSettings.findFirst();
        return settings?.currency || 'BDT';
    } catch {
        return 'BDT';
    }
}

export async function getLocale(): Promise<string> {
    try {
        const settings = await prisma.programSettings.findFirst();
        const currency = settings?.currency || 'BDT';
        return CURRENCY_LOCALE[currency] || 'en-BD';
    } catch {
        return 'en-BD';
    }
}

export function formatCurrency(cents: number, symbol: string): string {
    const amount = cents / 100;
    return `${symbol}${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

export async function formatAmount(cents: number): Promise<string> {
    const symbol = await getCurrencySymbol();
    return formatCurrency(cents, symbol);
}
