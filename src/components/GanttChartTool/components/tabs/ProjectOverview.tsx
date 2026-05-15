import React from 'react';
import { ProjectMetadata, ProjectSettings, TradeCost } from '../../types';
import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectOverviewProps {
  metadata: ProjectMetadata;
  setMetadata: React.Dispatch<React.SetStateAction<ProjectMetadata>>;
  settings: ProjectSettings;
  projectStats: { duration: number; end: Date };
  totalBudget: number;
  trades: TradeCost[];
  setTrades: React.Dispatch<React.SetStateAction<TradeCost[]>>;
}

export function ProjectOverview({ metadata, setMetadata, settings, projectStats, totalBudget, trades, setTrades }: ProjectOverviewProps) {
  const handleUpdateTrade = (id: string, field: keyof TradeCost, value: string | number) => {
    setTrades(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleAddTrade = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setTrades(prev => [...prev, { id: newId, tradeName: 'New Trade', projectedCost: 0, actualCost: 0 }]);
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const totalActual = trades.reduce((sum, t) => sum + t.actualCost, 0);

  return (
    <div className="max-w-[1600px] w-full overflow-y-auto h-full bg-transparent">
      <h2 className="text-2xl font-semibold text-white mb-6">Project Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Editable Details */}
        <div className="space-y-6 lg:col-span-4">
          <div className="bg-surface border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-2">General Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Project Name</label>
              <input 
                type="text" 
                className="w-full p-3 bg-black/20 border border-white/10 focus:border-primary transition-colors text-white rounded-xl"
                value={metadata.name}
                onChange={(e) => setMetadata(m => ({ ...m, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Project Number</label>
              <input 
                type="text" 
                className="w-full p-3 bg-black/20 border border-white/10 focus:border-primary transition-colors text-white rounded-xl"
                value={metadata.number}
                onChange={(e) => setMetadata(m => ({ ...m, number: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
              <textarea 
                className="w-full p-3 bg-black/20 border border-white/10 focus:border-primary transition-colors text-white rounded-xl h-24 resize-none"
                value={metadata.description}
                onChange={(e) => setMetadata(m => ({ ...m, description: e.target.value }))}
                placeholder="Brief description of the project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Site Address</label>
              <input 
                type="text" 
                className="w-full p-3 bg-black/20 border border-white/10 focus:border-primary transition-colors text-white rounded-xl"
                value={metadata.address}
                onChange={(e) => setMetadata(m => ({ ...m, address: e.target.value }))}
                placeholder="123 Ocean Drive, Coastal City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Floor Area (sqm)</label>
              <input 
                type="number" 
                className="w-full p-3 bg-black/20 border border-white/10 focus:border-primary transition-colors text-white rounded-xl"
                value={metadata.floorArea}
                onChange={(e) => setMetadata(m => ({ ...m, floorArea: Number(e.target.value) }))}
              />
            </div>
          </div>
        </div>

        {/* Middle Column: Derived/Read-Only Stats */}
        <div className="space-y-6 lg:col-span-3">
          <div className="bg-surface border border-white/10 p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-2">Key Metrics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 border border-white/10 p-4 rounded-xl">
                <span className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Total Budget</span>
                <span className="text-xl font-bold text-white">${totalBudget.toLocaleString()}</span>
              </div>
              
              <div className="bg-black/20 border border-white/10 p-4 rounded-xl">
                <span className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Contract Period</span>
                <span className="text-xl font-bold text-white">{projectStats.duration} Days</span>
                <span className="block text-xs text-white/70 mt-1">
                  {settings.isWorkingDays ? 'Working Days' : 'Calendar Days'}
                </span>
              </div>

              <div className="bg-black/20 border border-white/10 p-4 rounded-xl">
                <span className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Commencement</span>
                <span className="text-lg font-bold text-white">{format(settings.startDate, 'MMM d, yyyy')}</span>
              </div>

              <div className="bg-black/20 border border-white/10 p-4 rounded-xl">
                <span className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Completion</span>
                <span className="text-lg font-bold text-white">{format(projectStats.end, 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-white/10 p-6 pb-10 rounded-2xl space-y-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-2">Timeline Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="block text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-1">Total Duration</span>
                <span className="text-xl font-bold text-white">{projectStats.duration} Days</span>
              </div>
              <div className="bg-black/20 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="block text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-1">End Date</span>
                <span className="text-xl font-bold text-white">{format(projectStats.end, 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cost Breakdown */}
        <div className="space-y-6 lg:col-span-5">
          <div className="bg-surface border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="text-lg font-medium text-white">Cost Breakdown</h3>
              <button 
                onClick={handleAddTrade}
                className="flex items-center gap-2 bg-surface hover:bg-surface/5 border border-white/10 transition-colors px-3 py-1.5 rounded-lg font-medium text-sm"
              >
                <Plus size={14} /> Add Trade
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-2 font-semibold text-white text-xs w-2/5">Trade / Description</th>
                    <th className="p-2 font-semibold text-white text-xs text-right w-1/4">Projected ($)</th>
                    <th className="p-2 font-semibold text-white text-xs text-right w-1/4">Actual ($)</th>
                    <th className="p-2 font-semibold text-white text-xs text-center w-1/10"></th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade) => (
                    <tr key={trade.id} className="border-b border-gray-300/20 hover:bg-surface/5 transition-colors group">
                      <td className="p-1.5">
                        <input 
                          type="text" 
                          className="w-full bg-black/20 border border-white/10 focus:border-primary transition-colors text-white px-2 py-1.5 rounded-md text-sm"
                          value={trade.tradeName}
                          onChange={(e) => handleUpdateTrade(trade.id, 'tradeName', e.target.value)}
                        />
                      </td>
                      <td className="p-1.5">
                        <input 
                          type="number" 
                          className="w-full bg-black/20 border border-white/10 focus:border-primary transition-colors text-white px-2 py-1.5 rounded-md text-right font-mono text-sm"
                          value={trade.projectedCost}
                          onChange={(e) => handleUpdateTrade(trade.id, 'projectedCost', Number(e.target.value))}
                        />
                      </td>
                      <td className="p-1.5">
                        <input 
                          type="number" 
                          className="w-full bg-black/20 border border-white/10 focus:border-primary transition-colors text-white px-2 py-1.5 rounded-md text-right font-mono text-sm"
                          value={trade.actualCost}
                          onChange={(e) => handleUpdateTrade(trade.id, 'actualCost', Number(e.target.value))}
                        />
                      </td>
                      <td className="p-1.5 text-center">
                        <button 
                          onClick={() => handleDeleteTrade(trade.id)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-surface hover:bg-surface/5 border border-white/10 transition-colors rounded-full"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-white text-sm">
                    <td className="p-2 text-right">Total:</td>
                    <td className="p-2 text-right font-mono">${totalBudget.toLocaleString()}</td>
                    <td className="p-2 text-right font-mono">${totalActual.toLocaleString()}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

