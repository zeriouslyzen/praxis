# PRAXIS UX Testing Guide
# Comprehensive guide for testing the PRAXIS platform across devices and browsers

## 🚀 Quick Start

### 1. Start Development Server
```bash
npm start
```

### 2. Run Basic Tests
```bash
# Mobile testing
./test-setup.sh

# Desktop testing
./desktop-test.sh

# Quick mobile test
./test-setup.sh 1

# Quick desktop test
./desktop-test.sh quick
```

## 📱 Mobile Testing

### Supported Mobile Devices
- iPhone SE (375x667)
- iPhone 12/13 (390x844)
- iPhone 14 Pro Max (430x932)
- Samsung Galaxy S21 (360x800)
- Google Pixel 6 (412x915)
- iPad (768x1024)
- iPad Pro 12.9" (1024x1366)

### Mobile Testing Features
- ✅ Touch target validation (44px minimum)
- ✅ Responsive breakpoint testing
- ✅ Mobile gesture support
- ✅ Viewport meta tag validation
- ✅ Mobile-first CSS testing
- ✅ Offline mode testing

### Running Mobile Tests
```bash
# Interactive mobile testing
./test-setup.sh

# Test specific mobile device
./test-setup.sh 1  # iPhone 12 Pro

# Run all mobile tests
./test-setup.sh 5
```

## 🖥️ Desktop Testing

### Supported Desktop Configurations
- Full HD (1920x1080)
- Quad HD (2560x1440)
- 4K UHD (3840x2160)
- Ultra-wide (3440x1440)
- Ultra-wide 5K (5120x1440)
- MacBook Pro 16" (1728x1117)
- iMac 27" (2560x1440)

### Desktop Testing Features
- ✅ Cross-browser compatibility
- ✅ Responsive design validation
- ✅ Performance benchmarking
- ✅ Accessibility testing
- ✅ Print stylesheet testing

### Running Desktop Tests
```bash
# Interactive desktop testing
./desktop-test.sh

# Test specific configuration
./desktop-test.sh 1  # Full HD

# Run full desktop test suite
./desktop-test.sh 7
```

## 🔧 Testing Utilities

### CSS Testing Classes
Add these classes to your HTML for visual testing:

```html
<!-- Mobile-first testing -->
<div class="test-mobile-first">
  <button class="test-touch-target">Test Button</button>
  <div class="test-breakpoint-md">Tablet+ view</div>
</div>

<!-- Viewport indicator -->
<div class="test-viewport-indicator" data-viewport="1920x1080"></div>

<!-- Grid overlay for alignment testing -->
<div class="test-grid-overlay active"></div>
```

### JavaScript Testing Helpers
```javascript
// Enable testing utilities
document.body.classList.add('test-mobile-first');

// Add viewport indicator
const indicator = document.createElement('div');
indicator.className = 'test-viewport-indicator';
indicator.setAttribute('data-viewport', `${window.innerWidth}x${window.innerHeight}`);
document.body.appendChild(indicator);

// Performance monitoring
const monitor = document.createElement('div');
monitor.className = 'test-performance-monitor';
monitor.setAttribute('data-fps', '60');
monitor.setAttribute('data-memory', '45MB');
document.body.appendChild(monitor);
```

## 📊 Performance Testing

### Lighthouse Testing
```bash
# Run performance tests
./desktop-test.sh performance

# Or use lighthouse directly
lighthouse http://localhost:3000 --output=json --output-path=./report.json
```

### Performance Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 300ms

## ♿ Accessibility Testing

### Automated Testing
```bash
# Run accessibility tests
./desktop-test.sh accessibility

# Or use axe directly
axe http://localhost:3000 --exit
```

### Manual Testing Checklist
- [ ] Color contrast ratios meet WCAG standards
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility
- [ ] Focus management is proper
- [ ] Alt text is descriptive
- [ ] Semantic HTML is used correctly

## 🌐 Cross-Browser Testing

### Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Browser-Specific Testing
```bash
# Test specific browser
./desktop-test.sh 6  # Browser compatibility test
```

## 📐 Responsive Design Testing

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1440px
- Large Desktop: > 1440px

### Testing Responsive Design
```bash
# Check all breakpoints
./desktop-test.sh 5

# Test specific breakpoint
curl -s http://localhost:3000 | grep -E "(sm:|md:|lg:|xl:)"
```

## 🛠️ Advanced Testing

### Network Throttling
```bash
# Slow 3G
chrome --new-window --window-size=1920,1080 --enable-features=NetworkService,NetworkServiceInProcess http://localhost:3000

# Offline mode
chrome --new-window --window-size=1920,1080 --offline http://localhost:3000
```

### Device Emulation
```bash
# iPhone emulation in Chrome
chrome --new-window --window-size=390,844 --user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15" http://localhost:3000

# iPad emulation
chrome --new-window --window-size=768,1024 --user-agent="Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15" http://localhost:3000
```

## 📋 Testing Checklist

### Pre-Launch Checklist
- [ ] All mobile devices tested
- [ ] All desktop configurations tested
- [ ] Cross-browser compatibility verified
- [ ] Accessibility standards met
- [ ] Performance benchmarks passed
- [ ] Responsive design working
- [ ] Touch targets adequate
- [ ] Loading states implemented
- [ ] Error handling tested
- [ ] Offline functionality tested

### UX Testing Checklist
- [ ] Navigation is intuitive
- [ ] Visual hierarchy is clear
- [ ] Interactive elements provide feedback
- [ ] Loading states are informative
- [ ] Error messages are helpful
- [ ] Mobile gestures work properly
- [ ] Keyboard navigation is complete
- [ ] Screen reader compatibility
- [ ] High contrast mode support
- [ ] Reduced motion preferences respected

## 🚨 Troubleshooting

### Common Issues
1. **Development server not running**
   ```bash
   npm start
   ```

2. **Browser not opening**
   - Check if browser is installed
   - Try running with sudo (Linux/Mac)

3. **Tests failing**
   - Check network connectivity
   - Verify server is running on port 3000
   - Check browser compatibility

4. **Performance issues**
   - Clear browser cache
   - Check network throttling
   - Monitor console for errors

### Getting Help
- Check browser developer console for errors
- Review network tab for failed requests
- Use React DevTools for component inspection
- Check Lighthouse reports for detailed analysis

## 📈 Monitoring & Analytics

### Performance Monitoring
```javascript
// Add to your main component
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    // Performance monitoring code here
    console.log('Performance metrics:', performance.getEntriesByType('navigation'));
  }
}, []);
```

### Error Tracking
```javascript
// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error tracking service
});
```

---

**Happy Testing! 🎉**

For more information, check the individual test scripts and configuration files in this directory.
