import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, AlertTriangle, Clock, Leaf, DollarSign, Building2, HardHat, Activity, Link as LinkIcon, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const costTrendData = [
  { year: '2020', Sydney: 2019, Melbourne: 1971, Brisbane: 1693 },
  { year: '2021', Sydney: 2043, Melbourne: 2010, Brisbane: 1856 },
  { year: '2022', Sydney: 2084, Melbourne: 2070, Brisbane: 1949 },
  { year: '2023', Sydney: 2178, Melbourne: 2178, Brisbane: 2076 },
  { year: '2024', Sydney: 2254, Melbourne: 2243, Brisbane: 2169 },
  { year: '2025', Sydney: 2331, Melbourne: 2319, Brisbane: 2273 },
  { year: '2026', Sydney: 2424, Melbourne: 2412, Brisbane: 2387 },
];

const buildingCostsData = {
  'Class 1 Residential': [
    { name: '3BR Weatherboard (Low)', Sydney: 2042, Melbourne: 2032, Brisbane: 2011 },
    { name: '3BR Brick Veneer (Med)', Sydney: 2424, Melbourne: 2412, Brisbane: 2387 },
    { name: '2BR 2-Level Townhouse (Med)', Sydney: 3702, Melbourne: 3683, Brisbane: 3646 },
    { name: 'Architecturally Designed (High)', Sydney: 8123, Melbourne: 8082, Brisbane: 8001 },
  ],
  'Class 2 Multi-Residential': [
    { name: '3 Storeys (Walk-up)', Sydney: 3845, Melbourne: 3856, Brisbane: 3823 },
    { name: '10-20 Storeys', Sydney: 4925, Melbourne: 4921, Brisbane: 4875 },
    { name: '40-80 Storeys', Sydney: 5950, Melbourne: 5961, Brisbane: 5909 },
  ],
  'Commercial Offices & Hotels': [
    { name: 'Office Class A (10-25)', Sydney: 5300, Melbourne: 4450, Brisbane: 4500 },
    { name: 'Office Class C (1-3)', Sydney: 3500, Melbourne: 3150, Brisbane: 3075 },
    { name: 'Hotel 5-Star Luxury', Sydney: 5743, Melbourne: 4700, Brisbane: 5100 },
    { name: 'Hotel 3-Star Standard', Sydney: 3380, Melbourne: 2950, Brisbane: 2915 },
  ],
  'Class 9 Educational Buildings': [
    { name: 'Administration Building', Sydney: 3300, Melbourne: 3065, Brisbane: 2975 },
    { name: 'Gymnasium / Basketball', Sydney: 5400, Melbourne: 5000, Brisbane: 4850 },
    { name: 'School Laboratory Block', Sydney: 4000, Melbourne: 3705, Brisbane: 3600 },
    { name: 'Specialist Classroom', Sydney: 3650, Melbourne: 3400, Brisbane: 3300 },
    { name: 'Portable / Modular', Sydney: 2300, Melbourne: 2100, Brisbane: 2050 },
  ]
};

const componentBreakdownData = [
  { name: 'Substructure & Foundations', value: 6.5 },
  { name: 'Superstructure', value: 27.5 },
  { name: 'Building Services', value: 25 },
  { name: 'Building Envelope', value: 17.5 },
  { name: 'Internal Finishes', value: 20 },
];

const COLORS = ['#C19A6B', '#FFFFFF', '#9CA3AF', '#4B5563', '#6B7280'];

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const text = payload.value;
  const words = text.split(' ');
  let line1 = text;
  let line2 = '';
  
  if (words.length > 2) {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(' ');
    line2 = words.slice(mid).join(' ');
  } else if (words.length === 2 && text.length > 12) {
    line1 = words[0];
    line2 = words[1];
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#888" fontSize={11}>
        <tspan x={0} dy="0">{line1}</tspan>
        {line2 && <tspan x={0} dy="14">{line2}</tspan>}
      </text>
    </g>
  );
};

