import React from "react";
import GGEditor, { Flow, EditableLabel } from "gg-editor";
import { Card, Row, Col } from "antd";
import FlowToolbar from "../components/EditorToolbar/FlowToolbar";
import FlowContextMenu from "../components/EditorContextMenu/FlowContextMenu";
import FlowItemPanel from "../components/EditorItemPanel/FlowItemPanel";

const data = {
  nodes: [
    {
      id: "0",
      label: "Node",
      x: 50,
      y: 50,
    },
    {
      id: "1",
      label: "Node",
      x: 50,
      y: 200,
    },
  ],
  edges: [
    {
      label: "Label",
      source: "0",
      sourceAnchor: 1,
      target: "1",
      targetAnchor: 0,
    },
  ],
};

const FlowPage = () => {
  return (
    <Card title="FlowEditor" bodyStyle={{ padding: 0 }}>
      <GGEditor>
        <Row>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <FlowItemPanel />
          </Col>
          <Col span={20}>
            <Flow
              className="relative overflow-hidden"
              style={{ height: "600px" }}
              data={data}
            />
            <EditableLabel />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    </Card>
  );
};
export default FlowPage;
