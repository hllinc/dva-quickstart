/**
 * @author hongliang-sensorsdata
 * @date 2021/1/30 12:47 下午
 */
import React, {useEffect} from 'react';
import styles from './index.less';
import {initMap} from "@comp/customFlow/flow";
import {fabric} from 'fabric';

export interface CustomFlowProps {
  height: number,
  width: number,
  data: any
}

const CustomFlow = (cfg: CustomFlowProps) => {
  // 主画布
  let canvas;
  /**
   * 初始化画布及内容
   */
  const createMap = () => {
    console.log('init map start.');
    if (canvas) {
      initMap(null, canvas);
    }
  }
  useEffect(() => {
    if (!canvas) {
      canvas = new fabric.Canvas('flowMap');
      createMap();
    }
  }, []);
  return (
    <canvas className={styles.map} id="flowMap" width={cfg.width+'px'} height={cfg.height+'px'}>
      Can not support canvas.
    </canvas>
  );
};
export default CustomFlow;
