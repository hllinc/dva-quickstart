/**
 * @author hongliang-sensorsdata
 * @date 2021/2/3 8:00 下午
 */
import React, {useEffect} from 'react';
import {initMap} from "@comp/sdFlow/flow";
import styles from './index.less';
import {fabric} from 'fabric';

export interface CustomFlowProps {
  height: number,
  width: number,
  data: any
}

const SDFlowComponent = (cfg: CustomFlowProps) => {
  // 主画布
  let canvas;
  /**
   * 初始化画布及内容
   */
  const createMap = () => {
    console.log('init map start.');
    if (canvas) {
      initMap(cfg.data, canvas);
    }
  }
  useEffect(() => {
    if (!canvas) {
      canvas = new fabric.Canvas('map');
      createMap();
    }
  }, []);
  return (
    <React.Fragment>
      <canvas id="map" height={cfg.height} width={cfg.width} className={styles.map}></canvas>
    </React.Fragment>
  );
};
export default SDFlowComponent;
