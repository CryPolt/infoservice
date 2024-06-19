"use client"
import React, { useEffect } from 'react';
import * as go from 'gojs'; // Importing GoJS under the alias 'go'

export const GoJSDiagram = () => {
  useEffect(() => {
    const $ = go.GraphObject.make;

    // Initialize the main diagram
    const myDiagram = $(go.Diagram, 'myDiagramDiv', {
      'undoManager.isEnabled': true // Enable undo/redo if needed
    });

    // Define node template for the diagram
    myDiagram.nodeTemplate =
      $(go.Node, 'Auto', { locationSpot: go.Spot.Center },
        $(go.Shape, 'RoundedRectangle', { fill: 'white', portId: '', fromLinkable: true, toLinkable: true }),
        $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'name'))
      );

    // Initialize the model
    myDiagram.model = new go.GraphLinksModel([
      { key: 1, name: 'Alpha', loc: '0 0' },
      { key: 2, name: 'Beta', loc: '150 0' },
      { key: 3, name: 'Gamma', loc: '0 150' }
    ]);

    // Example diagram listener
    myDiagram.addDiagramListener('ChangedSelection', function(e) {
      console.log('Selection changed:', e.subject);
    });

    // Clean-up function
    return () => {
      myDiagram.div = null; // Remove reference to div to clean up properly
      myDiagram.removeDiagramListener('ChangedSelection'); // Remove the listener when component unmounts
      myDiagram.clear(); // Clear the diagram contents
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Main Diagram */}
      <div id="myDiagramDiv" style={{ flexGrow: 1, height: '100%', border: 'solid 1px black' }} />
    </div>
  );
};

export default GoJSDiagram;
