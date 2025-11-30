import React, { useState, useEffect } from 'react';
import { Calculator, Droplets, Sun, Hammer, FileText, ArrowRight, RefreshCw, Save } from 'lucide-react';

const WellCalculator: React.FC = () => {
  // Exchange Rate (1 EUR = 655.957 XOF)
  const EXCHANGE_RATE = 655.957;

  // State for inputs
  const [depth, setDepth] = useState(60); // meters
  const [costPerMeter, setCostPerMeter] = useState(35000); // XOF
  const [pumpType, setPumpType] = useState('solar'); // manual, electric, solar
  const [tankCapacity, setTankCapacity] = useState(2000); // Liters
  const [studyCost, setStudyCost] = useState(150000); // XOF (Hydrogeology)
  const [laborCost, setLaborCost] = useState(250000); // XOF (Installation)
  const [contingency, setContingency] = useState(10); // %

  // State for results
  const [totalXOF, setTotalXOF] = useState(0);
  const [totalEUR, setTotalEUR] = useState(0);

  // Pump costs (Approx in XOF)
  const pumpCosts: Record<string, number> = {
    manual: 400000,
    electric: 300000, // Needs generator or grid
    solar: 1200000, // Includes panels
  };

  // Tank costs (Approx in XOF)
  const tankCostPerLiter = 150; // XOF per liter (polytank + stand)

  useEffect(() => {
    calculateTotal();
  }, [depth, costPerMeter, pumpType, tankCapacity, studyCost, laborCost, contingency]);

  const calculateTotal = () => {
    const drilling = depth * costPerMeter;
    const pump = pumpCosts[pumpType];
    const tank = tankCapacity * tankCostPerLiter;
    const subtotal = drilling + pump + tank + studyCost + laborCost;
    const contingencyAmount = subtotal * (contingency / 100);
    const total = subtotal + contingencyAmount;

    setTotalXOF(total);
    setTotalEUR(total / EXCHANGE_RATE);
  };

  const formatCurrency = (amount: number, currency: 'XOF' | 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-8 h-full bg-slate-50 flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-blue-600" />
          Simulateur Coût Forage
        </h2>
        <p className="text-slate-500 mt-1">Estimation précise pour le projet Tabligbo (Taux: 1€ = 655.96 FCFA)</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Forage */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Hammer className="w-5 h-5 text-amber-500" /> 1. Le Forage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Profondeur estimée (mètres)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" min="30" max="120" step="5" 
                    value={depth} onChange={(e) => setDepth(Number(e.target.value))}
                    className="flex-1 accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-bold text-blue-600 w-12">{depth} m</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Coût au mètre linéaire (FCFA)</label>
                <input 
                  type="number" 
                  value={costPerMeter} onChange={(e) => setCostPerMeter(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Équipement */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" /> 2. Équipement Hydraulique
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type de Pompe</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setPumpType('manual')}
                    className={`p-2 rounded-lg text-sm border ${pumpType === 'manual' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'border-slate-200 text-slate-600'}`}
                  >
                    Manuelle
                  </button>
                  <button 
                    onClick={() => setPumpType('electric')}
                    className={`p-2 rounded-lg text-sm border ${pumpType === 'electric' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'border-slate-200 text-slate-600'}`}
                  >
                    Électrique
                  </button>
                  <button 
                    onClick={() => setPumpType('solar')}
                    className={`p-2 rounded-lg text-sm border flex flex-col items-center justify-center gap-1 ${pumpType === 'solar' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'border-slate-200 text-slate-600'}`}
                  >
                    <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-orange-500"/> Solaire</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Capacité Château d'eau (Litres)</label>
                 <select 
                    value={tankCapacity} onChange={(e) => setTankCapacity(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="1000">1 000 L (Petit)</option>
                    <option value="2000">2 000 L (Standard)</option>
                    <option value="5000">5 000 L (Village)</option>
                    <option value="10000">10 000 L (Grand)</option>
                  </select>
              </div>
            </div>
          </div>

          {/* Section 3: Services Annexes */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" /> 3. Études & Main d'œuvre
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Étude Hydrogéologique</label>
                <input 
                  type="number" 
                  value={studyCost} onChange={(e) => setStudyCost(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Main d'œuvre / Pose</label>
                <input 
                  type="number" 
                  value={laborCost} onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Imprévus (%)</label>
                <input 
                  type="number" 
                  value={contingency} onChange={(e) => setContingency(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Receipt */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl sticky top-6">
            <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Estimation Globale</h3>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between items-center text-slate-400">
                <span>Forage ({depth}m)</span>
                <span>{formatCurrency(depth * costPerMeter, 'XOF')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Pompe ({pumpType})</span>
                <span>{formatCurrency(pumpCosts[pumpType], 'XOF')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Réservoir ({tankCapacity}L)</span>
                <span>{formatCurrency(tankCapacity * tankCostPerLiter, 'XOF')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Études & MO</span>
                <span>{formatCurrency(studyCost + laborCost, 'XOF')}</span>
              </div>
              <div className="flex justify-between items-center text-amber-400">
                <span>Imprévus ({contingency}%)</span>
                <span>{formatCurrency((totalXOF * contingency) / (100 + contingency), 'XOF')}</span>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl mb-4">
              <div className="text-slate-400 text-xs uppercase mb-1">Total en Francs CFA</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalXOF, 'XOF')}</div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-xl shadow-lg">
              <div className="text-blue-100 text-xs uppercase mb-1 flex items-center gap-2">
                 Total en Euros <ArrowRight className="w-3 h-3"/>
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(totalEUR, 'EUR')}</div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button 
                onClick={calculateTotal}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-600 hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Recalculer
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors">
                <Save className="w-4 h-4" /> Sauvegarder
              </button>
            </div>
            
            <p className="text-[10px] text-slate-500 mt-4 text-center">
              Estimation non contractuelle. Les prix peuvent varier selon la nature du sol à Tabligbo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellCalculator;