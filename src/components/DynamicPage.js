import React from 'react';
import { PageTemplate, SectionTemplate, ContentBlock, CardGrid, FeatureCard, StatsGrid } from '../templates/PageTemplate';
import { getPageContent } from '../data/pageContent';
import { ThemeContext } from '../contexts/AppContext';

// Dynamic Page Component that renders based on content data
export const DynamicPage = ({ pageKey, customContent = null }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const content = customContent || getPageContent(pageKey);
  
  if (!content) {
    return (
      <PageTemplate pageKey="404" title="Page Not Found">
        <SectionTemplate>
          <ContentBlock
            title="404 - Page Not Found"
            subtitle="The requested page could not be found."
          />
        </SectionTemplate>
      </PageTemplate>
    );
  }

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'hero':
        return (
          <SectionTemplate key={index} id="hero" delay={index * 0.2}>
            <ContentBlock
              title={section.title}
              subtitle={section.subtitle}
              titleSize="text-3xl md:text-4xl lg:text-5xl"
              subtitleSize="text-base md:text-lg"
            />
            {section.stats && (
              <div className="mt-12">
                <StatsGrid stats={section.stats} />
              </div>
            )}
          </SectionTemplate>
        );

      case 'features':
        return (
          <SectionTemplate key={index} id="features" delay={index * 0.2}>
            <ContentBlock
              title={section.title}
              subtitle={section.subtitle}
            />
            <CardGrid columns={2} className="mt-12">
              {section.features.map((feature, featureIndex) => (
                <FeatureCard
                  key={featureIndex}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  features={feature.features}
                  index={featureIndex}
                />
              ))}
            </CardGrid>
          </SectionTemplate>
        );

      case 'content':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <ContentBlock
              title={section.title}
              subtitle={section.subtitle}
            />
            {section.content && (
              <div className={`mt-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-sm leading-relaxed`}>
                {section.content.map((contentItem, contentIndex) => {
                  if (typeof contentItem === 'string') {
                    return <p key={contentIndex} className="mb-4">{contentItem}</p>;
                  } else if (contentItem && contentItem.type === 'paragraph') {
                    return <p key={contentIndex} className="mb-4">{contentItem.text}</p>;
                  }
                  return null;
                })}
              </div>
            )}
          </SectionTemplate>
        );

      case 'stats':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <ContentBlock
              title={section.title}
              subtitle={section.subtitle}
            />
            <div className="mt-12">
              <StatsGrid stats={section.stats} />
            </div>
          </SectionTemplate>
        );

      case 'cta':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="text-center">
              <ContentBlock
                title={section.title}
                subtitle={section.subtitle}
                titleSize="text-2xl md:text-3xl lg:text-4xl"
                subtitleSize="text-lg md:text-xl"
              />
              {section.description && (
                <p className={`mt-6 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-sm leading-relaxed`}>
                  {section.description}
                </p>
              )}
              {section.buttonText && section.buttonLink && (
                <div className="mt-8">
                  <a
                    href={section.buttonLink}
                    className={`inline-flex items-center px-8 py-4 rounded-lg font-mono font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-white text-black hover:bg-gray-200 hover:shadow-white/20' 
                        : 'bg-black text-white hover:bg-gray-800 hover:shadow-black/20'
                    } hover:shadow-2xl`}
                  >
                    {section.buttonText}
                  </a>
                </div>
              )}
            </div>
          </SectionTemplate>
        );

      case 'manifesto':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-12 text-center font-mono`}>
                {section.title}
              </h2>
              <div className="space-y-8">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className={`p-8 rounded-2xl border-2 ${
                    isDarkMode 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-black/20 bg-black/5'
                  }`}>
                    {item.type === 'declaration' && (
                      <div className="text-center">
                        <p className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} font-mono leading-relaxed`}>
                          {item.text}
                        </p>
                      </div>
                    )}
                    {item.type === 'principle' && (
                      <div>
                        <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4 font-mono`}>
                          {item.title}
                        </h3>
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono leading-relaxed`}>
                          {item.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionTemplate>
        );

      case 'comparison':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-12 text-center font-mono`}>
                {section.title}
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {section.sections.map((comparison, compIndex) => (
                  <div key={compIndex} className={`p-6 rounded-xl border-2 ${
                    isDarkMode 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-black/20 bg-black/5'
                  }`}>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 text-center font-mono`}>
                      {comparison.title}
                    </h3>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-900/30 border border-green-500/30' : 'bg-green-100 border border-green-300'}`}>
                        <h4 className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-800'} mb-2 font-mono`}>
                          PRAXIS
                        </h4>
                        <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'} font-mono text-sm`}>
                          {comparison.praxis}
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/30 border border-red-500/30' : 'bg-red-100 border border-red-300'}`}>
                        <h4 className={`font-bold ${isDarkMode ? 'text-red-400' : 'text-red-800'} mb-2 font-mono`}>
                          Big Tech
                        </h4>
                        <p className={`${isDarkMode ? 'text-red-200' : 'text-red-700'} font-mono text-sm`}>
                          {comparison.bigtech}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionTemplate>
        );

      case 'legal':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-12 text-center font-mono`}>
                {section.title}
              </h2>
              <div className="space-y-8">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className={`p-8 rounded-2xl border-2 ${
                    isDarkMode 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-black/20 bg-black/5'
                  }`}>
                    <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4 font-mono`}>
                      {item.title}
                    </h3>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono leading-relaxed`}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionTemplate>
        );

      case 'academic':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 font-mono`}>
                  {section.title}
                </h2>
                <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono max-w-4xl mx-auto leading-relaxed`}>
                  {section.subtitle}
                </p>
              </div>
              <div className="space-y-12">
                {section.positions.map((position, posIndex) => (
                  <div key={posIndex} className={`p-10 rounded-3xl border-2 ${
                    isDarkMode 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-black/20 bg-black/5'
                  }`}>
                    <div className="mb-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} font-mono`}>
                          {position.title}
                        </h3>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-mono`}>
                          {position.level}
                        </div>
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-mono mb-4`}>
                        {position.department}
                      </div>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono leading-relaxed`}>
                        {position.description}
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4 font-mono`}>
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-sm`}>
                              <span className={`mr-3 mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4 font-mono`}>
                          Benefits
                        </h4>
                        <ul className="space-y-2">
                          {position.benefits.map((benefit, benIndex) => (
                            <li key={benIndex} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-sm`}>
                              <span className={`mr-3 mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionTemplate>
        );

      case 'philosophy':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 font-mono`}>
                  {section.title}
                </h2>
                <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono max-w-4xl mx-auto leading-relaxed`}>
                  {section.subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {section.content.map((principle, princIndex) => (
                  <div key={princIndex} className={`p-8 rounded-2xl border-2 ${
                    isDarkMode 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-black/20 bg-black/5'
                  }`}>
                    <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4 font-mono`}>
                      {principle.title}
                    </h3>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono leading-relaxed mb-6`}>
                      {principle.description}
                    </p>
                    <ul className="space-y-2">
                      {principle.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-sm`}>
                          <span className={`mr-3 mt-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </SectionTemplate>
        );

      case 'application':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 font-mono`}>
                {section.title}
              </h2>
              <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono mb-8 leading-relaxed`}>
                {section.subtitle}
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono mb-12 leading-relaxed max-w-3xl mx-auto`}>
                {section.description}
              </p>
              
              <div className={`p-8 rounded-2xl border-2 ${
                isDarkMode 
                  ? 'border-white/20 bg-white/5' 
                  : 'border-black/20 bg-black/5'
              }`}>
                <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 font-mono`}>
                  Contact Information
                </h3>
                <div className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono mb-8`}>
                  Email: <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{section.contact.email}</span>
                </div>
                <a
                  href={`mailto:${section.contact.email}?subject=${encodeURIComponent(section.contact.subject)}&body=${encodeURIComponent(section.contact.template)}`}
                  className={`inline-flex items-center px-8 py-4 rounded-lg font-mono font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200 hover:shadow-white/20' 
                      : 'bg-black text-white hover:bg-gray-800 hover:shadow-black/20'
                  } hover:shadow-2xl`}
                >
                  Send Research Proposal
                </a>
              </div>
            </div>
          </SectionTemplate>
        );

      case 'partnership':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 font-mono`}>
                  {section.title}
                </h2>
                <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono max-w-4xl mx-auto leading-relaxed`}>
                  {section.subtitle}
                </p>
              </div>
              
              <div className={`p-12 rounded-3xl border-2 ${
                isDarkMode 
                  ? 'border-white/20 bg-white/5' 
                  : 'border-black/20 bg-black/5'
              }`}>
                <div className="mb-12">
                  <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 font-mono`}>
                    Our Philosophy
                  </h3>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono leading-relaxed`}>
                    {section.approach.philosophy}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-8 font-mono`}>
                    Partnership Benefits
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {section.approach.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono`}>
                        <span className={`mr-4 mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
                        <span className="text-sm leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionTemplate>
        );

      case 'capabilities':
        return (
          <SectionTemplate key={index} delay={index * 0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-6 font-mono`}>
                  {section.title}
                </h2>
              </div>
              
              <div className="space-y-16">
                {section.capabilities.map((capability, capIndex) => (
                  <div key={capIndex} className={`p-12 rounded-3xl border-2 ${
                    isDarkMode 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-black/20 bg-black/5'
                  }`}>
                    <div className="mb-8">
                      <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-4 font-mono`}>
                        {capability.title}
                      </h3>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono leading-relaxed`}>
                        {capability.description}
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {capability.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono`}>
                          <span className={`mr-4 mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionTemplate>
        );

      default:
        return null;
    }
  };

  return (
    <PageTemplate
      pageKey={pageKey}
      title={content.title}
      description={content.description}
      keywords={content.keywords}
      structuredData={content.structuredData}
    >
      {content.sections.map((section, index) => renderSection(section, index))}
    </PageTemplate>
  );
};

