import React, { useRef } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

const Graph = (props) => {
  const diagramRef = useRef();
  function initDiagram() {
    const $ = go.GraphObject.make;
    function ContinuousForceDirectedLayout() {
      go.ForceDirectedLayout.call(this);
      this._isObserving = false;
    }
    go.Diagram.inherit(ContinuousForceDirectedLayout, go.ForceDirectedLayout);

    ContinuousForceDirectedLayout.prototype.isFixed = function (v) {
      return v.node.isSelected;
    };

    ContinuousForceDirectedLayout.prototype.doLayout = function (coll) {
      if (!this._isObserving) {
        this._isObserving = true;
        var lay = this;
        this.diagram.addModelChangedListener(function (e) {
          if (
            e.modelChange !== "" ||
            (e.change === go.ChangedEvent.Transaction &&
              e.propertyName === "StartingFirstTransaction")
          ) {
            lay.network = null;
          }
        });
      }
      var net = this.network;
      if (net === null) {
        this.network = net = this.makeNetwork(coll);
      } else {
        this.diagram.nodes.each(function (n) {
          var v = net.findVertex(n);
          if (v !== null) v.bounds = n.actualBounds;
        });
      }
      go.ForceDirectedLayout.prototype.doLayout.call(this, coll);
      this.network = net;
    };
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key",
      }),
      ModelChanged: function (e) {
        if (e.isTransactionFinished) {
          props.saveGraph(e.model.Hc, e.model.bd);
        }
      },
      initialAutoScale: go.Diagram.Uniform,
      contentAlignment: go.Spot.Center,
      layout: $(ContinuousForceDirectedLayout, {
        defaultSpringLength: 30,
        defaultElectricalCharge: 100,
      }),
      SelectionMoved: function (e) {
        e.diagram.layout.invalidateLayout();
      },
    });
    // Node context menu -settings
    function openNodeSettings(e, obj) {
      const node = obj.part.data;
      props.openSlider(node);
    }
    function hideAndShowParents(e, obj) {
      console.log(obj.part.data);
    }
    diagram.nodeTemplate = $(
      go.Node,
      "Vertical",
      $(
        go.Panel,"Auto",
        {
          contextMenu: $(
            "ContextMenu",
            $(
              "ContextMenuButton",
              $(go.TextBlock, { font: "12px" }, "Settings"),
              { click: openNodeSettings }
            ),
            $(
              "ContextMenuButton",
              $(go.TextBlock, { font: "12px" }, "Show/Hide Parents"),
              { click: hideAndShowParents }
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
          { editable: true },
          new go.Binding("text", "text").makeTwoWay(),
          new go.Binding("font", "font")
        ),
  
      ),
      
      $("TreeExpanderButton")
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
  return (
    <ReactDiagram
      ref={diagramRef}
      initDiagram={initDiagram}
      divClassName="diagram-component"
      nodeDataArray={props.nodeDataArray}
      linkDataArray={props.linkDataArray}
    />
  );
};

export default Graph;
