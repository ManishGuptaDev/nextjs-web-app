"use client";

import { useEffect, useState } from "react"
import Link from 'next/link';

interface RateType {
    currency: string;
    rate: number;
}

interface HistoryType {
    id: number;
    usdValue: number;
    convertedCurrency: string;
    rate: number;
    convertedValue: number;
    createdAt: string;
}

export default function Currency() {

    const [rates, setRates] = useState<RateType[]>([])
    const [usdValue, setUsdValue] = useState<string>("");
    const [selecedCur, setSelecedCur] = useState<string>("USD");
    const [history, setHistory] = useState<HistoryType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchRates = async () => {
        const resp = await fetch("https://open.er-api.com/v6/latest/USD");
        const currencies = await resp.json();

        if (currencies.result === "success") {
            const rates: RateType[] = [];
            Object.keys(currencies.rates).forEach(key => {
                rates.push({
                    currency: key,
                    rate: currencies.rates[key]
                })
            })
            setRates(rates);
        }
    }

    const fetchHistory = async () => {
        try {
            const response = await fetch('/api/currency');
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    }

    useEffect(() => {
        fetchRates();
        fetchHistory();
    }, [])

    const handleConvert = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!usdValue || parseFloat(usdValue) <= 0) return;

        setLoading(true);
        const usdVal = parseFloat(usdValue);
        const convertedCurrency = selecedCur;
        const rate = rates.find(r => r.currency === convertedCurrency)?.rate ?? 1;
        const convertedValue = usdVal * rate;

        try {
            const response = await fetch('/api/currency', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usdValue: usdVal, convertedCurrency, rate, convertedValue }),
            });

            if (response.ok) {
                setUsdValue('');
                setSelecedCur('USD');
                await fetchHistory();
            }
        } catch (error) {
            console.error('Failed to create conversion:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
            <main className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        Currency Converter
                    </h1>
                    <Link
                        href="/"
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Conversion Form */}
                <form onSubmit={handleConvert} className="mb-8">
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Amount (USD)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={usdValue}
                                onChange={(e) => setUsdValue(e.target.value)}
                                placeholder="Enter USD amount..."
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-50"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Target Currency
                            </label>
                            <select
                                value={selecedCur}
                                onChange={e => setSelecedCur(e.target.value)}
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-50"
                                disabled={loading}
                            >
                                {rates.length > 0 && rates.map((r, index) => (
                                    <option key={index} value={r.currency}>{r.currency}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={loading || !usdValue || rates.length === 0}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-[42px]"
                            >
                                {loading ? 'Converting...' : 'Convert'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Conversion History */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                        Conversion History
                    </h2>
                    {history.length === 0 ? (
                        <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
                            No conversions yet. Make your first conversion above!
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">USD Amount</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Currency</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Rate</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Converted Value</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item) => (
                                        <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                            <td className="py-3 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                                                ${item.usdValue.toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                                                {item.convertedCurrency}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                                                {item.rate.toFixed(4)}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                {item.convertedValue.toFixed(2)} {item.convertedCurrency}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-zinc-500 dark:text-zinc-400">
                                                {new Date(item.createdAt).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}