// Specific page components for complex pages
export const ResearchPublicationsPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const borderColor = isDarkMode ? 'border-white/10' : 'border-black/10';

  // Sample research papers data
  const researchPapers = [
    {
      title: "Autonomous Research Systems: A New Paradigm",
      authors: "PRAXIS Research Team",
      abstract: "This paper explores the development of autonomous research systems capable of self-directed investigation and discovery across multiple scientific domains.",
      domain: "AI Research",
      year: "2025"
    },
    {
      title: "Cross-Domain Knowledge Synthesis in Climate Engineering",
      authors: "PRAXIS Climate Division",
      abstract: "An analysis of hidden connections between climate engineering approaches and their potential systemic risks, discovered through autonomous research methods.",
      domain: "Climate Science",
      year: "2025"
    },
    {
      title: "Neural Architecture Optimization Through Meta-Learning",
      authors: "PRAXIS AI Lab",
      abstract: "Novel approaches to neural network architecture design using self-improving meta-learning systems that adapt their own learning processes.",
      domain: "Machine Learning",
      year: "2025"
    }
  ];

  return (
    <PageTemplate pageKey="research/publications">
      <SectionTemplate id="hero">
        <ContentBlock
          title="Research Publications"
          subtitle="Discover the latest research publications and scientific papers generated through our autonomous research systems."
        />
        <StatsGrid 
          stats={[
            { value: "18+", label: "Published Papers" },
            { value: "16+", label: "Scientific Domains" },
            { value: "95%", label: "Accuracy Rate" },
            { value: "24/7", label: "Research Operation" }
          ]} 
        />
      </SectionTemplate>

      <SectionTemplate id="publications">
        <ContentBlock
          title="Recent Publications"
          subtitle="Latest research papers and scientific discoveries from our autonomous research systems."
        />
        <CardGrid columns={3} className="mt-12">
          {researchPapers.map((paper, index) => (
            <div
              key={index}
              className={`${cardBg} backdrop-blur-sm border ${borderColor} rounded-xl p-6 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-lg font-bold ${textColor} font-mono`}>
                  {paper.title}
                </h3>
                <span className={`text-xs ${mutedTextColor} font-mono`}>
                  {paper.year}
                </span>
              </div>
              
              <p className={`text-sm ${mutedTextColor} mb-3 font-mono`}>
                {paper.authors}
              </p>
              
              <p className={`text-sm ${mutedTextColor} leading-relaxed mb-4 font-mono`}>
                {paper.abstract}
              </p>
              
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} ${textColor} font-mono`}>
                  {paper.domain}
                </span>
                <button className={`text-xs ${mutedTextColor} hover:${textColor} transition-colors font-mono`}>
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </CardGrid>
      </SectionTemplate>
    </PageTemplate>
  );
};

export default DynamicPage;
