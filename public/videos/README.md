# Video Assets Directory

This directory contains video assets for the PRAXIS platform.

## Drone Video Assets

To add drone video backgrounds:

1. **Recommended video specifications:**
   - Format: MP4 (H.264 codec)
   - Resolution: 1920x1080 (Full HD) or higher
   - Duration: 10-30 seconds (will loop)
   - File size: Keep under 10MB for web performance
   - Frame rate: 24-30 fps

2. **Naming convention:**
   - `drone-hero-bg.mp4` - Main hero background
   - `drone-section-bg.mp4` - Section backgrounds
   - `drone-overlay.mp4` - Overlay effects

3. **Content suggestions:**
   - Aerial cityscapes
   - Technology campuses
   - Research facilities
   - Abstract geometric patterns
   - Futuristic landscapes

## Usage

Videos are automatically optimized and served from the public directory.
Access them in components using: `/videos/filename.mp4`

## Performance Notes

- Videos are set to autoplay, loop, and be muted for web compatibility
- Overlay effects are applied to ensure text readability
- Videos are positioned behind all other visual elements
