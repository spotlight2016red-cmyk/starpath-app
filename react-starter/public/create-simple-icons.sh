#!/bin/bash
# Create simple SVG icons and convert to PNG

# Create 192x192 icon (simple placeholder)
cat > icon-192.svg << 'SVGEOF'
<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" fill="#1a1a2e"/>
  <text x="96" y="120" font-size="80" fill="white" text-anchor="middle">⭐</text>
</svg>
SVGEOF

# Create 512x512 icon
cat > icon-512.svg << 'SVGEOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1a1a2e"/>
  <text x="256" y="320" font-size="240" fill="white" text-anchor="middle">⭐</text>
</svg>
SVGEOF

# Try to convert SVG to PNG using different tools
if command -v rsvg-convert &> /dev/null; then
  rsvg-convert -w 192 -h 192 icon-192.svg -o icon-192.png
  rsvg-convert -w 512 -h 512 icon-512.svg -o icon-512.png
  echo "Icons created using rsvg-convert"
elif command -v inkscape &> /dev/null; then
  inkscape icon-192.svg --export-type=png --export-filename=icon-192.png --export-width=192 --export-height=192
  inkscape icon-512.svg --export-type=png --export-filename=icon-512.png --export-width=512 --export-height=512
  echo "Icons created using Inkscape"
else
  echo "No SVG converter found. Using SVG files as fallback."
fi
