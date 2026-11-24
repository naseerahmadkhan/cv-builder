import { Button } from './Button.jsx';
import { Card } from './Card.jsx';
import { Section } from './Section.jsx';

/**
 * A sidebar section that edits a list: one removable card per item plus an
 * "Add" button. Each panel only supplies the fields inside a card.
 *
 * @param {string} title - Section title
 * @param {Array} items - The list being edited
 * @param {string} addLabel - Text of the Add button
 * @param {() => void} onAdd
 * @param {(index: number) => void} onRemove
 * @param {(item: object, index: number) => React.ReactNode} renderFields
 * @param {React.ReactNode} [children] - Extra controls shown above the cards
 */
export function ListSection({ title, items = [], addLabel, onAdd, onRemove, renderFields, children }) {
  return (
    <Section title={title}>
      {children}
      {items.map((item, index) => (
        // Index keys are fine here: inputs are fully controlled by the CV state.
        <Card key={index} onRemove={() => onRemove(index)}>
          {renderFields(item, index)}
        </Card>
      ))}
      <Button onClick={onAdd}>{addLabel}</Button>
    </Section>
  );
}
