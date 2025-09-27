# Drone Video Integration Guide

## Overview

The PRAXIS platform now supports drone video backgrounds in the hero section while maintaining all existing visual effects including Matrix rain, neural networks, and floating code elements.

## Implementation Details

### Z-Index Layering (Bottom to Top)
1. **Video Background** (z-index: -3) - Drone footage
2. **Video Overlay** (z-index: -2) - Dark/light mode overlay
3. **Matrix Rain** (z-index: -1) - Code rain effect
4. **Neural Network** (z-index: 0) - Network visualization
5. **Floating Code** (z-index: 0) - Floating elements
6. **Grid Background** (z-index: 0) - Grid pattern
7. **Content** (z-index: 10) - Text and UI elements

### Video Specifications

**Recommended Settings:**
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD) minimum
- **Duration**: 10-30 seconds (seamless loop)
- **File Size**: Under 10MB for web performance
- **Frame Rate**: 24-30 fps
- **Aspect Ratio**: 16:9 (landscape)

**Content Suggestions:**
- Aerial cityscapes
- Technology campuses
- Research facilities
- Abstract geometric patterns
- Futuristic landscapes
- Drone footage of modern architecture

## Adding Your Drone Video

### Step 1: Prepare Your Video
1. Export your drone footage as MP4
2. Optimize for web (compress if needed)
3. Ensure smooth looping (fade in/out edges)

### Step 2: Add to Project
1. Place your video file in: `public/videos/drone-hero-bg.mp4`
2. Replace the placeholder.txt file
3. The video will automatically load on the next page refresh

### Step 3: Customize Settings (Optional)
Edit the VideoBackground component in `src/App.js`:

```jsx
<VideoBackground 
    videoSrc="/videos/drone-hero-bg.mp4" 
    opacity={0.4}  // Adjust video transparency (0.1-0.8)
    overlay={true} // Enable/disable overlay
    overlayColor={isDarkMode ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.3)"}
/>
```

## Performance Optimization

### Video Optimization Tips:
1. **Compress videos** using tools like HandBrake or FFmpeg
2. **Use H.264 codec** for maximum browser compatibility
3. **Keep file sizes small** (under 10MB recommended)
4. **Test on mobile devices** for performance

### Browser Compatibility:
- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support)
- ✅ Mobile browsers (with autoplay restrictions)

## Alternative Video Sources

If you don't have drone footage:

### Free Stock Video Sites:
- **Unsplash Videos**: https://unsplash.com/videos
- **Pexels Videos**: https://www.pexels.com/videos/
- **Pixabay Videos**: https://pixabay.com/videos/
- **Coverr**: https://coverr.co/

### Search Terms for Tech Videos:
- "aerial cityscape"
- "technology campus"
- "futuristic building"
- "drone footage"
- "abstract technology"
- "research facility"

## Testing Your Implementation

1. **Start the development server**: `npm start`
2. **Navigate to**: `http://localhost:3000`
3. **Check the hero section** for video background
4. **Verify all effects are visible** (Matrix rain, neural network, etc.)
5. **Test theme switching** (dark/light mode)
6. **Test on mobile devices**

## Troubleshooting

### Video Not Playing:
- Check file path: `/videos/drone-hero-bg.mp4`
- Verify file format is MP4
- Check browser console for errors
- Ensure video is not corrupted

### Performance Issues:
- Reduce video file size
- Lower video resolution
- Decrease opacity setting
- Check network connection

### Visual Issues:
- Adjust overlay opacity
- Modify video opacity
- Check z-index layering
- Verify theme colors

## Current Status

✅ **VideoBackground component created**
✅ **Hero section updated with video support**
✅ **Proper z-index layering implemented**
✅ **Theme-aware overlays configured**
✅ **Performance optimizations included**
✅ **Browser compatibility ensured**

**Next Step**: Add your `drone-hero-bg.mp4` file to the `public/videos/` directory to see the video background in action!
