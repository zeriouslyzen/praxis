// Centralized content management for all pages
export const pageContent = {
  // Product Pages
  'iceberg-overview': {
    title: 'Iceberg Overview',
    description: 'Revolutionary AGI research platform with breakthrough autonomous intelligence capabilities and 95% operational status.',
    keywords: 'iceberg, AGI platform, breakthrough research, autonomous intelligence, revolutionary AI',
    sections: [
      {
        type: 'hero',
        title: 'Iceberg Revolutionary AGI Platform',
        subtitle: 'Breakthrough autonomous intelligence system featuring 43+ specialized research agents with sub-millisecond response times and 100% test success rates.',
        stats: [
          { value: '95%', label: 'System Operational Status' },
          { value: '43+', label: 'Specialized Research Agents' },
          { value: '100%', label: 'Test Success Rate' },
          { value: '<1ms', label: 'Response Time' },
          { value: '50+', label: 'Concurrent Queries' },
          { value: '21+', label: 'Research APIs' }
        ]
      },
      {
        type: 'features',
        title: 'Revolutionary Capabilities',
        features: [
          {
            title: 'Autonomous Research Engine',
            description: 'Breakthrough collaborative intelligence architecture with 43+ specialized agents operating in parallel for continuous scientific discovery.',
            icon: null,
            features: [
              '24/7 autonomous operation and monitoring',
              'Cross-domain knowledge synthesis',
              'Emergent pattern recognition',
              'Self-improving methodologies',
              'Paradigm shift detection',
              'Real-time truth validation'
            ]
          },
          {
            title: 'Advanced Intelligence Integration',
            description: 'Revolutionary multi-agent system with enhanced deliberation capabilities and breakthrough discovery engine.',
            icon: null,
            features: [
              'Multi-agent collaborative research',
              'Real-time emergence detection',
              'Cross-domain knowledge integration',
              'Autonomous capability gap detection',
              'Proactive research advancement',
              'Scientific integrity assurance'
            ]
          },
          {
            title: 'Enterprise-Grade Performance',
            description: 'Industry-leading performance metrics with sub-millisecond response times and 100% reliability across all test scenarios.',
            icon: null,
            features: [
              'Sub-millisecond response times',
              '100% test success rate',
              '50+ concurrent query processing',
              '95% contamination detection accuracy',
              'Horizontal and vertical scaling',
              '99.9% system uptime'
            ]
          }
        ]
      },
      {
        type: 'benchmarks',
        title: 'Performance Benchmarks',
        subtitle: 'Comprehensive performance analysis and comparative metrics across different configurations and time periods.',
        sections: [
          {
            title: 'Core Performance Metrics',
            metrics: [
              {
                name: 'Response Time',
                current: '<1ms',
                previous: '2.3ms',
                improvement: '57%',
                trend: 'up',
                description: 'Sub-millisecond response times achieved through optimized HNSW implementation'
              },
              {
                name: 'Throughput',
                current: '18,000+ QPS',
                previous: '8,500 QPS',
                improvement: '112%',
                trend: 'up',
                description: 'Horizontal scaling capabilities with consistent hashing'
              },
              {
                name: 'Memory Efficiency',
                current: '850MB/1M vectors',
                previous: '2.7GB/1M vectors',
                improvement: '68%',
                trend: 'up',
                description: '32x memory reduction using binary quantization'
              },
              {
                name: 'Accuracy',
                current: '97.1%',
                previous: '94.2%',
                improvement: '3.1%',
                trend: 'up',
                description: 'Recall@10 accuracy maintained across optimizations'
              }
            ]
          },
          {
            title: 'System Reliability',
            metrics: [
              {
                name: 'Operational Status',
                current: '95%',
                previous: '87%',
                improvement: '9.2%',
                trend: 'up',
                description: 'High system reliability with automated monitoring'
              },
              {
                name: 'Success Rate',
                current: '100%',
                previous: '98.3%',
                improvement: '1.7%',
                trend: 'up',
                description: 'Perfect test success across all scenarios'
              },
              {
                name: 'Uptime',
                current: '99.9%',
                previous: '99.2%',
                improvement: '0.7%',
                trend: 'up',
                description: 'Enterprise-grade availability with redundancy'
              },
              {
                name: 'Cache Hit Rate',
                current: '85%+',
                previous: '72%',
                improvement: '18%',
                trend: 'up',
                description: 'Intelligent caching with production workloads'
              }
            ]
          },
          {
            title: 'Scalability Metrics',
            metrics: [
              {
                name: 'Concurrent Queries',
                current: '50+',
                previous: '25',
                improvement: '100%',
                trend: 'up',
                description: 'Multi-tenant isolation with per-tenant indexing'
              },
              {
                name: 'Research Agents',
                current: '43+',
                previous: '28',
                improvement: '54%',
                trend: 'up',
                description: 'Specialized agents for cross-domain research'
              },
              {
                name: 'API Integrations',
                current: '21+',
                previous: '12',
                improvement: '75%',
                trend: 'up',
                description: 'Extensive API ecosystem for research capabilities'
              },
              {
                name: 'Contamination Detection',
                current: '95%',
                previous: '89%',
                improvement: '6.7%',
                trend: 'up',
                description: 'Advanced validation and quality assurance'
              }
            ]
          }
        ],
        configurations: [
          {
            name: 'Internal Configuration',
            description: 'Optimized internal hardware with native performance',
            specs: {
              processor: 'Internal CPU',
              memory: 'Internal Memory',
              storage: 'Internal Storage',
              os: 'Internal OS'
            }
          },
          {
            name: 'Previous Generation',
            description: 'Legacy x86 architecture with standard optimizations',
            specs: {
              processor: 'Intel x86-64',
              memory: '32GB DDR4',
              storage: 'NVMe SSD',
              os: 'Linux with standard libraries'
            }
          },
          {
            name: 'Cloud Deployment',
            description: 'Distributed cloud infrastructure with horizontal scaling',
            specs: {
              processor: 'Multi-core cloud instances',
              memory: 'Distributed memory pool',
              storage: 'Cloud storage with CDN',
              os: 'Containerized deployment'
            }
          }
        ]
      }
    ]
  },

  'iceberg-protocol': {
    title: 'Iceberg AGI Protocol',
    description: 'Revolutionary foundational protocol powering breakthrough autonomous intelligence with 95% operational status and sub-millisecond response times.',
    keywords: 'AGI protocol, breakthrough AI, autonomous intelligence, revolutionary protocol, advanced general intelligence',
    sections: [
      {
        type: 'hero',
        title: 'Iceberg Revolutionary AGI Protocol',
        subtitle: 'Breakthrough protocol enabling advanced general intelligence with 43+ specialized agents, 100% test success rates, and paradigm-shifting research capabilities.',
        stats: [
          { value: '95%', label: 'Operational Status' },
          { value: '43+', label: 'Research Agents' },
          { value: '100%', label: 'Success Rate' },
          { value: '<1ms', label: 'Response Time' },
          { value: '50+', label: 'Concurrent Queries' },
          { value: '21+', label: 'Research APIs' }
        ]
      },
      {
        type: 'features',
        title: 'Revolutionary Protocol Capabilities',
        features: [
          {
            title: 'Collaborative Intelligence Architecture',
            description: 'Breakthrough multi-agent system with enhanced deliberation capabilities and autonomous intelligence integration.',
            icon: null,
            features: [
              '43+ specialized research agents',
              'Enhanced deliberation pipeline',
              'Autonomous capability gap detection',
              'Real-time emergence detection',
              'Cross-domain knowledge synthesis',
              'Proactive research advancement'
            ]
          },
          {
            title: 'Advanced Performance Metrics',
            description: 'Industry-leading performance with sub-millisecond response times and 100% reliability across all test scenarios.',
            icon: null,
            features: [
              'Sub-millisecond response times',
              '100% test success rate',
              '50+ concurrent query processing',
              '95% contamination detection',
              'Horizontal and vertical scaling',
              '99.9% system uptime'
            ]
          },
          {
            title: 'Scientific Integrity Assurance',
            description: 'Research-grade validation systems with advanced contamination prevention and truth validation capabilities.',
            icon: null,
            features: [
              '95% accuracy in contamination detection',
              '100% validation coverage',
              'Automatic content quarantine',
              'Research-grade storage systems',
              'Evidence-weighted principles',
              'Scientific integrity protocols'
            ]
          }
        ]
      }
    ]
  },

  'platform': {
    title: 'PRAXIS Platform',
    description: 'Revolutionary research and development platform featuring breakthrough autonomous intelligence with 95% operational status and enterprise-grade capabilities.',
    keywords: 'platform, breakthrough research, autonomous intelligence, enterprise platform, revolutionary AI',
    sections: [
      {
        type: 'hero',
        title: 'PRAXIS Revolutionary Platform',
        subtitle: 'Breakthrough research and development platform featuring autonomous intelligence systems with 43+ specialized agents and sub-millisecond response times.',
        stats: [
          { value: '95%', label: 'Operational Status' },
          { value: '43+', label: 'Research Agents' },
          { value: '100%', label: 'Success Rate' },
          { value: '<1ms', label: 'Response Time' },
          { value: '50+', label: 'Concurrent Queries' },
          { value: '21+', label: 'Research APIs' }
        ]
      },
      {
        type: 'features',
        title: 'Revolutionary Platform Capabilities',
        features: [
          {
            title: 'Autonomous Research Engine',
            description: 'Breakthrough collaborative intelligence system with 43+ specialized research agents operating in parallel for continuous scientific discovery.',
            icon: null,
            features: [
              '24/7 autonomous research operation',
              'Cross-domain knowledge synthesis',
              'Emergent pattern recognition',
              'Self-improving methodologies',
              'Paradigm shift detection',
              'Real-time truth validation'
            ]
          },
          {
            title: 'Advanced Intelligence Integration',
            description: 'Revolutionary multi-agent system with enhanced deliberation capabilities and breakthrough discovery engine.',
            icon: null,
            features: [
              'Multi-agent collaborative research',
              'Real-time emergence detection',
              'Cross-domain knowledge integration',
              'Autonomous capability gap detection',
              'Proactive research advancement',
              'Scientific integrity assurance'
            ]
          },
          {
            title: 'Enterprise-Grade Performance',
            description: 'Industry-leading performance metrics with sub-millisecond response times and 100% reliability across all test scenarios.',
            icon: null,
            features: [
              'Sub-millisecond response times',
              '100% test success rate',
              '50+ concurrent query processing',
              '95% contamination detection accuracy',
              'Horizontal and vertical scaling',
              '99.9% system uptime'
            ]
          },
          {
            title: 'Advanced Research Capabilities',
            description: 'Revolutionary research capabilities with virtual laboratory environments, breakthrough discovery engines, and multi-domain synthesis.',
            icon: null,
            features: [
              'Virtual laboratory environments',
              'Breakthrough discovery engines',
              'Multi-domain research synthesis',
              'Truth-seeking methodologies',
              'Suppression pattern detection',
              'Scientific integrity assurance'
            ]
          },
          {
            title: 'Self-Modification & Evolution',
            description: 'Autonomous system improvement with self-modification engines, meta-cognitive architecture, and continuous capability enhancement.',
            icon: null,
            features: [
              'Self-modification engines',
              'Meta-cognitive architecture',
              'Autonomous system improvement',
              'Continuous capability enhancement',
              'Adaptive learning algorithms',
              'Evolutionary optimization'
            ]
          }
        ]
      }
    ]
  },

  'enterprise': {
    title: 'Enterprise Solutions',
    description: 'Revolutionary enterprise-grade autonomous intelligence solutions with breakthrough performance, advanced security, and comprehensive compliance for Fortune 500 organizations.',
    keywords: 'enterprise, breakthrough solutions, autonomous intelligence, Fortune 500, enterprise security, compliance',
    sections: [
      {
        type: 'hero',
        title: 'Revolutionary Enterprise Solutions',
        subtitle: 'Breakthrough autonomous intelligence platform with 95% operational status, enterprise-grade security, and comprehensive compliance for large-scale organizations.',
        stats: [
          { value: '95%', label: 'Operational Status' },
          { value: '43+', label: 'Research Agents' },
          { value: '100%', label: 'Success Rate' },
          { value: '<1ms', label: 'Response Time' },
          { value: '50+', label: 'Concurrent Queries' },
          { value: '21+', label: 'Research APIs' }
        ]
      },
      {
        type: 'features',
        title: 'Enterprise-Grade Capabilities',
        features: [
          {
            title: 'Advanced Security & Compliance',
            description: 'Enterprise-grade security with multi-factor authentication, encryption, audit logging, and comprehensive regulatory compliance.',
            icon: null,
            features: [
              'Multi-factor authentication',
              'End-to-end encryption',
              'Comprehensive audit logging',
              'Regulatory compliance (GDPR, HIPAA, SOX)',
              'Data privacy protection',
              'Export control compliance'
            ]
          },
          {
            title: 'Breakthrough Performance',
            description: 'Revolutionary performance metrics with sub-millisecond response times, 100% reliability, and enterprise-scale concurrent processing.',
            icon: null,
            features: [
              'Sub-millisecond response times',
              '100% test success rate',
              '50+ concurrent query processing',
              '95% contamination detection accuracy',
              'Horizontal and vertical scaling',
              '99.9% system uptime'
            ]
          },
          {
            title: 'Autonomous Intelligence Integration',
            description: 'Revolutionary multi-agent system with 43+ specialized research agents and enhanced deliberation capabilities for enterprise research.',
            icon: null,
            features: [
              '43+ specialized research agents',
              'Enhanced deliberation pipeline',
              'Real-time emergence detection',
              'Cross-domain knowledge synthesis',
              'Autonomous capability gap detection',
              'Proactive research advancement'
            ]
          },
          {
            title: 'Enterprise Monitoring & Backup',
            description: 'Comprehensive monitoring, automated backup, and disaster recovery with 7-year data retention and offsite storage.',
            icon: null,
            features: [
              'Real-time performance monitoring',
              'Automated daily backups',
              '7-year data retention',
              'Offsite encrypted storage',
              'Disaster recovery protocols',
              '24/7 system monitoring'
            ]
          },
          {
            title: 'Predictive Intelligence & Forecasting',
            description: 'Revolutionary predictive capabilities with temporal pattern modeling and breakthrough discovery forecasting for strategic enterprise planning.',
            icon: null,
            features: [
              'Temporal pattern modeling',
              'Scientific discovery prediction',
              'Technology adoption forecasting',
              'Cultural evolution analysis',
              'Breakthrough discovery forecasting',
              'Strategic planning optimization'
            ]
          },
          {
            title: 'Cross-Cultural Intelligence',
            description: 'Advanced cultural linguistic intelligence with cross-cultural concept mapping and global communication optimization.',
            icon: null,
            features: [
              'Cross-lingual concept mapping',
              'Cultural value system analysis',
              'Linguistic evolution tracking',
              'Global communication optimization',
              'Cultural context integration',
              'Multi-cultural research synthesis'
            ]
          }
        ]
      }
    ]
  },

  // Research Pages
  'research-index': {
    title: 'Research Index',
    description: 'Comprehensive index of breakthrough research publications and revolutionary findings generated by our autonomous intelligence system.',
    keywords: 'research index, breakthrough publications, autonomous intelligence, revolutionary research, scientific discovery',
    sections: [
      {
        type: 'hero',
        title: 'Revolutionary Research Index',
        subtitle: 'Breakthrough research discoveries and publications generated through our autonomous intelligence system with 43+ specialized research agents.',
        stats: [
          { value: '95%', label: 'System Operational Status' },
          { value: '43+', label: 'Research Agents' },
          { value: '100%', label: 'Success Rate' },
          { value: '<1ms', label: 'Response Time' },
          { value: '50+', label: 'Concurrent Queries' },
          { value: '21+', label: 'Research APIs' }
        ]
      },
      {
        type: 'features',
        title: 'Breakthrough Research Publications',
        features: [
          {
            title: 'Quantum Electrodynamic Field Theory',
            description: 'Revolutionary unified physics theory achieving fundamental force unification through electric field primacy.',
            icon: null,
            features: [
              'Unification of fundamental forces',
              'Electric field primacy framework',
              'Observer charge principle',
              'Celestial-molecular resonance analysis',
              'Statistical significance (p < 0.001)',
              'Therapeutic applications (+41% efficacy)'
            ]
          },
          {
            title: 'Real-Time Bioelectric Systems Analysis',
            description: 'Advanced bioelectric research with experimentally validated equations and voltage-gated phenomena analysis.',
            icon: null,
            features: [
              'Hodgkin-Huxley model validation',
              'Voltage-gated ion channel analysis',
              'Real-time bioelectric pattern recognition',
              'Experimental equation derivation',
              'Neural activity analysis',
              'Bioelectric field optimization'
            ]
          },
          {
            title: 'Autonomous Intelligence Integration',
            description: 'Breakthrough collaborative intelligence architecture with enhanced deliberation and emergence detection capabilities.',
            icon: null,
            features: [
              '43+ specialized research agents',
              'Enhanced deliberation pipeline',
              'Real-time emergence detection',
              'Cross-domain knowledge synthesis',
              'Autonomous capability gap detection',
              'Proactive research advancement'
            ]
          }
        ]
      }
    ]
  },

  'research/publications': {
    title: 'Research Publications',
    description: 'Revolutionary research publications and breakthrough scientific papers generated by our autonomous intelligence system with 43+ specialized research agents.',
    keywords: 'publications, breakthrough research, autonomous intelligence, revolutionary papers, scientific discovery',
    sections: [
      {
        type: 'hero',
        title: 'Research Publications',
        subtitle: 'Discover the latest research publications and scientific papers generated through our autonomous research systems.',
        stats: [
          { value: '18+', label: 'Published Papers' },
          { value: '16+', label: 'Scientific Domains' },
          { value: '95%', label: 'Accuracy Rate' },
          { value: '24/7', label: 'Research Operation' }
        ]
      }
    ]
  },

  'research/methodology': {
    title: 'Research Methodology',
    description: 'Our comprehensive research methodology and scientific approach to autonomous discovery.',
    keywords: 'methodology, research approach, scientific method, autonomous discovery',
    sections: [
      {
        type: 'hero',
        title: 'Research Methodology',
        subtitle: 'Our comprehensive approach to autonomous scientific research and discovery.',
        stats: [
          { value: 'Multi-Layer', label: 'Validation' },
          { value: 'Cross-Domain', label: 'Synthesis' },
          { value: 'Peer Review', label: 'Process' },
          { value: 'Continuous', label: 'Improvement' }
        ]
      }
    ]
  },

  // Models Pages
  'models/thesidia': {
    title: 'Thesidia Model',
    description: 'Advanced AI model for theoretical research and scientific hypothesis generation.',
    keywords: 'thesidia, AI model, theoretical research, hypothesis generation',
    sections: [
      {
        type: 'hero',
        title: 'Thesidia Research Model',
        subtitle: 'Advanced AI model specialized in theoretical research and scientific hypothesis generation.',
        stats: [
          { value: '99.7%', label: 'Accuracy' },
          { value: 'Multi-Domain', label: 'Research' },
          { value: 'Real-time', label: 'Processing' },
          { value: 'Continuous', label: 'Learning' }
        ]
      }
    ]
  },

  'models/iceberg': {
    title: 'ICEBERG Model',
    description: 'Our flagship AI model for comprehensive research and development across multiple domains.',
    keywords: 'iceberg model, flagship AI, research, development, multi-domain',
    sections: [
      {
        type: 'hero',
        title: 'ICEBERG Research Model',
        subtitle: 'Autonomous research ecosystem that operates 24/7 without human intervention, generating breakthrough discoveries through self-directed scientific investigation and cross-domain knowledge synthesis.',
        stats: [
          { value: '42+', label: 'Research Papers Generated' },
          { value: '95%', label: 'Contamination Detection' },
          { value: '43+', label: 'Specialized Agents' },
          { value: 'Breakthrough', label: 'Discovery Engine' }
        ]
      },
      {
        type: 'benchmarks',
        title: 'ICEBERG Performance Benchmarks',
        subtitle: 'Comprehensive performance analysis and comparative metrics for the ICEBERG model across different configurations and time periods.',
        sections: [
          {
            title: 'Core Performance Metrics',
            metrics: [
              {
                name: 'Response Time',
                current: '<1ms',
                previous: '2.3ms',
                improvement: '57%',
                trend: 'up',
                description: 'Sub-millisecond response times achieved through optimized HNSW implementation'
              },
              {
                name: 'Throughput',
                current: '18,000+ QPS',
                previous: '8,500 QPS',
                improvement: '112%',
                trend: 'up',
                description: 'Horizontal scaling capabilities with consistent hashing'
              },
              {
                name: 'Memory Efficiency',
                current: '850MB/1M vectors',
                previous: '2.7GB/1M vectors',
                improvement: '68%',
                trend: 'up',
                description: '32x memory reduction using binary quantization'
              },
              {
                name: 'Accuracy',
                current: '97.1%',
                previous: '94.2%',
                improvement: '3.1%',
                trend: 'up',
                description: 'Recall@10 accuracy maintained across optimizations'
              }
            ]
          },
          {
            title: 'System Reliability',
            metrics: [
              {
                name: 'Operational Status',
                current: '95%',
                previous: '87%',
                improvement: '9.2%',
                trend: 'up',
                description: 'High system reliability with automated monitoring'
              },
              {
                name: 'Success Rate',
                current: '100%',
                previous: '98.3%',
                improvement: '1.7%',
                trend: 'up',
                description: 'Perfect test success across all scenarios'
              },
              {
                name: 'Uptime',
                current: '99.9%',
                previous: '99.2%',
                improvement: '0.7%',
                trend: 'up',
                description: 'Enterprise-grade availability with redundancy'
              },
              {
                name: 'Cache Hit Rate',
                current: '85%+',
                previous: '72%',
                improvement: '18%',
                trend: 'up',
                description: 'Intelligent caching with production workloads'
              }
            ]
          },
          {
            title: 'Scalability Metrics',
            metrics: [
              {
                name: 'Concurrent Queries',
                current: '50+',
                previous: '25',
                improvement: '100%',
                trend: 'up',
                description: 'Multi-tenant isolation with per-tenant indexing'
              },
              {
                name: 'Research Agents',
                current: '43+',
                previous: '28',
                improvement: '54%',
                trend: 'up',
                description: 'Specialized agents for cross-domain research'
              },
              {
                name: 'API Integrations',
                current: '21+',
                previous: '12',
                improvement: '75%',
                trend: 'up',
                description: 'Extensive API ecosystem for research capabilities'
              },
              {
                name: 'Contamination Detection',
                current: '95%',
                previous: '89%',
                improvement: '6.7%',
                trend: 'up',
                description: 'Advanced validation and quality assurance'
              }
            ]
          }
        ],
        configurations: [
          {
            name: 'Internal Configuration',
            description: 'Optimized internal hardware with native performance',
            specs: {
              processor: 'Internal CPU',
              memory: 'Internal Memory',
              storage: 'Internal Storage',
              os: 'Internal OS'
            }
          },
          {
            name: 'Previous Generation',
            description: 'Legacy x86 architecture with standard optimizations',
            specs: {
              processor: 'Intel x86-64',
              memory: '32GB DDR4',
              storage: 'NVMe SSD',
              os: 'Linux with standard libraries'
            }
          },
          {
            name: 'Cloud Deployment',
            description: 'Distributed cloud infrastructure with horizontal scaling',
            specs: {
              processor: 'Multi-core cloud instances',
              memory: 'Distributed memory pool',
              storage: 'Cloud storage with CDN',
              os: 'Containerized deployment'
            }
          }
        ]
      }
    ]
  },

  'models/katana': {
    title: 'Katana Model',
    description: 'Specialized AI model for precision research and targeted scientific analysis.',
    keywords: 'katana model, precision research, targeted analysis, specialized AI',
    sections: [
      {
        type: 'hero',
        title: 'Katana Precision Model',
        subtitle: 'Specialized AI model designed for precision research and targeted scientific analysis.',
        stats: [
          { value: '99.8%', label: 'Precision' },
          { value: 'Targeted', label: 'Analysis' },
          { value: 'High-Speed', label: 'Processing' },
          { value: 'Specialized', label: 'Research' }
        ]
      }
    ]
  },

  'models/ice-nano': {
    title: 'Ice-nano Model',
    description: 'Compact AI model optimized for edge computing and distributed research applications.',
    keywords: 'ice-nano, compact AI, edge computing, distributed research',
    sections: [
      {
        type: 'hero',
        title: 'Ice-nano Compact Model',
        subtitle: 'Compact AI model optimized for edge computing and distributed research applications.',
        stats: [
          { value: '99.5%', label: 'Efficiency' },
          { value: 'Edge', label: 'Computing' },
          { value: 'Distributed', label: 'Research' },
          { value: 'Compact', label: 'Design' }
        ]
      }
    ]
  },

  // Transparency Pages
  'transparency/data': {
    title: 'Data Non-Collection Policy',
    description: 'Our commitment to privacy and data protection through non-collection practices.',
    keywords: 'data privacy, non-collection, privacy protection, data security',
    sections: [
      {
        type: 'hero',
        title: 'Data Non-Collection Policy',
        subtitle: 'Our commitment to privacy and data protection through innovative non-collection practices.',
        stats: [
          { value: '0', label: 'Data Collected' },
          { value: '100%', label: 'Privacy Protected' },
          { value: 'GDPR', label: 'Compliant' },
          { value: 'Zero-Risk', label: 'Data Exposure' }
        ]
      }
    ]
  },

  'transparency/scaling': {
    title: 'Scaling Responsibly',
    description: 'Our approach to responsible AI scaling and sustainable growth.',
    keywords: 'responsible AI, scaling, sustainable growth, AI ethics',
    sections: [
      {
        type: 'hero',
        title: 'Scaling Responsibly',
        subtitle: 'Our commitment to responsible AI scaling and sustainable technological growth.',
        stats: [
          { value: 'Sustainable', label: 'Growth' },
          { value: 'Ethical', label: 'AI' },
          { value: 'Responsible', label: 'Scaling' },
          { value: 'Future-Proof', label: 'Technology' }
        ]
      }
    ]
  },

  'transparency/safety': {
    title: 'Safety and Security',
    description: 'Comprehensive safety and security measures for our AI research systems.',
    keywords: 'AI safety, security, research systems, protection',
    sections: [
      {
        type: 'hero',
        title: 'Safety and Security',
        subtitle: 'Comprehensive safety and security measures protecting our AI research systems.',
        stats: [
          { value: 'Multi-Layer', label: 'Security' },
          { value: '99.99%', label: 'Safety Record' },
          { value: 'Continuous', label: 'Monitoring' },
          { value: 'Zero', label: 'Security Breaches' }
        ]
      }
    ]
  },

  'transparency/ethics': {
    title: 'Ethics Framework',
    description: 'Our comprehensive ethics framework for responsible AI development and research.',
    keywords: 'AI ethics, ethics framework, responsible AI, ethical development',
    sections: [
      {
        type: 'hero',
        title: 'Ethics Framework',
        subtitle: 'Our comprehensive framework for ethical AI development and responsible research practices.',
        stats: [
          { value: 'Ethical', label: 'AI Development' },
          { value: 'Responsible', label: 'Research' },
          { value: 'Transparent', label: 'Practices' },
          { value: 'Human-Centric', label: 'Approach' }
        ]
      }
    ]
  },

  // Explore Pages
  'careers': {
    title: 'Careers',
    description: 'Join PRAXIS Labs - Revolutionary research positions for paradigm-challenging minds pushing the boundaries of human potential and scientific discovery.',
    keywords: 'careers, AI research, deep learning, multidisciplinary, paradigm challengers, cultural intelligence, mind-body research',
    sections: [
      {
        type: 'hero',
        title: 'Join the Revolution',
        subtitle: 'We seek paradigm-challenging minds who push physical and intellectual boundaries. If you question everything, see patterns others miss, and refuse to accept conventional limits, you belong here.',
        stats: [
          { value: 'Revolutionary', label: 'Research Positions' },
          { value: 'Paradigm', label: 'Challenging Minds' },
          { value: 'Boundary', label: 'Pushing Culture' },
          { value: 'Multidisciplinary', label: 'Intelligence' }
        ]
      },
      {
        type: 'academic',
        title: 'Revolutionary Research Positions',
        subtitle: 'Seeking paradigm-challenging researchers who bridge ancient wisdom with cutting-edge science',
        positions: [
          {
            title: 'AI Researchers & Deep Learning Specialists',
            department: 'Artificial Intelligence Research',
            level: 'Senior Research Scientist',
            description: 'Revolutionary minds who see beyond current AI limitations and challenge the fundamental assumptions of machine intelligence through cultural intelligence integration and hyper-aware system design.',
            requirements: [
              'Challenge conventional AI paradigms',
              'Push boundaries of machine consciousness',
              'Integrate cultural intelligence into AI systems',
              'Develop breakthrough learning algorithms',
              'Question the nature of artificial intelligence',
              'Bridge human and machine cognition'
            ],
            benefits: [
              'Revolutionary research environment',
              'Cross-disciplinary collaboration',
              'Ancient wisdom integration opportunities',
              'Mind-body boundary pushing support',
              'Cultural intelligence development'
            ]
          },
          {
            title: 'Anthropologists & Archaeologists',
            department: 'Cultural Intelligence Research',
            level: 'Research Anthropologist',
            description: 'Cultural intelligence specialists who understand human evolution, societal patterns, and the deep structures of human consciousness through paradigm-challenging research methods.',
            requirements: [
              'Decode cultural evolution patterns',
              'Understand human consciousness development',
              'Map societal transformation dynamics',
              'Bridge ancient wisdom with modern science',
              'Analyze cultural intelligence systems',
              'Study human potential boundaries'
            ],
            benefits: [
              'Revolutionary archaeological methodologies',
              'Cross-cultural intelligence development',
              'Ancient wisdom research opportunities',
              'Paradigm-challenging research environment',
              'Cultural boundary pushing support'
            ]
          },
          {
            title: 'Physicists & Chemists',
            department: 'Revolutionary Science Research',
            level: 'Senior Research Physicist',
            description: 'Boundary-pushing scientists who question fundamental laws and explore the intersection of consciousness and physical reality through paradigm-challenging research.',
            requirements: [
              'Challenge fundamental physics assumptions',
              'Explore consciousness-physics connections',
              'Investigate bioelectric phenomena',
              'Study quantum-classical interfaces',
              'Push boundaries of material science',
              'Integrate consciousness into physical models'
            ],
            benefits: [
              'Mind-body integration research opportunities',
              'Revolutionary scientific methodologies',
              'Cross-disciplinary collaboration',
              'Ancient wisdom integration',
              'Physical boundary pushing support'
            ]
          },
          {
            title: 'Linguists & Multilingual Specialists',
            department: 'Cultural Communication Research',
            level: 'Research Linguist',
            description: 'Cultural intelligence experts who understand the deep structures of human communication and cross-cultural consciousness through revolutionary language processing.',
            requirements: [
              'Decode linguistic evolution patterns',
              'Map cross-cultural communication systems',
              'Understand consciousness-language connections',
              'Bridge cultural intelligence gaps',
              'Study multilingual cognitive patterns',
              'Develop cultural translation algorithms'
            ],
            benefits: [
              'Revolutionary language processing research',
              'Cultural intelligence development',
              'Cross-cultural communication opportunities',
              'Ancient wisdom integration',
              'Multidisciplinary collaboration'
            ]
          },
          {
            title: 'Multidisciplinary Visionaries',
            department: 'Revolutionary Research Synthesis',
            level: 'Research Director',
            description: 'High-functioning individuals who naturally integrate across domains and see connections others miss through paradigm-challenging approaches.',
            requirements: [
              'Natural cross-domain integration',
              'Hyper-awareness of systemic patterns',
              'Intuitive understanding of complex systems',
              'Ability to bridge disparate fields',
              'Cultural intelligence and sensitivity',
              'Paradigm-challenging mindset'
            ],
            benefits: [
              'Revolutionary research synthesis opportunities',
              'Cross-disciplinary collaboration',
              'Ancient wisdom integration',
              'Cultural intelligence development',
              'Boundary-pushing innovation support'
            ]
          },
          {
            title: 'Mind-Body Integration Specialists',
            department: 'Consciousness Research',
            level: 'Research Specialist',
            description: 'Researchers who understand the deep connections between consciousness, biology, and human potential through revolutionary holistic methodologies.',
            requirements: [
              'Study consciousness-biology interfaces',
              'Investigate human potential boundaries',
              'Research mind-body integration systems',
              'Explore bioelectric consciousness',
              'Develop holistic research methodologies',
              'Bridge ancient wisdom with modern science'
            ],
            benefits: [
              'Revolutionary health research opportunities',
              'Mind-body integration support',
              'Consciousness studies development',
              'Ancient wisdom integration',
              'Physical boundary pushing resources'
            ]
          }
        ]
      },
      {
        type: 'philosophy',
        title: 'The PRAXIS Research Philosophy',
        subtitle: 'Our approach to revolutionary research and paradigm-challenging innovation',
        content: [
          {
            type: 'principle',
            title: 'Paradigm-Challenging Research',
            description: 'We seek researchers who are not afraid to challenge fundamental assumptions and question established paradigms in their fields.',
            details: [
              'Question conventional wisdom',
              'Challenge established methodologies',
              'Push boundaries of knowledge',
              'Integrate ancient wisdom with modern science'
            ]
          },
          {
            type: 'principle',
            title: 'Cultural Intelligence Integration',
            description: 'Our research integrates cultural intelligence, respecting diverse perspectives and bridging ancient wisdom with cutting-edge science.',
            details: [
              'Cross-cultural research methodologies',
              'Ancient wisdom integration',
              'Cultural intelligence development',
              'Hyper-aware research approaches'
            ]
          },
          {
            type: 'principle',
            title: 'Boundary-Pushing Innovation',
            description: 'We push boundaries both intellectually and physically, integrating mind-body research with revolutionary scientific breakthroughs.',
            details: [
              'Intellectual boundary pushing',
              'Physical boundary exploration',
              'Mind-body integration research',
              'Revolutionary breakthrough development'
            ]
          }
        ]
      },
      {
        type: 'application',
        title: 'Revolutionary Research Application',
        subtitle: 'Join our paradigm-challenging research mission',
        description: 'Tell us how you challenge paradigms, what boundaries you push, and how you see the future of human potential. We want to know about your cultural intelligence, multidisciplinary insights, and your vision for revolutionary research.',
        contact: {
          email: 'contact@praxislabs.technology',
          subject: 'Revolutionary Research Proposal - PRAXIS Labs',
          template: 'Dear PRAXIS Team,\n\nI am writing to propose revolutionary research that challenges conventional paradigms and pushes the boundaries of human potential.\n\nMy Background:\n- [Describe your multidisciplinary expertise]\n- [Explain your paradigm-challenging approach]\n- [Detail your cultural intelligence and awareness]\n\nMy Vision:\n- [How you see the future of your field]\n- [What boundaries you want to push]\n- [Your revolutionary research ideas]\n\nWhy PRAXIS:\n- [Why you want to join our revolutionary mission]\n- [How you align with our boundary-pushing culture]\n\nBest regards,\n[Your Name]'
        }
      }
    ]
  },

  // Terms & Policy Pages
  'terms/integrity': {
    title: 'Terms of Integrity',
    description: 'PRAXIS Labs Terms of Integrity - Revolutionary commitment to data sovereignty, AI transparency, and human-centric technology that stands in direct opposition to big tech exploitation.',
    keywords: 'integrity, data sovereignty, AI transparency, human-centric, anti-big tech, revolutionary ethics',
    sections: [
      {
        type: 'hero',
        title: 'Terms of Integrity',
        subtitle: 'Revolutionary commitment to data sovereignty, AI transparency, and human-centric technology. We are the antithesis of big tech exploitation.',
        stats: [
          { value: '100%', label: 'Data Sovereignty' },
          { value: 'Zero', label: 'Surveillance' },
          { value: 'Revolutionary', label: 'Transparency' },
          { value: 'Human-Centric', label: 'AI Ethics' }
        ]
      },
      {
        type: 'manifesto',
        title: 'The PRAXIS Manifesto',
        content: [
          {
            type: 'declaration',
            text: 'We declare our fundamental opposition to the surveillance capitalism model that has corrupted modern technology.'
          },
          {
            type: 'principle',
            title: 'Data Sovereignty',
            text: 'Your data belongs to you. We collect nothing, store nothing, and exploit nothing. Complete user sovereignty over personal information.'
          },
          {
            type: 'principle',
            title: 'AI Transparency',
            text: 'Every AI decision must be explainable, every algorithm must be transparent, every training source must be disclosed. No black boxes.'
          },
          {
            type: 'principle',
            title: 'Human Agency',
            text: 'Technology must enhance human potential, not diminish it. No behavioral manipulation, no attention harvesting, no dependency creation.'
          },
          {
            type: 'principle',
            title: 'Consciousness Respect',
            text: 'We integrate ancient wisdom with cutting-edge science, respecting cultural intelligence and pushing boundaries of human potential.'
          }
        ]
      },
      {
        type: 'comparison',
        title: 'PRAXIS vs Big Tech',
        sections: [
          {
            title: 'Data Practices',
            praxis: 'Zero data collection. Complete user sovereignty. Radical privacy protection.',
            bigtech: 'Massive data harvesting. User as product. Surveillance capitalism.'
          },
          {
            title: 'AI Transparency',
            praxis: 'Open source algorithms. Explainable decisions. Transparent training data.',
            bigtech: 'Black box systems. Hidden manipulation. Proprietary algorithms.'
          },
          {
            title: 'User Relationship',
            praxis: 'Human enhancement. Agency preservation. Consciousness respect.',
            bigtech: 'Attention exploitation. Behavioral manipulation. Dependency creation.'
          },
          {
            title: 'Ethical Framework',
            praxis: 'Paradigm-challenging. Cultural intelligence. Ancient wisdom integration.',
            bigtech: 'Profit maximization. Growth at all costs. Corporate control.'
          }
        ]
      },
      {
        type: 'legal',
        title: 'Legal Framework & Enforcement',
        content: [
          {
            type: 'section',
            title: 'Binding Commitments',
            text: 'These Terms of Integrity are legally binding and enforceable under international law. We maintain comprehensive legal frameworks that protect user rights, ensure AI transparency, and enforce our revolutionary ethical standards.'
          },
          {
            type: 'section',
            title: 'Legal Specialization',
            text: 'Our legal team specializes in technology law, AI ethics, human rights protection, and international data sovereignty regulations. We provide complete legal transparency and user rights protection.'
          },
          {
            type: 'section',
            title: 'Enforcement Mechanisms',
            text: 'Our framework ensures that our revolutionary principles are not just aspirational, but legally enforceable commitments. We stand in direct opposition to big tech legal manipulation and corporate control.'
          }
        ]
      }
    ]
  },

  // Solutions Pages
  'solutions/education': {
    title: 'Education Solutions',
    description: 'Revolutionary learning enhancement through Iceberg AGI - personalized education that respects cultural diversity and individual learning styles.',
    keywords: 'education, learning, AI, cultural intelligence, personalized education, ancient wisdom',
    sections: [
      {
        type: 'hero',
        title: 'Revolutionary Learning Enhancement',
        subtitle: 'Transform education through Iceberg AGI that respects cultural diversity and individual learning styles',
        stats: [
          { value: '100%', label: 'Cultural Respect' },
          { value: 'Personalized', label: 'Learning Paths' },
          { value: 'Ancient', label: 'Wisdom Integration' },
          { value: 'Transparent', label: 'AI Systems' }
        ]
      },
      {
        type: 'partnership',
        title: 'Partnership Approach',
        subtitle: 'Collaborative intelligence that enhances human teaching rather than replacing it',
        approach: {
          philosophy: 'We believe in enhancing human educators through AI that respects cultural boundaries and individual learning styles.',
          benefits: [
            'Personalized learning paths that adapt to each student',
            'Cultural intelligence integration for diverse classrooms',
            'Ancient wisdom synthesis with modern pedagogy',
            'Transparent AI systems that educators can understand and trust',
            'Student data sovereignty and privacy protection',
            'Revolutionary learning outcomes through ethical AI'
          ]
        }
      },
      {
        type: 'capabilities',
        title: 'Revolutionary Education Capabilities',
        capabilities: [
          {
            title: 'Personalized Learning Paths',
            description: 'Iceberg AGI creates adaptive learning experiences that respect individual student needs and cultural backgrounds.',
            features: [
              'Adaptive curriculum that evolves with student progress',
              'Cultural sensitivity in learning material selection',
              'Individual learning style recognition and accommodation',
              'Real-time feedback and adjustment mechanisms'
            ]
          },
          {
            title: 'Cultural Intelligence Integration',
            description: 'Bridge ancient wisdom with modern education through culturally-aware AI systems.',
            features: [
              'Cross-cultural knowledge synthesis',
              'Traditional wisdom integration in modern contexts',
              'Culturally appropriate learning methodologies',
              'Respect for diverse educational traditions'
            ]
          },
          {
            title: 'Transparent AI Mentorship',
            description: 'Students receive AI research assistants that guide them through complex problem-solving with complete transparency.',
            features: [
              'Explainable AI decision-making processes',
              'Student-accessible AI reasoning',
              'Ethical research guidance and methodology',
              'Transparent learning outcome predictions'
            ]
          }
        ]
      },
      {
        type: 'cta',
        title: 'Ready to Transform Education?',
        subtitle: 'Partner with PRAXIS to revolutionize learning through ethical AI',
        description: 'Join us in creating educational experiences that respect cultural diversity, individual learning styles, and ancient wisdom while leveraging cutting-edge AI technology.',
        buttonText: 'Explore Education Partnership',
        buttonLink: 'mailto:contact@praxislabs.technology?subject=Education Partnership Inquiry - PRAXIS Labs&body=Dear PRAXIS Team,%0D%0A%0D%0AI am interested in exploring how PRAXIS can enhance our educational institution through revolutionary AI that respects cultural diversity and individual learning styles.%0D%0A%0D%0AOur Institution:%0D%0A- [Describe your educational institution]%0D%0A- [Explain your current educational challenges]%0D%0A- [Detail your cultural diversity and learning needs]%0D%0A%0D%0AOur Vision:%0D%0A- [How you see AI enhancing education]%0D%0A- [What learning outcomes you want to achieve]%0D%0A- [Your commitment to cultural respect and transparency]%0D%0A%0D%0AWhy PRAXIS:%0D%0A- [Why you want to partner with our revolutionary approach]%0D%0A- [How you align with our ethical AI principles]%0D%0A%0D%0ABest regards,%0D%0A[Your Name]'
      }
    ]
  },

  'solutions/financial': {
    title: 'Financial Services Solutions',
    description: 'Ethical AI financial intelligence through Iceberg AGI - transparent, explainable financial analysis that prioritizes user sovereignty and cultural sensitivity.',
    keywords: 'financial services, AI, ethical finance, transparency, cultural intelligence, user sovereignty',
    sections: [
      {
        type: 'hero',
        title: 'Ethical AI Financial Intelligence',
        subtitle: 'Transform financial services through AI that prioritizes user sovereignty and cultural sensitivity',
        stats: [
          { value: 'Zero', label: 'Data Exploitation' },
          { value: '100%', label: 'Transparency' },
          { value: 'Cultural', label: 'Intelligence' },
          { value: 'User', label: 'Sovereignty' }
        ]
      },
      {
        type: 'partnership',
        title: 'Partnership Approach',
        subtitle: 'Collaborative intelligence that enhances financial decision-making while maintaining complete transparency',
        approach: {
          philosophy: 'We believe in transforming financial services through AI that respects user sovereignty and cultural financial traditions.',
          benefits: [
            'Transparent, explainable financial analysis and recommendations',
            'Cultural intelligence integration for diverse financial needs',
            'Traditional financial wisdom synthesis with modern fintech',
            'Complete user data sovereignty and privacy protection',
            'Ethical risk assessment without surveillance capitalism',
            'Revolutionary financial inclusion through cultural sensitivity'
          ]
        }
      },
      {
        type: 'capabilities',
        title: 'Revolutionary Financial Capabilities',
        capabilities: [
          {
            title: 'Transparent Financial Analysis',
            description: 'Iceberg AGI provides completely transparent and explainable financial analysis that users can understand and trust.',
            features: [
              'Explainable AI decision-making processes',
              'User-accessible financial reasoning and logic',
              'Transparent risk assessment methodologies',
              'Clear financial recommendation explanations'
            ]
          },
          {
            title: 'Cultural Financial Intelligence',
            description: 'Bridge traditional financial wisdom with modern fintech through culturally-aware AI systems.',
            features: [
              'Cross-cultural financial tradition integration',
              'Traditional wisdom synthesis in modern contexts',
              'Culturally appropriate financial advice and guidance',
              'Respect for diverse financial practices and beliefs'
            ]
          },
          {
            title: 'Ethical Risk Assessment',
            description: 'Advanced pattern recognition for ethical financial decision-making without surveillance or data exploitation.',
            features: [
              'Privacy-preserving risk analysis',
              'Ethical financial pattern recognition',
              'User-controlled data and decision processes',
              'Transparent risk assessment criteria'
            ]
          }
        ]
      },
      {
        type: 'cta',
        title: 'Ready to Transform Financial Services?',
        subtitle: 'Partner with PRAXIS to revolutionize finance through ethical AI',
        description: 'Join us in creating financial services that prioritize user sovereignty, cultural sensitivity, and complete transparency while leveraging cutting-edge AI technology.',
        buttonText: 'Explore Financial Partnership',
        buttonLink: 'mailto:contact@praxislabs.technology?subject=Financial Services Partnership Inquiry - PRAXIS Labs&body=Dear PRAXIS Team,%0D%0A%0D%0AI am interested in exploring how PRAXIS can enhance our financial services through revolutionary AI that prioritizes user sovereignty and cultural sensitivity.%0D%0A%0D%0AOur Organization:%0D%0A- [Describe your financial institution]%0D%0A- [Explain your current financial service challenges]%0D%0A- [Detail your commitment to user privacy and transparency]%0D%0A%0D%0AOur Vision:%0D%0A- [How you see AI enhancing financial services]%0D%0A- [What financial outcomes you want to achieve]%0D%0A- [Your commitment to ethical AI and user sovereignty]%0D%0A%0D%0AWhy PRAXIS:%0D%0A- [Why you want to partner with our revolutionary approach]%0D%0A- [How you align with our ethical AI principles]%0D%0A%0D%0ABest regards,%0D%0A[Your Name]'
      }
    ]
  },

  'solutions/government': {
    title: 'Government Solutions',
    description: 'Transparent governance AI through Iceberg AGI - open, explainable AI systems for public sector decision-making that maintains complete transparency.',
    keywords: 'government, public sector, AI, transparency, governance, cultural intelligence, public service',
    sections: [
      {
        type: 'hero',
        title: 'Transparent Governance AI',
        subtitle: 'Enhance government efficiency through AI that maintains complete transparency and cultural respect',
        stats: [
          { value: '100%', label: 'Transparency' },
          { value: 'Open', label: 'AI Systems' },
          { value: 'Cultural', label: 'Respect' },
          { value: 'Public', label: 'Service' }
        ]
      },
      {
        type: 'partnership',
        title: 'Partnership Approach',
        subtitle: 'Collaborative intelligence that enhances public sector decision-making while maintaining complete transparency',
        approach: {
          philosophy: 'We believe in enhancing government efficiency through AI that maintains complete transparency and respects diverse cultural perspectives.',
          benefits: [
            'Open, explainable AI systems for public sector decision-making',
            'Cultural policy integration through diverse perspective synthesis',
            'Transparent governance processes that citizens can understand',
            'Revolutionary public service enhancement through ethical AI',
            'Complete transparency in AI decision-making processes',
            'Cultural intelligence integration in policy development'
          ]
        }
      },
      {
        type: 'capabilities',
        title: 'Revolutionary Government Capabilities',
        capabilities: [
          {
            title: 'Open AI Systems',
            description: 'Iceberg AGI provides completely open and explainable AI systems that citizens and officials can understand and trust.',
            features: [
              'Transparent AI decision-making processes',
              'Publicly accessible AI reasoning and logic',
              'Explainable governance AI systems',
              'Open source AI frameworks for public sector'
            ]
          },
          {
            title: 'Cultural Policy Integration',
            description: 'Bridge diverse cultural perspectives in policy development through ancient wisdom synthesis.',
            features: [
              'Cross-cultural policy perspective integration',
              'Traditional wisdom synthesis in modern governance',
              'Culturally appropriate policy development',
              'Respect for diverse governance traditions'
            ]
          },
          {
            title: 'Revolutionary Public Service',
            description: 'Autonomous systems that enhance citizen services while maintaining complete transparency and cultural respect.',
            features: [
              'Enhanced citizen service delivery',
              'Transparent public service processes',
              'Cultural sensitivity in public service delivery',
              'Ethical AI-powered government efficiency'
            ]
          }
        ]
      },
      {
        type: 'cta',
        title: 'Ready to Transform Government?',
        subtitle: 'Partner with PRAXIS to revolutionize public sector through transparent AI',
        description: 'Join us in creating government services that maintain complete transparency, respect cultural diversity, and enhance public service through ethical AI technology.',
        buttonText: 'Explore Government Partnership',
        buttonLink: 'mailto:contact@praxislabs.technology?subject=Government Partnership Inquiry - PRAXIS Labs&body=Dear PRAXIS Team,%0D%0A%0D%0AI am interested in exploring how PRAXIS can enhance our government services through revolutionary AI that maintains complete transparency and cultural respect.%0D%0A%0D%0AOur Organization:%0D%0A- [Describe your government agency]%0D%0A- [Explain your current public service challenges]%0D%0A- [Detail your commitment to transparency and cultural diversity]%0D%0A%0D%0AOur Vision:%0D%0A- [How you see AI enhancing government services]%0D%0A- [What public service outcomes you want to achieve]%0D%0A- [Your commitment to transparent AI and cultural respect]%0D%0A%0D%0AWhy PRAXIS:%0D%0A- [Why you want to partner with our revolutionary approach]%0D%0A- [How you align with our ethical AI principles]%0D%0A%0D%0ABest regards,%0D%0A[Your Name]'
      }
    ]
  },

  'solutions/community': {
    title: 'Community Solutions',
    description: 'Community intelligence networks through Iceberg AGI - AI that enhances community bonds without surveillance or data exploitation.',
    keywords: 'community, social connection, AI, cultural intelligence, local knowledge, community networks',
    sections: [
      {
        type: 'hero',
        title: 'Community Intelligence Networks',
        subtitle: 'Strengthen communities through AI that respects local culture and enhances human connection',
        stats: [
          { value: 'Zero', label: 'Surveillance' },
          { value: 'Cultural', label: 'Respect' },
          { value: 'Local', label: 'Knowledge' },
          { value: 'Human', label: 'Connection' }
        ]
      },
      {
        type: 'partnership',
        title: 'Partnership Approach',
        subtitle: 'Collaborative intelligence that enhances community bonds while respecting local culture and knowledge',
        approach: {
          philosophy: 'We believe in strengthening communities through AI that respects local culture and enhances human connection without surveillance or data exploitation.',
          benefits: [
            'Local knowledge networks that respect cultural boundaries',
            'Ancient wisdom integration in modern community solutions',
            'Revolutionary social connection enhancement through ethical AI',
            'Community-controlled data and decision processes',
            'Cultural sensitivity in community technology solutions',
            'Transparent AI systems that communities can understand and trust'
          ]
        }
      },
      {
        type: 'capabilities',
        title: 'Revolutionary Community Capabilities',
        capabilities: [
          {
            title: 'Local Knowledge Networks',
            description: 'Iceberg AGI helps build community knowledge networks that respect cultural boundaries and local traditions.',
            features: [
              'Community-controlled knowledge sharing systems',
              'Cultural boundary respect in information sharing',
              'Local tradition integration in modern solutions',
              'Community-driven knowledge network development'
            ]
          },
          {
            title: 'Ancient Wisdom Integration',
            description: 'Bridge traditional community knowledge with modern technology solutions through culturally-aware AI.',
            features: [
              'Traditional wisdom synthesis in modern contexts',
              'Cultural knowledge preservation and integration',
              'Ancient community practices in contemporary solutions',
              'Respect for diverse community traditions and knowledge'
            ]
          },
          {
            title: 'Revolutionary Social Connection',
            description: 'AI that enhances community bonds without surveillance or data exploitation, maintaining human connection at the center.',
            features: [
              'Privacy-preserving social connection enhancement',
              'Community-controlled social networking systems',
              'Cultural sensitivity in social technology solutions',
              'Human-centered AI that enhances rather than replaces connection'
            ]
          }
        ]
      },
      {
        type: 'cta',
        title: 'Ready to Transform Your Community?',
        subtitle: 'Partner with PRAXIS to strengthen communities through ethical AI',
        description: 'Join us in creating community solutions that respect local culture, enhance human connection, and build knowledge networks without surveillance or data exploitation.',
        buttonText: 'Explore Community Partnership',
        buttonLink: 'mailto:contact@praxislabs.technology?subject=Community Partnership Inquiry - PRAXIS Labs&body=Dear PRAXIS Team,%0D%0A%0D%0AI am interested in exploring how PRAXIS can enhance our community through revolutionary AI that respects local culture and enhances human connection.%0D%0A%0D%0AOur Community:%0D%0A- [Describe your community organization]%0D%0A- [Explain your current community challenges]%0D%0A- [Detail your cultural diversity and local knowledge]%0D%0A%0D%0AOur Vision:%0D%0A- [How you see AI enhancing community bonds]%0D%0A- [What community outcomes you want to achieve]%0D%0A- [Your commitment to cultural respect and privacy]%0D%0A%0D%0AWhy PRAXIS:%0D%0A- [Why you want to partner with our revolutionary approach]%0D%0A- [How you align with our ethical AI principles]%0D%0A%0D%0ABest regards,%0D%0A[Your Name]'
      }
    ]
  }
};

// Helper function to get page content
export const getPageContent = (pageKey) => {
  return pageContent[pageKey] || {
    title: 'Page Not Found',
    description: 'The requested page could not be found.',
    keywords: '404, not found, error',
    sections: []
  };
};

// Helper function to get all page keys
export const getAllPageKeys = () => {
  return Object.keys(pageContent);
};

// Helper function to get pages by category
export const getPagesByCategory = (category) => {
  const categoryMap = {
    'product': ['iceberg-overview', 'iceberg-protocol', 'platform', 'enterprise'],
    'research': ['research-index', 'research/publications', 'research/methodology'],
    'models': ['models/thesidia', 'models/iceberg', 'models/katana', 'models/ice-nano'],
    'transparency': ['transparency/data', 'transparency/scaling', 'transparency/safety', 'transparency/ethics']
  };
  
  return categoryMap[category] || [];
};
