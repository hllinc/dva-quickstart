/**
 * @author hongliang-sensorsdata
 * @date 2021/1/30 12:47 下午
 */
import React from 'react';
import styles from './index.less';
import DagreGraph from "dagre-d3-react";

export interface CustomFlowProps {
  height: number,
  width: number,
  data: any
}

const D3Dagre = (cfg: CustomFlowProps) => {
  return (
    <DagreGraph
      className={styles.map}
      nodes={cfg.data.nodes}
      links={cfg.data.edges}
      options={{
        rankdir: 'LR',
        align: 'UL',
        ranker: 'tight-tree'
      }}
      width='100%'
      height='100%'
      animate={1000}
      shape='rect'
      fitBoundaries
      zoomable
      onNodeClick={e => console.log(e)}
      onRelationshipClick={e => console.log(e)}
    />
  );
};
export default D3Dagre;
