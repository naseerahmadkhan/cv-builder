import { useEffect } from 'react';
import { EditorPanel } from '../components/editor';
import { PagedPreview } from '../components/preview';
import { DEFAULT_STYLE } from '../constants';
import { useCV } from '../hooks';
import { mm } from '../utils';
import '../styles/cvBuilder.css';

/**
 * Main screen: editor sidebar on the left, live A4 preview on the right.
 * All CV state lives in the useCV hook; this component only wires the pieces together.
 */
export default function CVBuilder() {
  const { cv, tabs, activeIndex, actions } = useCV();

  const pageMarginTop = mm(cv.style.pageMarginTop ?? DEFAULT_STYLE.pageMarginTop);

  useEffect(() => {
    document.documentElement.style.setProperty('--cvb-page-margin-top', pageMarginTop);
  }, [pageMarginTop]);

  return (
    <div className="cvb">
      <EditorPanel cv={cv} tabs={tabs} activeIndex={activeIndex} actions={actions} />

      <main className="cvb-stage">
        <PagedPreview cv={cv} />
      </main>
    </div>
  );
}
