"use client"
import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useReactFlow,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

const flowKey = 'example-flow';
const flowDataFile = '/flow-data.json'; // Name of your JSON file

const getNodeId = () => `randomnode_${+new Date()}`; // Generate a unique ID for new nodes

// Initial nodes and edges - you can customize these based on your flow
const initialNodes = [];

const initialEdges = [];

export const FlowEditor = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            saveFlowToJsonFile(flow, flowDataFile);
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        loadFlowFromJSONFile(flowDataFile)
            .then((flow) => {
                if (flow) {
                    setNodes(flow.nodes || []);
                    setEdges(flow.edges || []);

                    if (rfInstance) {
                        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                        rfInstance.setViewport({ x, y, zoom });
                    }
                }
            });
    }, [setNodes, rfInstance]);

    const onAdd = useCallback(() => {
        const newNode = {
            id: getNodeId(),
            data: { label: 'Added Node' },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight - 200,
            },
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    // Load flow data from JSON file on component mount
    useEffect(() => {
        onRestore();
    }, [onRestore]);

    return (
        <div style={{width: '1000px', height: '1000px'}}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                onInit={setRfInstance}
            >
                <Background />
                <Controls />
                <Panel position="top-right">
                    <button onClick={onSave}>save</button>
                    <button onClick={onRestore}>restore</button>
                    <button onClick={onAdd}>add node</button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

// **File API Implementation**
const saveFlowToJsonFile = (flow, fileName) => {
    const data = JSON.stringify(flow);
    localStorage.setItem(fileName, data); // Store in local storage for demo
    alert('Flow saved successfully!'); // Notify user
};


const loadFlowFromJSONFile = async (fileName) => {
    try {

        const response = await fetch(fileName);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading flow data:', error);
        return null;
    }
};

