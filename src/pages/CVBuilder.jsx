import { useEffect } from 'react';
import { EditorPanel } from '../components/editor';
import { PagedPreview } from '../components/preview';
import { CVTabs } from '../components/tabs';
import { DEFAULT_STYLE } from '../constants';
import { useWorkspace } from '../hooks';
import { mm } from '../utils';
import '../styles/cvBuilder.css';

/**
 * Main screen: editor sidebar on the left; on the right, CV tabs above the
 * live A4 preview. The sidebar and preview always show the active tab's CV.
 * All state lives in the useWorkspace hook; this component only wires the pieces together.
 */
export default function CVBuilder() {
  const { cv, actions, tabs, activeId, tabActions } = useWorkspace();

  const pageMarginTop = mm(cv.style.pageMarginTop ?? DEFAULT_STYLE.pageMarginTop);

  // The print stylesheet's @page rule can only read variables set on <html>,
  // so publish the top margin of pages 2+ there rather than on the preview element.
  useEffect(() => {
    document.documentElement.style.setProperty('--cvb-page-margin-top', pageMarginTop);
  }, [pageMarginTop]);

  return (
    <div className="cvb">
      <EditorPanel cv={cv} actions={actions} />

      <main className="cvb-main">
        <CVTabs tabs={tabs} activeId={activeId} actions={tabActions} />

        <div className="cvb-stage">
          {/* key: start pagination fresh when switching CVs so old page breaks never linger. */}
          <PagedPreview key={activeId} cv={cv} />
        </div>
      </main>
    </div>
  );
}
