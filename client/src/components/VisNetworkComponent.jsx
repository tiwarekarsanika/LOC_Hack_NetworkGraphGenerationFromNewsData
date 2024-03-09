import { Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';

import React, { useEffect, useRef } from 'react';

function VisNetworkComponent() {
  const networkRef = useRef(null);

  useEffect(() => {
    const container = networkRef.current;
    const data = {
      nodes: [
        { id: 1, label: 'Node 1', group: 'A', title: 'Tooltip for Node 1' },
        { id: 2, label: 'Node 2', group: 'A', title: 'Tooltip for Node 2' },
        { id: 3, label: 'Node 3', group: 'B', title: 'Tooltip for Node 3' },
        { id: 4, label: 'Node 4', group: 'B', title: 'Tooltip for Node 4' },
        { id: 5, label: 'Node 5', group: 'C', title: 'Tooltip for Node 5' },
        { id: 6, label: 'Node 6', group: 'C', title: 'Tooltip for Node 6' },
      ],
      edges: [
        { from: 1, to: 2, label: 'Edge from Node 1 to Node 2'},
        { from: 1, to: 3 ,label: 'Edge from Node 1 to Node 2'},
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 4, to: 6 },
      ],
      groups: {
        A: { color: { border: 'red', background: 'rgba(255,0,0,0.2)' } },
        B: { color: { border: 'green', background: 'rgba(0,255,0,0.2)' } },
        C: { color: { border: 'blue', background: 'rgba(0,0,255,0.2)' } },
      },
    };

    const options = {
        nodes: {
          font: { color: 'black' },
          shape: 'circle',
          tooltip: { delay: 300 },
        },
        edges: {
          font: { size: 5 , align:"top" }, // Adjust font size of edge labels
          align: 'top', // Align labels horizontally along the edge
          color: 'orange', // Set edge color
        },
        interaction: { hover: true },
      };
    const network = new Network(container, data, options);

    // Animate the graph on load
    network.once('afterDrawing', () => {
      network.fit(); // Fit the view to the graph
      network.focusOnNode(1); // Focus on a specific node
      network.moveTo({ position: { x: 0, y: 0 }, scale: 1, animation: true }); // Move the view to a specific position with animation
    });

    const handleNodeClick = (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        console.log(`Node ${nodeId} clicked`);
      }
    };

    const handleNodeHover = (params) => {
      container.style.cursor = params.node ? 'pointer' : 'default';
    };

    // Add event listeners
    network.on('click', handleNodeClick);
    network.on('hoverNode', handleNodeHover);

    // Clean up function to destroy the network on component unmount
    return () => {
      network.off('click', handleNodeClick);
      network.off('hoverNode', handleNodeHover);
      network.destroy();
    };
  }, []);

  return <div className="network-container" ref={networkRef} style={{ width: '100%', height: '450px' }} />;
}

export default VisNetworkComponent;