import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, addDays, differenceInDays } from 'date-fns';

interface CashflowProps {
  totalBudget: number;
  totalActual: number;
  startDate: Date;
  endDate: Date;
}

export function Cashflow({ totalBudget, totalActual, startDate, endDate }: CashflowProps) {
  const data = useMemo(() => {
    const duration = differenceInDays(endDate, startDate);
    if (duration <= 0) return [];

    const points = [];
    const numPoints = Math.min(duration, 30); // Sample up to 30 points for the curve
    const step = duration / numPoints;

    for (let i = 0; i <= numPoints; i++) {
      const currentDay = i * step;
      const t = currentDay / duration; // 0 to 1

      // Smoothstep function for S-curve: 3t^2 - 2t^3
      const sCurveFactor = (3 * Math.pow(t, 2)) - (2 * Math.pow(t, 3));

      const date = addDays(startDate, Math.round(currentDay));
      
      const point: any = {
        name: format(date, 'MMM d'),
        projected: Math.round(totalBudget * sCurveFactor),
      };
      
      if (totalActual > 0) {
        const actualValue = Math.round(totalActual * sCurveFactor);
        if (actualValue > 0) {
          point.actual = actualValue;
        }
      }
      
      points.push(point);
    }

    return points;
  }, [totalBudget, totalActual, startDate, endDate]);

  return (
    <div className="max-w-5xl w-full h-full flex flex-col bg-transparent">
      <h2 className="text-2xl font-semibold text-white mb-2">Projected Cashflow S-Curve</h2>
      <p className="text-sm text-gray-500 mb-8">
        Cumulative cost distribution over the project duration ({format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}).
      </p>

      <div className="flex-1 bg-surface border border-white/10 p-6 rounded-2xl min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickMargin={10}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line 
              type="monotone" 
              dataKey="projected" 
              name="Projected Cost" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#e0e0e0', strokeWidth: 2 }}
            />
            {totalActual > 0 && (
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Actual Cost" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: '#10b981', stroke: '#e0e0e0', strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
