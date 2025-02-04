"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { MoveRight } from "lucide-react";

interface ChartConfig {
  label: string;
  color: string;
}

interface RadialChartProps {
  title: string;
  description: string;
  total: number; // Valor máximo del gráfico (círculo completo)
  value: number; // Valor actual mostrado en el centro
  config: {
    [key: string]: ChartConfig; // Configuración dinámica
  };
  status: string; // Clave para seleccionar la configuración
  features?: {
    description: string;
    value: number;
  }[];
}

export function RadialChart({
  title,
  description,
  total,
  value,
  config,
  status,
  features,
}: RadialChartProps) {
  const chartConfig = config[status];

  if (!chartConfig) {
    console.error(`Config not found for status: "${status}"`);
    return null; // Manejar un estado no configurado
  }

  // Calcular el porcentaje para la barra azul
  const percentage = (value / total) * 100;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config} // Pasando toda la configuración
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={[
              {
                name: chartConfig.label,
                value: percentage, // Valor proporcional para pintar la barra azul
                fill: chartConfig.color,
              },
            ]}
            startAngle={90}
            endAngle={450}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid gridType="circle" radialLines={false} stroke="none" />
            {/* Barra de fondo (gris) */}
            <RadialBar
              dataKey="value"
              background={{ fill: "var(--color-muted)" }} // Fondo gris
              cornerRadius={10}
              data={[{ name: "Total", value: 100 }]} // Siempre 100% para el fondo
            />
            {/* Barra principal (azul) */}
            <RadialBar
              dataKey="value"
              fill={chartConfig.color}
              cornerRadius={10}
              data={[{ name: chartConfig.label, value: percentage }]} // Proporcional al value
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {/* Valor en el centro */}
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {value.toLocaleString()}
                        </tspan>
                        {/* Etiqueta debajo del valor */}
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          {chartConfig.label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {features && features?.length > 0 && (
        <CardFooter className="flex-col text-sm text-muted-foreground">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between"
            >
              <h5>{feature.description}</h5>
              <MoveRight />
              <span>{feature.value}</span>
            </div>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
