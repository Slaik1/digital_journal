import { CustomHeaderGroupProps } from 'ag-grid-react';
import { useEffect, useState } from 'react';

import './styles.scss';

const HeaderGroup = (props: CustomHeaderGroupProps) => {
  const [expandState, setExpandState] = useState('collapsed');

  const expandOrCollapse = () => {
    const currentState = props.columnGroup
      .getProvidedColumnGroup()
      .isExpanded();

    props.setExpanded(!currentState);
  };

  const syncExpandButtons = () => {
    setExpandState(
      props.columnGroup.getProvidedColumnGroup().isExpanded()
        ? 'expanded'
        : 'collapsed'
    );
  };

  useEffect(() => {
    const providedColumnGroup = props.columnGroup.getProvidedColumnGroup();

    providedColumnGroup.addEventListener('expandedChanged', syncExpandButtons);
    syncExpandButtons();

    return () => {
      providedColumnGroup.removeEventListener(
        'expandedChanged',
        syncExpandButtons
      );
    };
  }, [props.columnGroup]);

  return (
    <div className="ag-header-group-cell-label custom-header-group">
      <div className="customHeaderLabel">{props.displayName}</div>
      <div
        className={`customExpandButton ${expandState}`}
        onClick={expandOrCollapse}
      >
        <i
          className={`fa ${expandState === 'expanded' ? 'fa-arrow-down' : 'fa-arrow-right'}`}
        >
          aaa
        </i>
      </div>
    </div>
  );
};

export default HeaderGroup;
