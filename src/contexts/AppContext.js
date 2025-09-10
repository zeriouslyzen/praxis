import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  theme: {
    isDarkMode: true,
    systemPreference: null,
    userPreference: null
  },
  ui: {
    isLoading: false,
    loadingMessage: '',
    isMenuOpen: false,
    isScrolled: false,
    currentPage: 'home'
  },
  performance: {
    isLowPerformance: false,
    isMobile: false,
    prefersReducedMotion: false,
    connectionSpeed: 'fast'
  },
  errors: {
    hasError: false,
    errorMessage: '',
    errorType: null
  },
  research: {
    papers: [],
    isLoadingPapers: false,
    selectedDomain: null,
    searchQuery: ''
  }
};

// Action types
export const ACTION_TYPES = {
  // Theme actions
  SET_THEME: 'SET_THEME',
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_SYSTEM_PREFERENCE: 'SET_SYSTEM_PREFERENCE',
  
  // UI actions
  SET_LOADING: 'SET_LOADING',
  SET_LOADING_MESSAGE: 'SET_LOADING_MESSAGE',
  TOGGLE_MENU: 'TOGGLE_MENU',
  SET_SCROLLED: 'SET_SCROLLED',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  
  // Performance actions
  SET_PERFORMANCE_MODE: 'SET_PERFORMANCE_MODE',
  SET_MOBILE_MODE: 'SET_MOBILE_MODE',
  SET_REDUCED_MOTION: 'SET_REDUCED_MOTION',
  SET_CONNECTION_SPEED: 'SET_CONNECTION_SPEED',
  
  // Error actions
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Research actions
  SET_RESEARCH_PAPERS: 'SET_RESEARCH_PAPERS',
  SET_LOADING_PAPERS: 'SET_LOADING_PAPERS',
  SET_SELECTED_DOMAIN: 'SET_SELECTED_DOMAIN',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_THEME:
      return {
        ...state,
        theme: {
          ...state.theme,
          isDarkMode: action.payload,
          userPreference: action.payload
        }
      };
      
    case ACTION_TYPES.TOGGLE_THEME:
      const newTheme = !state.theme.isDarkMode;
      return {
        ...state,
        theme: {
          ...state.theme,
          isDarkMode: newTheme,
          userPreference: newTheme
        }
      };
      
    case ACTION_TYPES.SET_SYSTEM_PREFERENCE:
      return {
        ...state,
        theme: {
          ...state.theme,
          systemPreference: action.payload,
          isDarkMode: state.theme.userPreference ?? action.payload
        }
      };
      
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload
        }
      };
      
    case ACTION_TYPES.SET_LOADING_MESSAGE:
      return {
        ...state,
        ui: {
          ...state.ui,
          loadingMessage: action.payload
        }
      };
      
    case ACTION_TYPES.TOGGLE_MENU:
      return {
        ...state,
        ui: {
          ...state.ui,
          isMenuOpen: !state.ui.isMenuOpen
        }
      };
      
    case ACTION_TYPES.SET_SCROLLED:
      return {
        ...state,
        ui: {
          ...state.ui,
          isScrolled: action.payload
        }
      };
      
    case ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        ui: {
          ...state.ui,
          currentPage: action.payload
        }
      };
      
    case ACTION_TYPES.SET_PERFORMANCE_MODE:
      return {
        ...state,
        performance: {
          ...state.performance,
          isLowPerformance: action.payload
        }
      };
      
    case ACTION_TYPES.SET_MOBILE_MODE:
      return {
        ...state,
        performance: {
          ...state.performance,
          isMobile: action.payload
        }
      };
      
    case ACTION_TYPES.SET_REDUCED_MOTION:
      return {
        ...state,
        performance: {
          ...state.performance,
          prefersReducedMotion: action.payload
        }
      };
      
    case ACTION_TYPES.SET_CONNECTION_SPEED:
      return {
        ...state,
        performance: {
          ...state.performance,
          connectionSpeed: action.payload
        }
      };
      
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        errors: {
          hasError: true,
          errorMessage: action.payload.message,
          errorType: action.payload.type
        }
      };
      
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        errors: {
          hasError: false,
          errorMessage: '',
          errorType: null
        }
      };
      
    case ACTION_TYPES.SET_RESEARCH_PAPERS:
      return {
        ...state,
        research: {
          ...state.research,
          papers: action.payload
        }
      };
      
    case ACTION_TYPES.SET_LOADING_PAPERS:
      return {
        ...state,
        research: {
          ...state.research,
          isLoadingPapers: action.payload
        }
      };
      
    case ACTION_TYPES.SET_SELECTED_DOMAIN:
      return {
        ...state,
        research: {
          ...state.research,
          selectedDomain: action.payload
        }
      };
      
    case ACTION_TYPES.SET_SEARCH_QUERY:
      return {
        ...state,
        research: {
          ...state.research,
          searchQuery: action.payload
        }
      };
      
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('praxis-theme');
    if (savedTheme) {
      dispatch({
        type: ACTION_TYPES.SET_THEME,
        payload: JSON.parse(savedTheme)
      });
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('praxis-theme', JSON.stringify(state.theme.isDarkMode));
  }, [state.theme.isDarkMode]);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemPreference = mediaQuery.matches;
    
    dispatch({
      type: ACTION_TYPES.SET_SYSTEM_PREFERENCE,
      payload: systemPreference
    });

    const handleChange = (e) => {
      dispatch({
        type: ACTION_TYPES.SET_SYSTEM_PREFERENCE,
        payload: e.matches
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect performance characteristics
  useEffect(() => {
    const isLowEnd = 
      navigator.hardwareConcurrency <= 2 ||
      navigator.deviceMemory <= 2 ||
      /Android.*Chrome\/[.0-9]* (?!.*Mobile)/.test(navigator.userAgent);
    
    dispatch({
      type: ACTION_TYPES.SET_PERFORMANCE_MODE,
      payload: isLowEnd
    });
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkIsMobile = () => {
      dispatch({
        type: ACTION_TYPES.SET_MOBILE_MODE,
        payload: window.innerWidth < 768
      });
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    dispatch({
      type: ACTION_TYPES.SET_REDUCED_MOTION,
      payload: mediaQuery.matches
    });

    const handleChange = (e) => {
      dispatch({
        type: ACTION_TYPES.SET_REDUCED_MOTION,
        payload: e.matches
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect connection speed
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const speed = connection.effectiveType || 'fast';
      
      dispatch({
        type: ACTION_TYPES.SET_CONNECTION_SPEED,
        payload: speed
      });
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      dispatch({
        type: ACTION_TYPES.SET_SCROLLED,
        payload: window.scrollY > 10
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Context value
  const value = {
    state,
    dispatch,
    actions: {
      // Theme actions
      setTheme: (isDarkMode) => dispatch({ type: ACTION_TYPES.SET_THEME, payload: isDarkMode }),
      toggleTheme: () => dispatch({ type: ACTION_TYPES.TOGGLE_THEME }),
      
      // UI actions
      setLoading: (isLoading) => dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading }),
      setLoadingMessage: (message) => dispatch({ type: ACTION_TYPES.SET_LOADING_MESSAGE, payload: message }),
      toggleMenu: () => dispatch({ type: ACTION_TYPES.TOGGLE_MENU }),
      setCurrentPage: (page) => dispatch({ type: ACTION_TYPES.SET_CURRENT_PAGE, payload: page }),
      
      // Error actions
      setError: (message, type = 'general') => dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { message, type } 
      }),
      clearError: () => dispatch({ type: ACTION_TYPES.CLEAR_ERROR }),
      
      // Research actions
      setResearchPapers: (papers) => dispatch({ type: ACTION_TYPES.SET_RESEARCH_PAPERS, payload: papers }),
      setLoadingPapers: (isLoading) => dispatch({ type: ACTION_TYPES.SET_LOADING_PAPERS, payload: isLoading }),
      setSelectedDomain: (domain) => dispatch({ type: ACTION_TYPES.SET_SELECTED_DOMAIN, payload: domain }),
      setSearchQuery: (query) => dispatch({ type: ACTION_TYPES.SET_SEARCH_QUERY, payload: query })
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Legacy compatibility - keep the old ThemeContext for backward compatibility
export const ThemeContext = createContext();

// Legacy ThemeProvider for backward compatibility
export const LegacyThemeProvider = ({ children }) => {
  const { state, actions } = useApp();
  
  const legacyThemeValue = {
    isDarkMode: state.theme.isDarkMode,
    toggleTheme: actions.toggleTheme
  };

  return (
    <ThemeContext.Provider value={legacyThemeValue}>
      {children}
    </ThemeContext.Provider>
  );
};
