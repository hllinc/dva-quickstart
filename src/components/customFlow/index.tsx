/**
 * @author hongliang-sensorsdata
 * @date 2021/1/30 12:47 下午
 */
import React, {useEffect} from 'react';
import styles from './index.less';

export interface CustomFlowProps {
  height: number,
  width: number,
  data: any
}

const CustomFlow = (cfg: CustomFlowProps) => {
  // 主画布
  let canvas;
  const initMap = () => {
    console.log('init map start.');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      // ctx.fillStyle = 'rgb(200, 0, 0)';
      // ctx.fillRect(10, 10, 55, 50);
      //
      // // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      // ctx.fillRect (30, 30, 55, 50);
      //
      // ctx.fillRect(25, 25, 100, 100);
      // ctx.clearRect(45, 45, 60, 60);
      // ctx.strokeRect(50, 50, 50, 50);

      // 画三角型
      // ctx.beginPath();
      // ctx.moveTo(75, 50);
      // ctx.lineTo(100, 75);
      // ctx.lineTo(100, 25);
      // ctx.fillStyle = "#aaa";
      // ctx.fill();
      // 绘制节点
      ctx.translate(75,75);

      for (var i=1;i<6;i++){ // Loop through rings (from inside to out)
        ctx.save();
        ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';

        for (var j=0;j<i*6;j++){ // draw individual dots
          ctx.rotate(Math.PI*2/(i*6));
          ctx.beginPath();
          ctx.arc(0,i*12.5,5,0,Math.PI*2,true);
          ctx.fill();
        }

        ctx.restore();
      }
    }
  }
  useEffect(() => {
    if (!canvas) {
      canvas = document.getElementById('flowMap');
      initMap();
    }
  }, []);
  return (
    <canvas className={styles.map} id="flowMap" width={cfg.width+'px'} height={cfg.height+'px'}>
      Can not support canvas.
    </canvas>
  );
};
export default CustomFlow;