export function ConstructionCostDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof buildingCostsData>('Class 1 Residential');
  const [showReferences, setShowReferences] = useState(false);

  const references = [
    { title: "RLB Riders Digest Australia 2026 - RLB | Oceania", url: "https://www.rlb.com/oceania/insight/rlb-riders-digest-australia-2026/" },
    { title: "Riders Digest Archives - RLB | Oceania", url: "https://www.rlb.com/oceania/insights/theme/riders-digest/" },
    { title: "How Much Does It Cost To Build a House in 2026? | Average Building Costs", url: "https://www.bmtqs.com.au/construction-cost-table" },
    { title: "AUSTRALIA REPORT - RLB", url: "https://www.rlb.com/wp-content/uploads/sites/1/2022/01/RLB-Australia-Report_Q3_2021_2.pdf" },
    { title: "Australia's Construction Hits $318bn as Cost Crunch Bites | The Urban Developer", url: "https://www.theurbandeveloper.com/articles/australia-s-construction-sector-hits-aud318bn-as-cost-pressures-re-emerge-rlb" },
    { title: "Australia's construction sector reaches $318 billion as cost pressures re-emerge - RLB", url: "https://www.rlb.com/oceania/insight/australias-construction-sector-reaches-318-billion-as-cost-pressures-re-emerge/" },
    { title: "CONSTRUCTION MARKET UPDATE - RLB (Q4 2025)", url: "https://www.rlb.com/wp-content/uploads/sites/1/2025/12/RLB-Australia-Market-Intelligence-Update_Q4-2025.pdf" },
    { title: "Construction cost escalation to remain elevated in 2026 - RLB | Oceania", url: "https://www.rlb.com/oceania/insight/construction-cost-escalation-to-remain-elevated-in-2026/" },
    { title: "How much, on average, does it cost to build a house in 2025? - Property Update", url: "https://propertyupdate.com.au/how-much-on-average-does-it-cost-to-build-a-house/" },
    { title: "2023 CONSTRUCTION COST GUIDE - Design Matters", url: "https://designmatters.org.au/common/Uploaded%20files/PracticeNotes/Construction%20Docs/Construction%20Cost%20Guide%202023.pdf" },
    { title: "RIDERS DIGEST (Sydney 2022) - RLB", url: "https://www.rlb.com/oceania/wp-content/uploads/sites/1/2022/02/2022-RLB-Riders-Digest_Sydney.pdf" },
    { title: "QUEENSLAND, AUSTRALIA 2026 - RLB", url: "https://www.rlb.com/wp-content/uploads/sites/1/2025/12/2026-RLB-Rider-Digest_Queensland_Digital_2.pdf" },
    { title: "CONSTRUCTION MARKET UPDATE (Q1 2026) - RLB", url: "https://www.rlb.com/wp-content/uploads/sites/1/2026/03/RLB-Australia-Market-Intelligence-Update-Q1-2026.pdf" },
    { title: "Rawlinsons Construction | PDF | Prices - Scribd", url: "https://www.scribd.com/document/730049987/Rawlinsons-Construction" },
    { title: "Riders Digest 2024, Melbourne, Australia - RLB", url: "https://www.rlb.com/oceania/wp-content/uploads/sites/1/2023/04/RLB-Rider-Digest_Melbourne_Digital_2.pdf" },
    { title: "Construction Cost Table | Koste Chartered Quantity Surveyor", url: "https://koste.com.au/construction-cost-table/" },
    { title: "Queensland Riders Digest 2025 Edition | PDF | Life Cycle Assessment | Sustainability - Scribd", url: "https://www.scribd.com/document/960379469/2025-RLB-Rider-Digest-Queensland-Digital" },
    { title: "Riders Digest 2025, Adelaide, Australia - RLB", url: "https://www.rlb.com/oceania/wp-content/uploads/sites/1/2024/12/2025-RLB-Rider-Digest_Adelaide_Digital.pdf" },
    { title: "Riders Digest 2025, Melbourne, Australia - RLB", url: "https://www.rlb.com/oceania/wp-content/uploads/sites/1/2024/12/2025-RLB-Rider-Digest_Melbourne_Digital.pdf" },
    { title: "RIDERS DIGEST 2019 - RLB", url: "https://www.rlb.com/wp-content/uploads/sites/4/2020/09/2019-Riders-Digest.pdf" },
    { title: "RLB Riders Digest Australia 2025 - RLB | Oceania", url: "https://www.rlb.com/oceania/insight/australia-riders-digest-2025/" }
  ];

  return (
    <div className="w-full bg-[#1e1e1e] text-white p-6 rounded-xl border border-white/10 font-sans my-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Australian Construction Cost Update</h2>
        <p className="text-on-surface-variant">2020 – Q1 2026 Market Analysis & Forecasts</p>
      </div>

      {/* Panel 1: Executive Macro KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface p-5 rounded-lg border border-white/5">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <DollarSign className="w-5 h-5 text-[#C19A6B]" />
            <span className="text-sm font-medium uppercase tracking-wider">Total Volume</span>
          </div>
          <div className="text-3xl font-bold">$318B</div>
          <div className="text-xs text-on-surface-variant mt-2">As of 2024/2025</div>
        </div>
        
        <div className="bg-surface p-5 rounded-lg border border-white/5">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <Clock className="w-5 h-5 text-white" />
            <span className="text-sm font-medium uppercase tracking-wider">Time Delay</span>
          </div>
          <div className="text-3xl font-bold">+40%</div>
          <div className="text-xs text-on-surface-variant mt-2">Compared to pre-pandemic</div>
        </div>

        <div className="bg-surface p-5 rounded-lg border border-white/5">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <Activity className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium uppercase tracking-wider">Productivity</span>
          </div>
          <div className="text-3xl font-bold">-3%</div>
          <div className="text-xs text-on-surface-variant mt-2">Drop in 2024-25 period</div>
        </div>

        <div className="bg-surface p-5 rounded-lg border border-white/5">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <Leaf className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium uppercase tracking-wider">Green Premium</span>
          </div>
          <div className="text-3xl font-bold">2-5%</div>
          <div className="text-xs text-on-surface-variant mt-2">For 6-Star Green Star</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Panel 2: Cost Escalation Trends */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-lg border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Average Construction Cost ($/m²) Tracked (2020–2026)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="year" stroke="#888" tick={{ fill: '#888' }} />
                <YAxis stroke="#888" tick={{ fill: '#888' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2a2a2a', borderColor: '#444', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`$${value}/m²`, 'Cost']}
                />
                <Legend />
                <Line type="monotone" dataKey="Sydney" stroke="#C19A6B" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Melbourne" stroke="#FFFFFF" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Brisbane" stroke="#9CA3AF" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 4: Component Breakdown */}
        <div className="bg-surface p-6 rounded-lg border border-white/5">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Class 2 High-Rise Breakdown
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={componentBreakdownData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {componentBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2a2a2a', borderColor: '#444', color: '#fff' }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
                <Legend verticalAlign="bottom" height={72} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Panel 3: Q1 2026 Cost by Building Category */}
      <div className="bg-surface p-6 rounded-lg border border-white/5 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <HardHat className="w-5 h-5 text-primary" />
            Q1 2026 Cost by Building Category ($/m²)
          </h3>
          <select 
            className="bg-[#2a2a2a] border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
          >
            {Object.keys(buildingCostsData).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={buildingCostsData[selectedCategory]} margin={{ top: 20, right: 0, bottom: 50, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#888" 
                interval={0}
                tick={<CustomXAxisTick />}
              />
              <YAxis stroke="#888" tick={{ fill: '#888' }} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2a2a2a', borderColor: '#444', color: '#fff' }}
                formatter={(value: number) => [`$${value}/m²`, 'Cost']}
                cursor={{ fill: '#333' }}
              />
              <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
              <Bar dataKey="Brisbane" fill="#9CA3AF" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#fff', fontSize: 10, formatter: (val: number) => `$${val}` }} />
              <Bar dataKey="Melbourne" fill="#FFFFFF" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#fff', fontSize: 10, formatter: (val: number) => `$${val}` }} />
              <Bar dataKey="Sydney" fill="#C19A6B" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#fff', fontSize: 10, formatter: (val: number) => `$${val}` }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 text-xs text-on-surface-variant italic">
          * Values represent the median of the estimated cost ranges for 2026. Low finish increases driven by commodities; high finish by specialized trade scarcity.
        </div>
      </div>

      {/* Panel 5: Market Drivers & Strategic Risks */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          Market Drivers & Strategic Risks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-low p-4 rounded-lg border-l-4 border-[#C19A6B]">
            <h4 className="font-bold text-sm mb-1 text-[#C19A6B]">Primary Cost Driver</h4>
            <p className="text-sm text-on-surface-variant">By early 2026, the chronic shortage of skilled labor is the primary driver of cost, replacing material prices.</p>
          </div>
          <div className="bg-surface-low p-4 rounded-lg border-l-4 border-white">
            <h4 className="font-bold text-sm mb-1 text-white">Risk Pricing</h4>
            <p className="text-sm text-on-surface-variant">Contractors are applying higher "risk margins" to tenders to offset potential labor cost hikes during a project's lifecycle.</p>
          </div>
          <div className="bg-surface-low p-4 rounded-lg border-l-4 border-gray-400">
            <h4 className="font-bold text-sm mb-1 text-gray-400">Brisbane Olympics</h4>
            <p className="text-sm text-on-surface-variant">Brisbane is facing an "Olympic Squeeze" with a 5.0% escalation rate forecast for 2026, as stadium and infrastructure projects compete with standard builds for labor.</p>
          </div>
          <div className="bg-surface-low p-4 rounded-lg border-l-4 border-gray-600">
            <h4 className="font-bold text-sm mb-1 text-gray-400">Melbourne Insolvencies</h4>
            <p className="text-sm text-on-surface-variant">Despite a massive activity level, Melbourne is battling high rates of subcontractor insolvencies, pushing competition down to Tier 2 and 3 contractors for smaller projects.</p>
          </div>
        </div>
      </div>

      {/* Panel 6: Educational Sector Focus */}
      <div className="mb-8 bg-surface p-6 rounded-lg border border-white/5">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Class 9 Educational Sector Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-on-surface-variant">
          <div>
            <h4 className="font-bold text-white mb-2">Sector Overview</h4>
            <p className="mb-3">School construction (Class 9) is a specialized sector characterized by a high diversity of building types within a single precinct. The requirements for school facilities have evolved between 2020 and 2026, with a greater emphasis on "flexible learning spaces," advanced STEM laboratories, and high-performance indoor sporting facilities.</p>
            <p>Class 9 Schools have evolved into high-tech hubs, where gymnasiums and labs now command rates up to $6,500/m², reflecting the complexity of modern educational pedagogies.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Functional Breakdown & Cost Drivers</h4>
            <p className="mb-3">Educational costs are often partitioned by the specific function of the building, as the service density of a laboratory far exceeds that of a standard administration block. Gymnasiums and basketball centers represent the highest cost per square metre in the school sector, driven by the structural requirement for large-span steel portal frames and high-quality timber sports flooring. In Melbourne, these facilities can reach $6,500/m² when including retractable seating and mezzanine viewing galleries.</p>
            <p className="mb-3">School administration costs are influenced by the level of fit-out. A standard "Government Department" level of finish for an administrative space in Melbourne ranges from $1,300 to $2,200/m² for the fit-out alone, excluding the building shell. When the building structure is included, the total rate aligns with the $3,000/m² benchmark common in the 2024–2026 period.</p>
            <p>In contrast, portable classrooms provide a more cost-effective, rapid-deployment solution, typically ranging from $1,800 to $2,400/m². However, the cost of these modular units has also risen as they are increasingly required to meet higher energy efficiency (Section J) standards and acoustic requirements similar to permanent structures.</p>
          </div>
        </div>
      </div>

      {/* References Section */}
      <div className="border-t border-white/10 pt-6">
        <button 
          onClick={() => setShowReferences(!showReferences)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors font-medium text-sm"
        >
          <LinkIcon className="w-4 h-4" />
          References
          {showReferences ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {showReferences && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {references.map((ref, idx) => (
              <a 
                key={idx} 
                href={ref.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-on-surface-variant hover:text-primary transition-colors truncate block"
                title={ref.title}
              >
                • {ref.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
