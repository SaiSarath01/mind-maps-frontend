import React, { useRef } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

const Graph = (props) => {
  const diagramRef = useRef();
  function initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key",
      }),
    });

    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { selectionObjectName: "TEXT" },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        "Circle",
        // don't draw any outline
        {
          stroke: null,
          portId: "",
          cursor: "pointer",
          fromLinkable: true,
          fromLinkableSelfNode: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableSelfNode: false,
          toLinkableDuplicates: false,
        },
        // the Shape.fill comes from the Node.data.color property
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        // leave some space around larger-than-normal text
        { margin: 6, font: "18px sans-serif", editable: true, },
        // the TextBlock.text comes from the Node.data.key property
        new go.Binding("text")
      )
    );
    diagram.linkTemplate = $(
      go.Link,
      {
        toShortLength: 2,
        selectable: true,
        relinkableFrom: true,
        relinkableTo: true,
      },
      $(go.Shape, { strokeWidth: 2 }),
      $(go.Shape, { toArrow: "Standard", stroke: "black" })
    );
    return diagram;
  }
  function handleModelChange(changes) {
    props.handleModelChange(changes);
  }

  return (
    <ReactDiagram
      ref={diagramRef}
      initDiagram={initDiagram}
      divClassName="diagram-component"
      nodeDataArray={props.nodeDataArray}
      linkDataArray={props.linkDataArray}
      onModelChange={handleModelChange}
    />
  );
};

export default Graph;
