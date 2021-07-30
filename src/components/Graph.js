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
    // context menu -settings
    function openSettings(e, obj) {
      const node = obj.part.data;
      props.openSlider(node);
    }
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { selectionObjectName: "text" },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        contextMenu: $(
          "ContextMenu",
          $(
            "ContextMenuButton",
            $(go.TextBlock, { font: "16px" }, "Settings"),
            { click: openSettings }
          )
        ),
      },
      $(
        go.Shape,
        new go.Binding("figure", "shape"),
        {
          stroke: null,
          portId: "",
          cursor: "pointer",
          fromLinkable: true,
          toLinkable: true,
        },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { margin: 6, font: "18px sans-serif", editable: true },
        new go.Binding("text", "text").makeTwoWay()
      )
    );

    diagram.linkTemplate = $(
      go.Link,
      {
        curve: go.Link.Bezier,
        fromShortLength: -2,
        toShortLength: -2,
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
