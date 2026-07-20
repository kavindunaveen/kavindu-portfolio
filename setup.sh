#!/bin/bash
# ==============================================
# PORTFOLIO SETUP SCRIPT
# Run this once to copy project images into place
# ==============================================
echo "Setting up Kavindu Naveen portfolio assets..."

BRAIN_DIR="/Users/kavindunaveen/.gemini/antigravity-ide/brain/5ef1833c-0e11-49b7-b255-20e8281f789f"
ASSETS_DIR="$(dirname "$0")/assets"

mkdir -p "$ASSETS_DIR"

copy_file() {
  local src="$1"
  local dst="$2"
  if [ -f "$src" ]; then
    cp "$src" "$dst"
    echo "  ✓ Copied $(basename $dst)"
  else
    echo "  ✗ Missing: $src"
  fi
}

copy_file "$BRAIN_DIR/erp_dashboard_mockup_1784527402428.png"  "$ASSETS_DIR/erp-dashboard.png"
copy_file "$BRAIN_DIR/mobile_app_mockup_1784527411756.png"     "$ASSETS_DIR/mobile-app.png"
copy_file "$BRAIN_DIR/rkr_website_mockup_1784527432960.png"    "$ASSETS_DIR/rkr-website.png"
copy_file "$BRAIN_DIR/apura_tours_mockup_1784527442251.png"    "$ASSETS_DIR/apura-tours.png"
copy_file "$BRAIN_DIR/kavindu_profile_avatar_1784527450851.png" "$ASSETS_DIR/profile.png"

echo ""
echo "✅ Done! Open index.html in your browser."
echo ""
echo "📌 TIP: Replace assets/profile.png with your real headshot for best results!"
