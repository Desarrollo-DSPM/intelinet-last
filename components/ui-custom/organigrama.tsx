"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  addEdge,
  Position,
  Controls,
  Background,
  ColorMode,
  Edge,
  Node,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";

const initialNodes: Node[] = [
  {
    id: "subdirector",
    sourcePosition: Position.Bottom,
    type: "input",
    data: { label: "Subdirector de inteligencia" },
    position: { x: 0, y: 0 },
  },
  {
    id: "secretaria",
    sourcePosition: Position.Right,
    targetPosition: Position.Right,
    data: { label: "Secretaria de subdirector" },
    position: { x: -200, y: 100 },
  },
  {
    id: "asesor-general",
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
    data: { label: "Asesor general" },
    position: { x: 200, y: 50 },
  },
  {
    id: "integracion-seguimiento-proyectos",
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
    data: { label: "Integración y seguimiento de proyectos" },
    position: { x: 300, y: 100 },
  },
  {
    id: "asesor-tecnologico-implementacion",
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
    data: { label: "Asesor tecnológico y de implementación" },
    position: { x: 450, y: 200 },
  },
  {
    id: "departamento-innoviacion-tecnologia",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Departamento de innovación y tecnología" },
    position: { x: -600, y: 500 },
  },
  {
    id: "desarrollo-tecnologico",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Desarrollo tecnológico" },
    position: { x: -600, y: 600 },
  },
  {
    id: "soporte-tecnico",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Soporte técnico" },
    position: { x: -600, y: 700 },
  },
  {
    id: "infraestructura",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Infraestructura" },
    position: { x: -600, y: 800 },
  },
  {
    id: "administracion-sistemas",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "Administración de sistemas" },
    position: { x: -600, y: 900 },
  },
  {
    id: "departamento-estrategia-estadistica-criminal",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Departamento de estratégia y estadística criminal" },
    position: { x: -400, y: 500 },
  },
  {
    id: "procesamiento-informacion",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Procesamiento de la información" },
    position: { x: -400, y: 600 },
  },
  {
    id: "analisis",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "Análisis" },
    position: { x: -400, y: 700 },
  },
  {
    id: "departamento-analisis-tactico",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Departamento de análisis táctico" },
    position: { x: -200, y: 500 },
  },
  {
    id: "integracion-informacion-supervision",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Integración de la información (supervisión)" },
    position: { x: -200, y: 600 },
  },
  {
    id: "policia-cibernetica",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Policía cibérnetica" },
    position: { x: -200, y: 700 },
  },
  {
    id: "video-analisis-consulta",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "Video análisis y consulta" },
    position: { x: -200, y: 800 },
  },
  {
    id: "departamento-operaciones-aereas",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Departamento de operaciones aéreas" },
    position: { x: 0, y: 500 },
  },
  {
    id: "division-aeronave-halcon-1",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "División de aeronave halcon 1" },
    position: { x: 0, y: 600 },
  },
  {
    id: "division-drones",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "División de drones" },
    position: { x: 0, y: 700 },
  },
  {
    id: "departamento-administracion-pecuu",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Departamento de administración de PECUU" },
    position: { x: 200, y: 500 },
  },
  {
    id: "adquisiciones-licitaciones",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Adquisiciones y licitaciones" },
    position: { x: 200, y: 600 },
  },
  {
    id: "3000-camaras",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "3,000 cámaras" },
    position: { x: 200, y: 700 },
  },
  {
    id: "departamento-911",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Departamento C.E.R.I. 911" },
    position: { x: 400, y: 500 },
  },
  {
    id: "supervisor-general",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Supervisor general" },
    position: { x: 400, y: 600 },
  },
  {
    id: "supervisor-turno",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "Supervisor de turno" },
    position: { x: 400, y: 700 },
  },
  {
    id: "departamento-cmo-pecuu",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Departamento de C.M.O. PECUU" },
    position: { x: 600, y: 500 },
  },
  {
    id: "ciberoperadores-observadores",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Ciberoperadores y observadores" },
    position: { x: 600, y: 600 },
  },
  {
    id: "unidad-radioperadores",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "Unidad de radioperadores" },
    position: { x: 600, y: 700 },
  },
  {
    id: "cordinacion-investigacion-criminal",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Coordinación de investigación criminal" },
    position: { x: 800, y: 500 },
  },
  {
    id: "unidad-especializada-delitos-genero",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Unidad especializada en delitos de genero" },
    position: { x: 800, y: 600 },
  },
  {
    id: "unidad-investigacion-policial",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Unidad de investigación policial" },
    position: { x: 800, y: 700 },
  },
  {
    id: "unidad-atencion-pandillas",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Unidad de atención a pandillas" },
    position: { x: 800, y: 800 },
  },
  {
    id: "unidad-criminalistica",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Unidad de criminalistíca" },
    position: { x: 800, y: 900 },
  },
  {
    id: "unidad-atencion-robo-casa-habitacion",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Unidad de atención a robo casa habitación" },
    position: { x: 800, y: 1000 },
  },
  {
    id: "unidad-investigacion-incendios-explosiones",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "Unidad de investigación de incendios y explosiones" },
    position: { x: 800, y: 1100 },
  },
  {
    id: "grupo-atencion-proteccion-victimas",
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    data: { label: "Grupo de atención y protección a victimas" },
    position: { x: 800, y: 1200 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "subdirector-secretaria",
    source: "subdirector",
    type: "bezier",
    target: "secretaria",
    animated: true,
  },
  {
    id: "subdirector-to-secretaria",
    source: "secretaria",
    type: "bezier",
    target: "create-users",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-asesor-general",
    source: "subdirector",
    type: "bezier",
    target: "asesor-general",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-integracion-seguimiento-proyectos",
    source: "subdirector",
    type: "bezier",
    target: "integracion-seguimiento-proyectos",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-asesor-tecnologico-implementacion",
    source: "subdirector",
    type: "bezier",
    target: "asesor-tecnologico-implementacion",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-departamento-innoviacion-tecnologia",
    source: "subdirector",
    type: "bezier",
    target: "departamento-innoviacion-tecnologia",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-innovacion-tecnologia-to-desarrollo-tecnologico",
    source: "departamento-innoviacion-tecnologia",
    type: "bezier",
    target: "desarrollo-tecnologico",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-innovacion-tecnologia-to-soporte-tecnico",
    source: "desarrollo-tecnologico",
    type: "bezier",
    target: "soporte-tecnico",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-innovacion-tecnologia-to-infraestructura",
    source: "soporte-tecnico",
    type: "bezier",
    target: "infraestructura",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-innovacion-tecnologia-to-administracion-sistemas",
    source: "infraestructura",
    type: "bezier",
    target: "administracion-sistemas",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-departamento-estrategia-estadistica-criminal",
    source: "subdirector",
    type: "bezier",
    target: "departamento-estrategia-estadistica-criminal",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-estrategia-estadistica-criminal-to-procesamiento-informacion",
    source: "departamento-estrategia-estadistica-criminal",
    type: "bezier",
    target: "procesamiento-informacion",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-estrategia-estadistica-criminal-to-analisis",
    source: "procesamiento-informacion",
    type: "bezier",
    target: "analisis",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-departamento-analisis-tactico",
    source: "subdirector",
    type: "bezier",
    target: "departamento-analisis-tactico",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-analisis-tactico-to-integracion-informacion-supervision",
    source: "departamento-analisis-tactico",
    type: "bezier",
    target: "integracion-informacion-supervision",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-analisis-tactico-to-policia-cibernetica",
    source: "integracion-informacion-supervision",
    type: "bezier",
    target: "policia-cibernetica",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-analisis-tactico-to-video-analisis-consulta",
    source: "policia-cibernetica",
    type: "bezier",
    target: "video-analisis-consulta",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-departamento-operaciones-aereas",
    source: "subdirector",
    type: "bezier",
    target: "departamento-operaciones-aereas",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-operaciones-aereas-to-division-aeronave-halcon-1",
    source: "departamento-operaciones-aereas",
    type: "bezier",
    target: "division-aeronave-halcon-1",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "dpto-operaciones-aereas-to-division-drones",
    source: "division-aeronave-halcon-1",
    type: "bezier",
    target: "division-drones",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-departamento-administracion-pecuu",
    source: "subdirector",
    type: "bezier",
    target: "departamento-administracion-pecuu",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "departamento-administracion-pecuu-to-adquisiciones-licitaciones",
    source: "departamento-administracion-pecuu",
    type: "bezier",
    target: "adquisiciones-licitaciones",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "departamento-administracion-pecuu-to-3000-camaras",
    source: "adquisiciones-licitaciones",
    type: "bezier",
    target: "3000-camaras",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-departamento-911",
    source: "subdirector",
    type: "bezier",
    target: "departamento-911",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "departamento-911-to-supervisor-general",
    source: "departamento-911",
    type: "bezier",
    target: "supervisor-general",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "departamento-911-to-supervisor-turno",
    source: "supervisor-general",
    type: "bezier",
    target: "supervisor-turno",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-departamento-cmo-pecuu",
    source: "subdirector",
    type: "bezier",
    target: "departamento-cmo-pecuu",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "departamento-cmo-pecuu-to-ciberoperadores-observadores",
    source: "departamento-cmo-pecuu",
    type: "bezier",
    target: "ciberoperadores-observadores",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "departamento-cmo-pecuu-to-unidad-radioperadores",
    source: "ciberoperadores-observadores",
    type: "bezier",
    target: "unidad-radioperadores",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "subdirector-to-cordinacion-investigacion-criminal",
    source: "subdirector",
    type: "bezier",
    target: "cordinacion-investigacion-criminal",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "cordinacion-investigacion-criminal-to-unidad-especializada-delitos-genero",
    source: "cordinacion-investigacion-criminal",
    type: "bezier",
    target: "unidad-especializada-delitos-genero",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "cordinacion-investigacion-criminal-to-unidad-investigacion-policial",
    source: "unidad-especializada-delitos-genero",
    type: "bezier",
    target: "unidad-investigacion-policial",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "cordinacion-investigacion-criminal-to-unidad-atencion-pandillas",
    source: "unidad-investigacion-policial",
    type: "bezier",
    target: "unidad-atencion-pandillas",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "cordinacion-investigacion-criminal-to-unidad-criminalistica",
    source: "unidad-atencion-pandillas",
    type: "bezier",
    target: "unidad-criminalistica",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "cordinacion-investigacion-criminal-to-unidad-atencion-robo-casa-habitacion",
    source: "unidad-criminalistica",
    type: "bezier",
    target: "unidad-atencion-robo-casa-habitacion",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "cordinacion-investigacion-criminal-to-unidad-investigacion-incendios-explosiones",
    source: "unidad-atencion-robo-casa-habitacion",
    type: "bezier",
    target: "unidad-investigacion-incendios-explosiones",
    animated: true,
    //label: "Registrar usuarios",
  },
  {
    id: "cordinacion-investigacion-criminal-to-grupo-atencion-proteccion-victimas",
    source: "unidad-investigacion-incendios-explosiones",
    type: "bezier",
    target: "grupo-atencion-proteccion-victimas",
    animated: true,
    //label: "Registrar usuarios",
  },
];

export const OrganizationChart = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  }, [theme]);

  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      colorMode={colorMode}
      attributionPosition="bottom-left"
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};
