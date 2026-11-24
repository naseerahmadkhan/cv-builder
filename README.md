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
├── constants/                   # Every hard-coded value lives here
│   ├── app.js                   # Storage key, export settings, user-facing messages
│   ├── editor.js                # Style-control config, textarea sizes, "add item" templates
│   ├── layout.js                # Measurements for the printed Classic layout
│   ├── sections.js              # CV section keys and headings
│   ├── style.js                 # DEFAULT_STYLE, fonts, color presets, certification layouts
│   ├── ui.js                    # Editor sidebar colors, fonts, radii
│   └── index.js
├── data/
│   ├── defaultCV.json           # Default CV content (replace to change defaults)
│   ├── defaultCV.js             # Merges the JSON with DEFAULT_STYLE
│   └── icons.js                 # SVG icon presets
├── hooks/
│   └── useCV.js                 # CV state, auto-save and edit helpers
├── utils/
│   ├── cv.js                    # mergeWithDefaults, setIn/getIn
│   ├── file.js                  # JSON download / file reading
│   ├── storage.js               # localStorage load/save
│   ├── svg.js                   # cleanSvg (sanitizes pasted icons)
│   ├── text.js                  # linesOf / toLines
│   └── units.js                 # pt() / mm()
├── components/
│   ├── common/                  # SvgIcon, Html, HtmlLines
│   ├── editor/                  # Sidebar
│   │   ├── panels/              # One file per sidebar section (Style, Header, Skills...)
│   │   ├── EditorPanel.jsx      # Assembles toolbar + panels
│   │   ├── Toolbar.jsx          # Export PDF / Save JSON / Load JSON
│   │   ├── ListSection.jsx      # Reusable "list of cards + Add button" section
│   │   ├── Field, NumberField, ColorField, SelectField, CheckboxField, IconPicker
│   │   ├── Button, Card, Section
│   │   └── styles.js            # Shared input/button styles
│   └── layout/                  # Printed CV
│       ├── classic/             # One component per CV section
│       ├── ClassicLayout.jsx    # Assembles the Classic layout
│       ├── CVLayout.jsx         # Picks a layout from cv.layout
│       └── layouts.js           # Layout registry
├── pages/
│   └── CVBuilder.jsx            # Editor + live preview
├── styles/
│   └── cvBuilder.css            # Fonts, app shell, print rules
├── App.jsx
└── main.jsx
```

### Conventions

- **Constants first.** Colors, sizes, spacing, storage keys, option lists and
  user-facing messages go in `src/constants/`; components import them.
  Labels that belong to a single input stay next to that input.
- **Edit by path.** Panels call `actions.setValue(['experience', 0, 'title'], value)`,
  `addItem`, `removeItem` and `removeKey` from `useCV` instead of cloning state themselves.
- **One component per file**, with a short comment saying what it renders.

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

Replace `src/data/defaultCV.json` with your own exported JSON file. Any style keys missing from it are filled in from `DEFAULT_STYLE` in `src/constants/style.js`.

## Adding New Layouts

1. Create a new layout component in `src/components/layout/`
2. Register it in `src/components/layout/layouts.js`
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