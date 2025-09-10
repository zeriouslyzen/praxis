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
                {section.content}
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
