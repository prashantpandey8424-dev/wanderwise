# Figma handoff — WanderWise

This folder contains importable SVG design references for the matching React prototype:
- `WanderWise-Desktop-1440.svg` — desktop landing-page concept, 1440px wide
- `WanderWise-Mobile-390.svg` — mobile landing-page concept, 390px wide

## Import into Figma
1. Open Figma and create a new Design file.
2. Drag an SVG from this folder onto the Figma canvas, or use File → Place image.
3. Repeat for the other screen.
4. If Figma imports the SVG as a single image, right-click and choose **Ungroup** / **Flatten selection** options if available. SVG elements are vector shapes/text, but imported SVG text may need font and layout cleanup to become a fully native, maintainable Figma design.
5. Match the desktop and mobile versions to the React implementation and create any extra component variants you need.

## Design tokens
- Dark green: `#103E39`
- Brand green: `#0F766E`
- Main text: `#173A36`
- Warm background: `#FFFDF9`
- Soft section background: `#F2F5EF`
- Accent: `#E9B780`
- Display font: Georgia / a similar serif
- UI font: Arial / a similar sans-serif
- Corner radius: 6–10px
- Layout: 12-column desktop concept; single-column mobile content

## Important distinction
These are editable/importable SVG design references, not a live Figma cloud file or a native `.fig` document. You can import them into Figma and refine the components there. The React app remains the functional frontend implementation; this handoff keeps the branding and required footer text aligned.
