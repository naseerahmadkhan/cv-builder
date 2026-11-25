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
│   ├── page.js                  # A4 size and pagination constants
│   ├── sections.js              # CV section keys and headings
│   ├── style.js                 # DEFAULT_STYLE, fonts, color presets, certification layouts
│   ├── ui.js                    # Editor sidebar colors, fonts, radii
│   └── index.js
├── data/
│   ├── defaultCV.json           # Default CV content (replace to change defaults)
│   ├── defaultCV.js             # Merges the JSON with DEFAULT_STYLE
│   └── icons.js                 # SVG icon presets
├── hooks/
│   ├── useWorkspace.js          # All CV tabs: state, auto-save, edit + tab helpers
│   └── usePagination.js         # Finds where printed pages break (drives the preview)
├── utils/
│   ├── cv.js                    # mergeWithDefaults, setIn/getIn
│   ├── id.js                    # createId for new tabs
│   ├── file.js                  # JSON download / file reading
│   ├── pagination.js            # Page-break calculation (computePageStarts, paginate)
│   ├── storage.js               # localStorage load/save
│   ├── workspace.js             # Tab/workspace helpers (names, normalizing saved data)
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
│   ├── tabs/
│   │   └── CVTabs.jsx           # CV tab bar (add, rename, duplicate, delete)
│   ├── preview/
│   │   └── PagedPreview.jsx     # On-screen A4 sheets showing the real page breaks
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
  `addItem`, `removeItem` and `removeKey` from `useWorkspace` instead of cloning state themselves.
- **One component per file**, with a short comment saying what it renders.

## Multiple CVs

Each CV is a tab above the preview. Click a tab to open it, double-click it (or use the
pencil on the right) to rename, and use the icons on the right to duplicate or delete the
open CV. `+` adds a new CV from the default template. The sidebar, Save/Load JSON, Reset
and Export PDF all work on the open CV. All tabs are auto-saved in localStorage; a CV saved
by the old single-CV version is moved into the first tab automatically.

## How the page preview works

The preview shows separate A4 sheets so you can see where each printed page ends.
`PagedPreview` renders the CV twice: one continuous hidden copy (this is what the
browser prints, and what gets measured) and the visible sheets, each showing its
slice of the CV. `utils/pagination.js` mirrors the browser's print rules: pages 2+
have the smaller top margin, blocks marked `cvb-avoid-break` are never split,
headings stay with the content after them, and `cvb-page-break-before` forces a new page.

Keep `PAGE` in `constants/page.js` in sync with `--cvb-page-width/height` in the CSS.

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