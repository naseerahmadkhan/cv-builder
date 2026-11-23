# CV Builder

A React-based CV/Resume builder with live preview and PDF export. Edit your CV in the sidebar panel and see real-time updates in the preview. Export as PDF or save/load JSON files.

## Features

- **Live preview** - See changes instantly as you edit
- **PDF export** - Print to PDF with A4 formatting
- **JSON persistence** - Save/load CV data as JSON files
- **LocalStorage** - Automatically saves to browser storage
- **Customizable styling** - Fonts, colors, sizes, layout
- **Modular architecture** - Easy to extend with new layouts/components

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── ClassicLayout.jsx    # Print layout (A4, dark header)
│   │   └── index.js
│   ├── editor/
│   │   ├── Field.jsx            # Text/textarea input
│   │   ├── Num.jsx              # Number input
│   │   ├── Color.jsx            # Color picker
│   │   ├── Section.jsx          # Collapsible section
│   │   ├── Card.jsx             # Removable item card
│   │   └── index.js
│   └── index.js
├── data/
│   ├── defaultCV.json           # Default CV content (replace to change defaults)
│   ├── defaultCV.js             # Loads JSON, maps icon strings to ICONS objects
│   ├── icons.js                 # SVG icon definitions
│   ├── fonts.js                 # Font options
│   └── layouts.js               # Layout registry
├── utils/
│   ├── helpers.js               # cleanSvg, merge, linesOf, toLines
│   └── storage.js               # localStorage helpers
├── styles/
│   └── cvBuilder.css            # All styles
├── CVBuilder.jsx                # Main component
├── App.jsx
└── main.jsx
```

## Getting Started

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Customizing Default CV

Replace `src/data/defaultCV.json` with your own exported JSON file. The `defaultCV.js` loader automatically maps icon SVG strings to the internal `ICONS` objects.

## Adding New Layouts

1. Create a new layout component in `src/components/layout/`
2. Register it in `src/data/layouts.js`
3. It will appear in the Layout dropdown automatically

## Custom Sections

After Certifications, you can add unlimited custom sections. Each section supports:
- **Title** - Section heading
- **Content** - Free-form paragraph text
- **Bullets** - Bullet-point list (one per line)

Use the "Add custom section" button in the sidebar to create new sections.

## Tech Stack

- React 19 + Vite 8
- React Compiler (via Babel)
- ESLint + React Hooks + React Refresh plugins