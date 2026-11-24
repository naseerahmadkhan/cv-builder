import { useEffect } from 'react';
import { EditorPanel } from '../components/editor';
import { CVLayout } from '../components/layout';
import { DEFAULT_STYLE } from '../constants';
import { useCV } from '../hooks';
import { mm } from '../utils';
import '../styles/cvBuilder.css';

/**
 * Main screen: editor sidebar on the left, live A4 preview on the right.
 * All CV state lives in the useCV hook; this component only wires the pieces together.
 */
export default function CVBuilder() {
  const { cv, actions } = useCV();

  const pageMarginTop = mm(cv.style.pageMarginTop ?? DEFAULT_STYLE.pageMarginTop);

  // The print stylesheet's @page rule can only read variables set on <html>,
  // so publish the top margin of pages 2+ there rather than on the preview element.
  useEffect(() => {
    document.documentElement.style.setProperty('--cvb-page-margin-top', pageMarginTop);
  }, [pageMarginTop]);

  return (
    <div className="cvb">
      <EditorPanel cv={cv} actions={actions} />

      <main className="cvb-stage">
        <div className="cvb-page">
          <CVLayout cv={cv} />
        </div>
      </main>
    </div>
  );
}
