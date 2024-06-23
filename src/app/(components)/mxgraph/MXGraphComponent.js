// components/MXGraphComponent.js

import React, { useEffect } from 'react';
import mx from 'mxgraph'; // Импортируем mxgraph
const { mxGraph, mxRubberband, mxUtils, mxEvent } = mx;

const MXGraphComponent = () => {
    useEffect(() => {
        const container = document.getElementById('graphContainer');
        const graph = new mxGraph(container);

        new mxRubberband(graph);

        // Пример добавления узлов
        const parent = graph.getDefaultParent();
        graph.getModel().beginUpdate();
        try {
            const v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
            const v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
            const e1 = graph.insertEdge(parent, null, '', v1, v2);
        } finally {
            graph.getModel().endUpdate();
        }

        // Отключаем контекстное меню
        mxEvent.disableContextMenu(container);

        // Очищаем ресурсы при размонтировании компонента
        return () => {
            graph.destroy();
        };
    }, []);

    return (
        <div id="graphContainer" style={{ width: '100%', height: '400px', border: '1px solid gray' }}>
            Graph will be rendered here
        </div>
    );
};

export default MXGraphComponent;
