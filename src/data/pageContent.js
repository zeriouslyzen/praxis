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
    title: 'Terms of Service',
    description: 'PRAXIS Labs Terms of Service - Comprehensive legal framework covering user rights, responsibilities, and our commitment to ethical technology.',
    keywords: 'terms of service, user agreement, legal terms, AI ethics, data sovereignty, user rights',
    sections: [
      {
        type: 'hero',
        title: 'Terms of Service',
        subtitle: 'Last Updated: December 2024',
        stats: [
          { value: '100%', label: 'Transparent' },
          { value: 'Zero', label: 'Data Collection' },
          { value: 'Complete', label: 'User Rights' },
          { value: 'Ethical', label: 'AI Development' }
        ]
      },
      {
        type: 'content',
        title: '1. Acceptance of Terms',
        content: [
          {
            type: 'section',
            title: 'Agreement to Terms',
            text: 'By accessing or using PRAXIS Labs services, you agree to be bound by these Terms of Service and all applicable laws and regulations.'
          },
          {
            type: 'section',
            title: 'Modification of Terms',
            text: 'We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.'
          },
          {
            type: 'section',
            title: 'Eligibility',
            text: 'You must be at least 18 years old to use our services. By using our services, you represent that you meet this requirement.'
          }
        ]
      },
      {
        type: 'content',
        title: '2. Service Description',
        content: [
          {
            type: 'section',
            title: 'What We Provide',
            text: 'PRAXIS Labs provides AI research and development services, including but not limited to:\n• AI algorithm development\n• Research platform access\n• Educational resources\n• Technology consulting services'
          },
          {
            type: 'section',
            title: 'Service Availability',
            text: 'We strive to maintain service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable for maintenance or updates.'
          },
          {
            type: 'section',
            title: 'Service Modifications',
            text: 'We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.'
          }
        ]
      },
      {
        type: 'content',
        title: '3. User Responsibilities',
        content: [
          {
            type: 'section',
            title: 'Acceptable Use',
            text: 'You agree to use our services only for lawful purposes and in accordance with these terms. Prohibited activities include:\n• Violating any applicable laws or regulations\n• Infringing on intellectual property rights\n• Attempting to gain unauthorized access to our systems\n• Using our services for harmful or malicious purposes\n• Interfering with other users\' access to our services'
          },
          {
            type: 'section',
            title: 'Account Security',
            text: 'If you create an account, you are responsible for:\n• Maintaining the confidentiality of your account credentials\n• All activities that occur under your account\n• Notifying us immediately of any unauthorized use\n• Ensuring your account information is accurate and up-to-date'
          },
          {
            type: 'section',
            title: 'Content Responsibility',
            text: 'You are solely responsible for any content you submit, upload, or share through our services. You warrant that you have all necessary rights to such content.'
          }
        ]
      },
      {
        type: 'content',
        title: '4. Intellectual Property',
        content: [
          {
            type: 'section',
            title: 'Our Intellectual Property',
            text: 'All content, trademarks, and intellectual property on our platform are owned by PRAXIS Labs or our licensors. This includes:\n• Software and algorithms\n• Research methodologies\n• Documentation and materials\n• Brand names and logos'
          },
          {
            type: 'section',
            title: 'User Content Rights',
            text: 'You retain ownership of content you create. By using our services, you grant us a limited license to use your content solely for providing our services.'
          },
          {
            type: 'section',
            title: 'Open Source Components',
            text: 'Some of our services may include open source software. Such components are subject to their respective open source licenses.'
          }
        ]
      },
      {
        type: 'content',
        title: '5. Privacy and Data Protection',
        content: [
          {
            type: 'section',
            title: 'Zero Data Collection Policy',
            text: 'PRAXIS Labs practices zero data collection. We do not collect, store, or process personal information unless explicitly required for service functionality.'
          },
          {
            type: 'section',
            title: 'Data Sovereignty',
            text: 'You maintain complete control over any data you choose to provide. We do not claim ownership of your data or use it for purposes beyond service delivery.'
          },
          {
            type: 'section',
            title: 'Privacy Rights',
            text: 'You have the right to:\n• Access any data we may have about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Withdraw consent for data processing\n• Data portability where applicable'
          }
        ]
      },
      {
        type: 'content',
        title: '6. Disclaimers and Limitations',
        content: [
          {
            type: 'section',
            title: 'Service Disclaimers',
            text: 'Our services are provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to:\n• Merchantability and fitness for a particular purpose\n• Non-infringement of third-party rights\n• Accuracy, reliability, or completeness of content\n• Uninterrupted or error-free operation'
          },
          {
            type: 'section',
            title: 'Limitation of Liability',
            text: 'To the maximum extent permitted by law, PRAXIS Labs shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.'
          },
          {
            type: 'section',
            title: 'Maximum Liability',
            text: 'Our total liability to you for any claims arising from these terms or your use of our services shall not exceed the amount you paid us in the 12 months preceding the claim.'
          }
        ]
      },
      {
        type: 'content',
        title: '7. Indemnification',
        content: [
          {
            type: 'section',
            title: 'User Indemnification',
            text: 'You agree to indemnify and hold harmless PRAXIS Labs from any claims, damages, or expenses arising from:\n• Your use of our services\n• Your violation of these terms\n• Your violation of any third-party rights\n• Content you submit or share'
          }
        ]
      },
      {
        type: 'content',
        title: '8. Dispute Resolution',
        content: [
          {
            type: 'section',
            title: 'Governing Law',
            text: 'These terms are governed by the laws of [Jurisdiction], without regard to conflict of law principles.'
          },
          {
            type: 'section',
            title: 'Dispute Resolution Process',
            text: 'Any disputes arising from these terms or your use of our services shall be resolved through:\n• Good faith negotiation (30 days)\n• Mediation if negotiation fails\n• Binding arbitration as a last resort'
          },
          {
            type: 'section',
            title: 'Class Action Waiver',
            text: 'You agree to resolve disputes individually and waive the right to participate in class action lawsuits or class-wide arbitration.'
          }
        ]
      },
      {
        type: 'content',
        title: '9. Termination',
        content: [
          {
            type: 'section',
            title: 'Termination by You',
            text: 'You may terminate your use of our services at any time by discontinuing use and, if applicable, deleting your account.'
          },
          {
            type: 'section',
            title: 'Termination by Us',
            text: 'We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including violation of these terms.'
          },
          {
            type: 'section',
            title: 'Effect of Termination',
            text: 'Upon termination:\n• Your right to use our services ceases immediately\n• We may delete your account and data\n• Provisions that by their nature should survive termination will remain in effect'
          }
        ]
      },
      {
        type: 'content',
        title: '10. General Provisions',
        content: [
          {
            type: 'section',
            title: 'Entire Agreement',
            text: 'These terms constitute the entire agreement between you and PRAXIS Labs regarding your use of our services.'
          },
          {
            type: 'section',
            title: 'Severability',
            text: 'If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect.'
          },
          {
            type: 'section',
            title: 'Contact Information',
            text: 'For questions about these terms, please contact us at:\n• Email: legal@praxislabs.technology\n• Address: [Company Address]\n• Phone: [Contact Number]'
          }
        ]
      }
    ]
  },

  'terms/privacy': {
    title: 'Privacy Policy',
    description: 'PRAXIS Labs Privacy Policy - Comprehensive data protection framework compliant with international privacy laws including GDPR, CCPA, and other global regulations.',
    keywords: 'privacy policy, GDPR, CCPA, data protection, user privacy, international compliance, data sovereignty',
    sections: [
      {
        type: 'hero',
        title: 'Privacy Policy',
        subtitle: 'Last Updated: December 2024 | Compliant with GDPR, CCPA, and International Privacy Laws',
        stats: [
          { value: 'Zero', label: 'Data Collection' },
          { value: '100%', label: 'User Control' },
          { value: 'GDPR', label: 'Compliant' },
          { value: 'CCPA', label: 'Compliant' }
        ]
      },
      {
        type: 'content',
        title: '1. Introduction and Scope',
        content: [
          {
            type: 'section',
            title: 'About This Policy',
            text: 'This Privacy Policy explains how PRAXIS Labs ("we," "our," or "us") handles information when you use our services. We are committed to protecting your privacy and maintaining the highest standards of data protection.'
          },
          {
            type: 'section',
            title: 'Legal Basis',
            text: 'This policy complies with:\n• General Data Protection Regulation (GDPR) - EU\n• California Consumer Privacy Act (CCPA) - California, USA\n• Personal Information Protection and Electronic Documents Act (PIPEDA) - Canada\n• Privacy Act 1988 - Australia\n• Data Protection Act 2018 - UK\n• Other applicable international privacy laws'
          },
          {
            type: 'section',
            title: 'Data Controller',
            text: 'PRAXIS Labs is the data controller for any personal information processed through our services. Contact: privacy@praxislabs.technology'
          }
        ]
      },
      {
        type: 'content',
        title: '2. Information We Do NOT Collect',
        content: [
          {
            type: 'section',
            title: 'Zero Data Collection Policy',
            text: 'PRAXIS Labs practices zero data collection. We do not collect, store, or process:\n• Personal identification information (name, email, address)\n• Browsing history or website interactions\n• Device information or IP addresses\n• Location data or geolocation information\n• Biometric data or behavioral patterns\n• Communication content or metadata\n• Financial information or payment data\n• Any other personal information'
          },
          {
            type: 'section',
            title: 'No Tracking Technologies',
            text: 'We do not use:\n• Cookies or tracking pixels\n• Analytics tools or user behavior monitoring\n• Third-party advertising networks\n• Social media tracking\n• Cross-site tracking technologies\n• Fingerprinting or device identification'
          },
          {
            type: 'section',
            title: 'Local Processing Only',
            text: 'All AI processing and computations occur:\n• Locally on your device\n• In secure, isolated environments\n• Without data transmission to external servers\n• With complete user control over data flow'
          }
        ]
      },
      {
        type: 'content',
        title: '3. Information We May Process (Minimal)',
        content: [
          {
            type: 'section',
            title: 'Essential Service Data',
            text: 'In limited circumstances, we may process minimal data necessary for service functionality:\n• Anonymous usage statistics (no personal identifiers)\n• Technical error logs (no user data)\n• Service performance metrics (aggregated only)\n• Security monitoring data (no personal information)'
          },
          {
            type: 'section',
            title: 'Voluntary Information',
            text: 'If you choose to provide information voluntarily:\n• Contact form submissions (if you initiate contact)\n• Feedback or support requests\n• Newsletter subscriptions (if requested)\n• Account information (if you create an account)'
          },
          {
            type: 'section',
            title: 'Legal Basis for Processing',
            text: 'Any processing is based on:\n• Your explicit consent (GDPR Article 6(1)(a))\n• Legitimate interests (GDPR Article 6(1)(f))\n• Legal obligations (GDPR Article 6(1)(c))\n• Contract performance (GDPR Article 6(1)(b))'
          }
        ]
      },
      {
        type: 'content',
        title: '4. How We Use Information',
        content: [
          {
            type: 'section',
            title: 'Service Provision',
            text: 'Any information we process is used solely for:\n• Providing and improving our services\n• Responding to your inquiries\n• Ensuring service security and functionality\n• Complying with legal obligations'
          },
          {
            type: 'section',
            title: 'No Commercial Use',
            text: 'We do not use your information for:\n• Marketing or advertising purposes\n• Selling to third parties\n• Building user profiles\n• Behavioral analysis or targeting\n• Any commercial exploitation'
          },
          {
            type: 'section',
            title: 'Data Minimization',
            text: 'We follow the principle of data minimization:\n• Collect only what is absolutely necessary\n• Process only for stated purposes\n• Retain only as long as required\n• Delete when no longer needed'
          }
        ]
      },
      {
        type: 'content',
        title: '5. Information Sharing and Disclosure',
        content: [
          {
            type: 'section',
            title: 'No Third-Party Sharing',
            text: 'We do not share, sell, or disclose your information to third parties except:\n• With your explicit consent\n• To comply with legal obligations\n• To protect our rights and safety\n• In case of business transfers (with notice)'
          },
          {
            type: 'section',
            title: 'Service Providers',
            text: 'If we use service providers, they:\n• Are bound by strict confidentiality agreements\n• Process data only for specified purposes\n• Implement appropriate security measures\n• Are prohibited from using data for other purposes'
          },
          {
            type: 'section',
            title: 'Legal Requirements',
            text: 'We may disclose information if required by:\n• Court orders or legal processes\n• Government investigations\n• Law enforcement requests\n• Regulatory compliance requirements'
          }
        ]
      },
      {
        type: 'content',
        title: '6. Your Privacy Rights',
        content: [
          {
            type: 'section',
            title: 'GDPR Rights (EU Residents)',
            text: 'Under GDPR, you have the right to:\n• Access your personal data (Article 15)\n• Rectify inaccurate data (Article 16)\n• Erase your data (Article 17)\n• Restrict processing (Article 18)\n• Data portability (Article 20)\n• Object to processing (Article 21)\n• Withdraw consent at any time (Article 7(3))'
          },
          {
            type: 'section',
            title: 'CCPA Rights (California Residents)',
            text: 'Under CCPA, you have the right to:\n• Know what personal information is collected\n• Know whether personal information is sold or disclosed\n• Say no to the sale of personal information\n• Access your personal information\n• Request deletion of personal information\n• Equal service and price (non-discrimination)'
          },
          {
            type: 'section',
            title: 'How to Exercise Your Rights',
            text: 'To exercise your rights:\n• Email: privacy@praxislabs.technology\n• Include your request details\n• Provide identity verification if required\n• We will respond within 30 days (GDPR) or 45 days (CCPA)'
          }
        ]
      },
      {
        type: 'content',
        title: '7. Data Security',
        content: [
          {
            type: 'section',
            title: 'Security Measures',
            text: 'We implement comprehensive security measures:\n• End-to-end encryption for data transmission\n• Secure data storage with encryption at rest\n• Regular security audits and assessments\n• Access controls and authentication systems\n• Incident response and breach notification procedures'
          },
          {
            type: 'section',
            title: 'Technical Safeguards',
            text: 'Our technical safeguards include:\n• Industry-standard encryption protocols\n• Secure coding practices\n• Regular software updates and patches\n• Network security monitoring\n• Data backup and recovery systems'
          },
          {
            type: 'section',
            title: 'Organizational Safeguards',
            text: 'Our organizational safeguards include:\n• Employee privacy training\n• Confidentiality agreements\n• Access controls and authorization\n• Regular privacy impact assessments\n• Incident response procedures'
          }
        ]
      },
      {
        type: 'content',
        title: '8. Data Retention',
        content: [
          {
            type: 'section',
            title: 'Retention Principles',
            text: 'We retain data only:\n• As long as necessary for stated purposes\n• As required by applicable laws\n• For legitimate business interests\n• With your ongoing consent'
          },
          {
            type: 'section',
            title: 'Retention Periods',
            text: 'Typical retention periods:\n• Service data: Duration of service use\n• Contact information: Until you request deletion\n• Legal compliance data: As required by law\n• Security logs: Maximum 12 months'
          },
          {
            type: 'section',
            title: 'Data Deletion',
            text: 'When data is no longer needed:\n• We securely delete or anonymize it\n• We remove it from all systems\n• We ensure it cannot be recovered\n• We provide confirmation of deletion'
          }
        ]
      },
      {
        type: 'content',
        title: '9. International Data Transfers',
        content: [
          {
            type: 'section',
            title: 'Transfer Safeguards',
            text: 'If we transfer data internationally, we ensure:\n• Adequacy decisions by relevant authorities\n• Standard contractual clauses (SCCs)\n• Binding corporate rules (BCRs)\n• Appropriate safeguards and protections'
          },
          {
            type: 'section',
            title: 'Data Localization',
            text: 'We respect data localization requirements:\n• Process data within required jurisdictions\n• Comply with local data protection laws\n• Implement appropriate safeguards\n• Provide transparency about transfers'
          }
        ]
      },
      {
        type: 'content',
        title: '10. Children\'s Privacy',
        content: [
          {
            type: 'section',
            title: 'Age Restrictions',
            text: 'Our services are not directed to children under 13 (US) or 16 (EU). We do not knowingly collect personal information from children.'
          },
          {
            type: 'section',
            title: 'Parental Rights',
            text: 'If we discover we have collected information from a child:\n• We will delete it immediately\n• We will notify parents if possible\n• We will take appropriate corrective action'
          }
        ]
      },
      {
        type: 'content',
        title: '11. Changes to This Policy',
        content: [
          {
            type: 'section',
            title: 'Policy Updates',
            text: 'We may update this policy to reflect:\n• Changes in our practices\n• Legal or regulatory requirements\n• Technology improvements\n• User feedback and needs'
          },
          {
            type: 'section',
            title: 'Notification of Changes',
            text: 'We will notify you of material changes by:\n• Posting the updated policy on our website\n• Sending email notifications (if applicable)\n• Providing prominent notice of changes\n• Obtaining consent where required'
          }
        ]
      },
      {
        type: 'content',
        title: '12. Contact Information',
        content: [
          {
            type: 'section',
            title: 'Privacy Inquiries',
            text: 'For privacy-related questions or concerns:\n• Email: privacy@praxislabs.technology\n• Data Protection Officer: dpo@praxislabs.technology\n• Address: [Company Address]\n• Phone: [Contact Number]'
          },
          {
            type: 'section',
            title: 'Regulatory Authorities',
            text: 'You have the right to lodge complaints with:\n• EU: Your local data protection authority\n• UK: Information Commissioner\'s Office (ICO)\n• US: Federal Trade Commission (FTC)\n• Canada: Privacy Commissioner of Canada'
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

