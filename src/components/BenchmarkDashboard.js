import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../contexts/AppContext';

export const BenchmarkDashboard = ({ benchmarkData }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const bgColorClass = isDarkMode ? 'bg-black/50' : 'bg-white/50';
  const borderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';
  const cardBgClass = isDarkMode ? 'bg-black/80' : 'bg-white/80';
  const hoverBgClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedConfig]);

  const MetricCard = ({ metric, index }) => {
    const isSelected = selectedMetric === index;
    const trendColor = metric.trend === 'up' 
      ? (isDarkMode ? 'text-green-400' : 'text-green-600')
      : (isDarkMode ? 'text-red-400' : 'text-red-600');
    
    const trendIcon = metric.trend === 'up' ? '↗' : '↘';

    return (
      <div 
        className={`${cardBgClass} backdrop-blur-sm border ${borderColorClass} rounded-lg p-4 transition-all duration-300 cursor-pointer ${hoverBgClass} ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => setSelectedMetric(isSelected ? null : index)}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className={`font-mono text-sm font-semibold ${textColorClass}`}>
            {metric.name}
          </h4>
          <span className={`text-xs ${trendColor} font-mono`}>
            {trendIcon} {metric.improvement}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-lg font-mono font-bold ${textColorClass}`}>
              {metric.current}
            </span>
            <span className={`text-xs ${mutedTextColorClass} font-mono`}>
              vs {metric.previous}
            </span>
          </div>
          
          {isSelected && (
            <div className={`text-xs ${mutedTextColorClass} mt-2 p-2 rounded border ${borderColorClass} transition-all duration-300`}>
              {metric.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ConfigurationCard = ({ config, index }) => {
    const isSelected = selectedConfig === index;
    
    return (
      <div 
        className={`${cardBgClass} backdrop-blur-sm border ${borderColorClass} rounded-lg p-4 transition-all duration-300 cursor-pointer ${hoverBgClass} ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => setSelectedConfig(index)}
      >
        <h4 className={`font-mono text-sm font-semibold ${textColorClass} mb-2`}>
          {config.name}
        </h4>
        <p className={`text-xs ${mutedTextColorClass} mb-3`}>
          {config.description}
        </p>
        <div className="space-y-1">
          {Object.entries(config.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between text-xs">
              <span className={`${mutedTextColorClass} capitalize`}>{key}:</span>
              <span className={`${textColorClass} font-mono`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const IcebergChart = () => {
    const metrics = benchmarkData.sections.flatMap(section => section.metrics);
    const visibleMetrics = metrics.slice(0, 4); // Top 4 visible metrics
    const hiddenMetrics = metrics.slice(4); // Hidden/underwater metrics
    
    return (
      <div className={`${cardBgClass} backdrop-blur-sm border ${borderColorClass} rounded-lg p-6`}>
        <h3 className={`font-mono text-lg font-bold ${textColorClass} mb-4`}>
          Iceberg Performance Visualization
        </h3>
        
        <div className="space-y-6">
          {/* Visible Performance (Above Water) */}
          <div>
            <h4 className={`font-mono text-sm font-semibold ${textColorClass} mb-3`}>
              Visible Performance Metrics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visibleMetrics.map((metric, index) => (
                <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} border ${borderColorClass}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-mono text-xs ${textColorClass}`}>
                      {metric.name}
                    </span>
                    <span className={`font-mono text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.improvement}
                    </span>
                  </div>
                  <div className={`font-mono text-sm font-bold ${textColorClass}`}>
                    {metric.current}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Performance (Underwater) */}
          <div>
            <h4 className={`font-mono text-sm font-semibold ${textColorClass} mb-3`}>
              Advanced Performance Metrics
            </h4>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/50'} border ${isDarkMode ? 'border-blue-500/30' : 'border-blue-300'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hiddenMetrics.map((metric, index) => (
                  <div key={index} className={`p-2 rounded ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-mono text-xs ${mutedTextColorClass}`}>
                        {metric.name}
                      </span>
                      <span className={`font-mono text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.improvement}
                      </span>
                    </div>
                    <div className={`font-mono text-xs font-semibold ${textColorClass}`}>
                      {metric.current}
                    </div>
                  </div>
                ))}
              </div>
              <p className={`text-xs ${mutedTextColorClass} mt-2 font-mono`}>
                Advanced metrics reveal deeper performance characteristics
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PerformanceChart = () => {
    const currentConfig = benchmarkData.configurations[selectedConfig];
    const metrics = benchmarkData.sections.flatMap(section => section.metrics);
    
    return (
      <div className={`${cardBgClass} backdrop-blur-sm border ${borderColorClass} rounded-lg p-6`}>
        <h3 className={`font-mono text-lg font-bold ${textColorClass} mb-4`}>
          Performance Comparison: {currentConfig.name}
        </h3>
        
        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const currentValue = parseFloat(metric.current.replace(/[^\d.]/g, ''));
            const previousValue = parseFloat(metric.previous.replace(/[^\d.]/g, ''));
            const improvement = ((currentValue - previousValue) / previousValue) * 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`font-mono text-sm ${textColorClass}`}>
                    {metric.name}
                  </span>
                  <span className={`font-mono text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
                  </span>
                </div>
                
                <div className="relative">
                  <div className={`h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        metric.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min(100, Math.max(0, (currentValue / Math.max(currentValue, previousValue)) * 100))}%` 
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs mt-1">
                    <span className={`${mutedTextColorClass} font-mono`}>
                      {metric.previous}
                    </span>
                    <span className={`${textColorClass} font-mono font-semibold`}>
                      {metric.current}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const AIInsights = () => {
    const insights = [
      {
        type: 'prediction',
        title: 'Performance Trajectory',
        content: 'Based on current trends, response times are projected to reach sub-0.5ms within 6 months.',
        confidence: '87%'
      },
      {
        type: 'optimization',
        title: 'Efficiency Opportunity',
        content: 'Memory optimization could yield additional 15% performance gains through advanced quantization.',
        confidence: '92%'
      },
      {
        type: 'scaling',
        title: 'Scalability Forecast',
        content: 'Current architecture can support 100+ concurrent queries with minimal performance degradation.',
        confidence: '94%'
      }
    ];

    return (
      <div className={`${cardBgClass} backdrop-blur-sm border ${borderColorClass} rounded-lg p-6`}>
        <h3 className={`font-mono text-lg font-bold ${textColorClass} mb-4`}>
          AI-Powered Performance Insights
        </h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border ${borderColorClass} ${
              insight.type === 'prediction' ? (isDarkMode ? 'bg-green-900/20 border-green-500/30' : 'bg-green-100/50 border-green-300') :
              insight.type === 'optimization' ? (isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-100/50 border-blue-300') :
              (isDarkMode ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-100/50 border-purple-300')
            }`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-mono text-sm font-semibold ${textColorClass}`}>
                  {insight.title}
                </h4>
                <span className={`text-xs font-mono ${mutedTextColorClass}`}>
                  {insight.confidence} confidence
                </span>
              </div>
              <p className={`text-sm ${mutedTextColorClass} font-mono`}>
                {insight.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-3xl font-mono font-bold ${textColorClass} mb-4`}>
          {benchmarkData.title}
        </h2>
        <p className={`text-lg ${mutedTextColorClass} max-w-3xl mx-auto`}>
          {benchmarkData.subtitle}
        </p>
      </div>

      {/* Configuration Selector */}
      <div className="space-y-4">
        <h3 className={`text-xl font-mono font-semibold ${textColorClass}`}>
          Configuration Comparison
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benchmarkData.configurations.map((config, index) => (
            <ConfigurationCard key={index} config={config} index={index} />
          ))}
        </div>
      </div>

      {/* Iceberg Chart */}
      <IcebergChart />

      {/* Performance Chart */}
      <PerformanceChart />

      {/* AI Insights */}
      <AIInsights />

      {/* Metrics Grid */}
      {benchmarkData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <h3 className={`text-xl font-mono font-semibold ${textColorClass}`}>
            {section.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {section.metrics.map((metric, index) => (
              <MetricCard 
                key={index} 
                metric={metric} 
                index={`${sectionIndex}-${index}`}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Real-time Status */}
      <div className={`${cardBgClass} backdrop-blur-sm border ${borderColorClass} rounded-lg p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-mono text-lg font-semibold ${textColorClass}`}>
              Live Performance Monitoring
            </h3>
            <p className={`text-sm ${mutedTextColorClass}`}>
              Real-time metrics from internal deployment
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isAnimating ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className={`text-sm font-mono ${textColorClass}`}>
              {isAnimating ? 'Updating...' : 'Live'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};