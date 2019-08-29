import { Component, OnInit, } from '@angular/core';
import * as go from "gojs";
import { FormBuilder, FormGroup } from '@angular/forms';
var myDiagram;
var updatedData;
@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})

export class DraggableComponent implements OnInit {
  myPalette;
  data = JSON.stringify({
    "class": "go.GraphLinksModel",
    "linkFromPortIdProperty": "fromPort",
    "linkToPortIdProperty": "toPort",
    "nodeDataArray": [
    ],
    "linkDataArray": [
    ]
  });
  dataForm: FormGroup;
  constructor(private fb: FormBuilder) { }



  ngOnInit() {

    this.dataForm = this.fb.group({
      drawingData: [this.data]
    });
    // if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    

    myDiagram =
      $(go.Diagram, 'myDiagramDiv',  // must name or refer to the DIV HTML element
        {
          grid: $(go.Panel, "Grid",
            $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
            $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
          ),
          "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.portGravity": 20,
          "relinkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.portGravity": 20,
          "relinkingTool.fromHandleArchetype":
            $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
          "relinkingTool.toHandleArchetype":
            $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
          "linkReshapingTool.handleArchetype":
            $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
          "rotatingTool.handleAngle": 270,
          "rotatingTool.handleDistance": 30,
          "rotatingTool.snapAngleMultiple": 15,
          "rotatingTool.snapAngleEpsilon": 15,
          "undoManager.isEnabled": true
        });

    go.Shape.defineFigureGenerator("Heart", function (shape, w, h) {
      return new go.Geometry()
        .add(new go.PathFigure(.5 * w, h, true)
          .add(new go.PathSegment(go.PathSegment.Bezier, 0, .3 * h, .1 * w, .8 * h, 0, .5 * h))
          .add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .3 * h, 0, 0, .45 * w, 0))
          .add(new go.PathSegment(go.PathSegment.Bezier, w, .3 * h, .55 * w, 0, w, 0))
          .add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, h, w, .5 * h, .9 * w, .8 * h).close()))
        .setSpots(.14, .29, .86, .78);
    });
    //----------------------------------------------------------------------------------------------------------------

    var gearStr =
      'M307.2 778.24q61.44-143.36 133.12-266.24 61.44-122.88 143.36-235.52 81.92-122.88 133.12-174.080 30.72-40.96 61.44-61.44 10.24-10.24 51.2-20.48 81.92-10.24 122.88-10.24 10.24 0 10.24 10.24t-10.24 20.48q-133.12 112.64-276.48 337.92-143.36 215.040-245.76 450.56-40.96 92.16-51.2 112.64t-92.16 20.48q-51.2 0-61.44-10.24t-51.2-61.44q-51.2-81.92-122.88-153.6-30.72-40.96-30.72-61.44t40.96-51.2q30.72-20.48 61.44-20.48t81.92 30.72q51.2 40.96 102.4 143.36z';
    var gearGeo = go.Geometry.parse(gearStr);
    gearGeo.normalize();

    go.Shape.defineFigureGenerator("BpmnTaskService", function (shape, w, h) {
      var geo = gearGeo.copy();
      // calculate how much to scale the Geometry so that it fits in w x h
      var bounds = geo.bounds;
      var scale = Math.min(w / bounds.width, h / bounds.height);
      geo.scale(scale, scale);
      // text should go in the hand
      geo.spot1 = new go.Spot(0, 0.6, 10, 0);
      geo.spot2 = new go.Spot(1, 1);
      return geo;
    });

    var gearStr1 =
    `"M42.036 435.168h939.526v450.704h-939.526v-450.704z",
    "M43.060 477.2h938.494v60.764h-938.494v-60.764z",
    "M43.060 702.212h938.494v60.764h-938.494v-60.764z",
    "M703.968 124.79c-38-10.76-78.614-7.262-114.322 9.608 0 0-528.502 247.028-563.972 262.030-15.412 6.52-26.128 21.968-25.658 39.86 0.602 22.944 20.092 40.906 43.046 40.906h874.502c17.898 0 32.394 14.51 32.394 32.408v76.462c0 17.898-14.51 32.408-32.408 32.408h-875.514c-23.216 0.004-42.036 18.824-42.036 42.040v0c0 23.216 18.82 42.036 42.036 42.036h875.514c17.898 0 32.408 14.51 32.408 32.408v76.462c0 17.898-14.51 32.408-32.408 32.408h-875.514c-23.216 0-42.036 18.82-42.036 42.036v0c0 23.216 18.82 42.036 42.036 42.036h920.022c34.21 0 61.942-27.732 61.942-61.942v-388.756c0-231.852-211.010-321.542-320.032-352.41z",
    "M703.968 124.79c-21.284-6.026-43.388-7.574-64.99-4.81 7.994 1.014 15.946 2.592 23.782 4.81 109.022 30.868 320.032 120.558 320.032 352.408v388.756c0 34.21-27.732 61.942-61.942 61.942h41.208c34.21 0 61.942-27.732 61.942-61.942v-388.754c0-231.852-211.010-321.542-320.032-352.41z",
    "M569.078 305.942c-0.954 0-1.922-0.088-2.892-0.272-8.38-1.588-13.89-9.666-12.31-18.046 0.122-0.658 6.412-35.442 0.414-72.978-7.55-47.256-30.514-76.958-68.252-88.284-8.176-2.452-12.814-11.068-10.36-19.242s11.068-12.814 19.242-10.36c49.614 14.888 80.742 54.262 90.024 113.862 6.676 42.882-0.396 81.132-0.7 82.74-1.406 7.412-7.888 12.58-15.166 12.58z",
    "M646.616 290.488c0 42.837-34.727 77.564-77.564 77.564s-77.564-34.727-77.564-77.564c0-42.837 34.727-77.564 77.564-77.564s77.564 34.727 77.564 77.564z"`;
    var gearGeo1 = go.Geometry.parse(gearStr1);
    gearGeo1.normalize();

    go.Shape.defineFigureGenerator("BpmnTaskService1", function (shape, w, h) {
      var geo = gearGeo1.copy();
      // calculate how much to scale the Geometry so that it fits in w x h
      var bounds = geo.bounds;
      var scale = Math.min(w / bounds.width, h / bounds.height);
      geo.scale(scale, scale);
      // text should go in the hand
      geo.spot1 = new go.Spot(0, 0.6, 10, 0);
      geo.spot2 = new go.Spot(1, 1);
      return geo;
    });







    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function (e) {


      var button = document.getElementById("SaveButton");
      // if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name, spot, output, input) {
      // the port is basically just a small transparent square
      return $(go.Shape, "Circle",
        {
          fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
          stroke: null,
          desiredSize: new go.Size(7, 7),
          alignment: spot,  // align the port on the main Shape
          alignmentFocus: spot,  // just inside the Shape
          portId: name,  // declare this object to be a "port"
          fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
          fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
          cursor: "pointer"  // show a different cursor to indicate potential link point
        });
    }

    var nodeSelectionAdornmentTemplate =
      $(go.Adornment, "Auto",
        $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
        $(go.Placeholder)
      );

    var nodeResizeAdornmentTemplate =
      $(go.Adornment, "Spot",
        { locationSpot: go.Spot.Right },
        $(go.Placeholder),
        $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
      );

    var nodeRotateAdornmentTemplate =
      $(go.Adornment,
        { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
        $(go.Shape, "Circle", { name: "CIRCLE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { geometryString: "M3.5 7 L3.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] })
      );

    myDiagram.nodeTemplate =
      $(go.Node, "Spot",
        { locationSpot: go.Spot.Center },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
        { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
        { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
        new go.Binding("angle").makeTwoWay(),
        // the main object is a Panel that surrounds a TextBlock with a Shape
        $(go.Panel, "Auto",
          { name: "PANEL" },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          $(go.Shape, "Rectangle",  // default figure
            {
              portId: "", // the default port: if no spot on link data, use closest side
              fromLinkable: true, toLinkable: true, cursor: "pointer",
              fill: "white",  // default color
              strokeWidth: 2
            },
            new go.Binding("figure"),
            new go.Binding("fill")),
          $(go.TextBlock,
            {
              font: "bold 11pt Helvetica, Arial, sans-serif",
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        ),
        // four small named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false),
        { // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function (e, node) { showSmallPorts(node, true); },
          mouseLeave: function (e, node) { showSmallPorts(node, false); }
        }
      );

    function showSmallPorts(node, show) {
      node.ports.each(function (port) {
        if (port.portId !== "") {  // don't change the default port, which is the big shape
          port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
      });
    }

    var linkSelectionAdornmentTemplate =
      $(go.Adornment, "Link",
        $(go.Shape,
          // isPanelMain declares that this Shape shares the Link.geometry
          { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
      );

    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
        { relinkableFrom: true, relinkableTo: true, reshapable: true },
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape,  // the link path shape
          { isPanelMain: true, strokeWidth: 2 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "Standard", stroke: null }),
        $(go.Panel, "Auto",
          new go.Binding("visible", "isSelected").ofObject(),
          $(go.Shape, "RoundedRectangle",  // the link shape
            { fill: "#F8F8F8", stroke: null }),
          $(go.TextBlock,
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "#919191",
              margin: 2,
              minSize: new go.Size(10, NaN),
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        )
      );

    this.load();  // load an initial diagram from some JSON text

    // initialize the Palette that is on the left side of the page
    this.myPalette =
      $(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
        {
          maxSelectionCount: 1,
          nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
          linkTemplate: // simplify the link template, just in this Palette
            $(go.Link,
              { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
                // to line up the Link in the same manner we have to pretend the Link has the same location spot
                locationSpot: go.Spot.Center,
                selectionAdornmentTemplate:
                  $(go.Adornment, "Link",
                    { locationSpot: go.Spot.Center },
                    $(go.Shape,
                      { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                    $(go.Shape,  // the arrowhead
                      { toArrow: "Standard", stroke: null })
                  )
              },
              {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 5,
                toShortLength: 4
              },
              new go.Binding("points"),
              $(go.Shape,  // the link path shape
                { isPanelMain: true, strokeWidth: 2 }),
              $(go.Shape,  // the arrowhead
                { toArrow: "Standard", stroke: null })
            ),
          model: new go.GraphLinksModel([  // specify the contents of the Palette
            { text: "Start", figure: "Circle", fill: "#00AD5F" },
            { text: "Step" },
            { text: "traingle", figure: "TriangleUp", fill: "yellow" },

            { text: "DB", figure: "Database", fill: "lightgray" },
            { text: "???", figure: "Diamond", fill: "lightskyblue" },
            { text: "End", figure: "Circle", fill: "#CE0620" },
            { text: "Comment", figure: "RoundedRectangle", fill: "lightyellow" },



            // { text: "Step" },
            { text: "Heart", figure: "Heart", fill: "yellow" },
            { text: "", figure: "BpmnTaskService", fill: "green" },
            { text: "", figure: "BpmnTaskService1", fill: "green" },


            { text: "Border", figure: "Border", fill: "lightgray" },
            { text: "Ellipse", figure: "Ellipse", fill: "lightskyblue" },
            { text: "", figure: "LineH", fill: "#CE0620" },
            { text: "", figure: "LineV", fill: "lightyellow" },


            { text: "TriangleRight", figure: "TriangleRight", fill: "lightgray" },
            { text: "TriangleDown", figure: "TriangleDown", fill: "lightskyblue" },
            { text: "TriangleLeft", figure: "TriangleLeft", fill: "#CE0620" },
            { text: "Triangle", figure: "Triangle", fill: "lightyellow" },

            { text: "BarH", figure: "BarH", fill: "lightgray" },
            { text: "BarV", figure: "BarV", fill: "lightskyblue" },
            { text: "", figure: "MinusLine", fill: "#CE0620" },
            { text: "", figure: "PlusLine", fill: "lightyellow" },

            { text: "", figure: "XLine", fill: "lightyellow" },

          ], [
              // the Palette also has a disconnected Link, which the user can drag-and-drop
              { points: new go.List(/*go.Point*/).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]) }
            ])
        });



    myDiagram.addModelChangedListener(function (evt) {

      // console.log(myDiagram.model.toJson());
      updatedData = myDiagram.model.toJson();
      var element = <HTMLInputElement>document.getElementById('mySavedModel')
      element.value = updatedData;
      // document.getElementById('mySavedModel').value = updatedData;


    });

  } // oninit

  save() {
    localStorage.setItem('graphData', updatedData);

  }

  load() {
    if (localStorage.getItem('graphData')) {
      myDiagram.model = go.Model.fromJson(localStorage.getItem('graphData'));
      //  myDiagram.model=go.Model.fromJson(this.dataForm.get('drawingData').value);
    }
    if (event) {
      // console.log(event);

      //   // console.log(event.target.parentNode.parentNode.childNodes[1].childNodes[0].value);
      //   console.log(document.getElementById('mySavedModel').value);

      var element = <HTMLInputElement>document.getElementById('mySavedModel')

      myDiagram.model = go.Model.fromJson(element.value);// event.target.parentNode.parentNode.childNodes[1].childNodes[0].value
    }
    this.loadDiagramProperties();  // do this after the Model.modelData has been brought into memory
  }


  saveDiagramProperties() {
    myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
  }
  loadDiagramProperties() {
    // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
    var pos = myDiagram.model.modelData.position;
    if (pos) myDiagram.initialPosition = go.Point.parse(pos);
  }


}
