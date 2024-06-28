import React from 'react';
import { DiagramComponent, Inject, DiagramTools } from 'diagram-library-react';
import { NodeModel, ConnectorModel, FlowShapeModel, BasicShapeModel } from 'diagram-library-react';

const BlockDiagram: React.FC = () => {
        const nodes: NodeModel[] = [
                {
                        id: 'node1',
                        offsetX: 100,
                        offsetY: 100,
                        width: 100,
                        height: 60,
                        shape: { type: 'Basic', shape: 'Rectangle' },
                        annotations: [{ content: 'Node 1' }]
                },
                {
                        id: 'node2',
                        offsetX: 300,
                        offsetY: 100,
                        width: 100,
                        height: 60,
                        shape: { type: 'Basic', shape: 'Rectangle' },
                        annotations: [{ content: 'Node 2' }]
                }
        ];

        const connectors: ConnectorModel[] = [
                {
                        id: 'connector1',
                        sourceID: 'node1',
                        targetID: 'node2'
                }
        ];

        return (
            <div style={{ width: '100%', height: '500px' }}>
                    <DiagramComponent id="diagram" width={'100%'} height={'100%'} nodes={nodes} connectors={connectors}>
                            <Inject services={[DiagramTools]} />
                    </DiagramComponent>
            </div>
        );
};

export default BlockDiagram;
