import { useRef } from 'react';
import { MESSAGES, UI, UI_FONT } from '../../constants';
import { downloadJson, readTextFile } from '../../utils';
import { Button } from './Button.jsx';

/**
 * Top of the sidebar: print to PDF, save the CV as JSON, load a JSON file.
 * @param {object} cv - Current CV (what "Save JSON" downloads)
 * @param {(data: object) => void} onLoad - Called with the parsed JSON from a loaded file
 */
export function Toolbar({ cv, onLoad }) {
  const fileInputRef = useRef(null);

  const handleFileChosen = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      onLoad(JSON.parse(await readTextFile(file)));
    } catch {
      alert(MESSAGES.invalidJson);
    }

    // Clear the input so choosing the same file again still triggers onChange.
    event.target.value = '';
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
        <Button variant="primary" onClick={() => window.print()}>
          Export PDF
        </Button>
        <Button onClick={() => downloadJson(cv)}>Save JSON</Button>
        <Button onClick={() => fileInputRef.current.click()}>Load JSON</Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          hidden
          onChange={handleFileChosen}
        />
      </div>
      <p style={{ font: UI_FONT.small, color: UI.helperText, margin: '4px 0 8px' }}>
        {MESSAGES.printHint}
      </p>
    </>
  );
}
