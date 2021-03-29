import React from 'react';
import { Rose } from '@ant-design/charts';
import { Card } from 'antd';

const DemoRose: React.FC = () => {
  var data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  var config = {
    data: data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: { position: 'bottom' },
  };
  return (
    <Card>
      {/* @ts-ignore */}
      <Rose {...config} />
    </Card>
  );
};

export default DemoRose;