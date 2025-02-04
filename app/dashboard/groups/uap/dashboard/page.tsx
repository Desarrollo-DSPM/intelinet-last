import { getInvestigationsByGroup } from "@/actions/investigations/get-investigations-by-group";
import { getInvestigationsByGroupAndByStatus } from "@/actions/investigations/get-investigations-by-group-and-by-status";
import { RadialChart } from "@/components/ui-custom/charts/radial-chart";

import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DashboardUAPPage = async () => {
  const group = "uap";

  const totalInvestigations = await getInvestigationsByGroup({ group });
  const investigationsInProgressResponse =
    await getInvestigationsByGroupAndByStatus({
      group,
      status: "in-progress",
    });
  const investigationsCancelledResponse =
    await getInvestigationsByGroupAndByStatus({
      group,
      status: "cancelled",
    });
  const investigationsCompletedResponse =
    await getInvestigationsByGroupAndByStatus({
      group,
      status: "done",
    });

  const chartConfig = {
    inProgress: {
      label: "En progreso",
      color: "hsl(210, 100%, 50%)", // Azul
    },
    done: {
      label: "Completas",
      color: "hsl(120, 100%, 50%)", // Verde
    },
    cancelled: {
      label: "Canceladas",
      color: "hsl(0, 100%, 50%)", // Rojo
    },
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Dashboard UAP</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/groups/uap">UAP</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard UAP</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RadialChart
          title="Investigaciones"
          description="En progreso"
          total={totalInvestigations.data.length}
          value={investigationsInProgressResponse.data.length}
          config={chartConfig} // Configuración dinámica
          status="inProgress" // Clave para seleccionar configuración
          features={[
            {
              description: "Total de investigaciones",
              value: totalInvestigations.data.length,
            },
            {
              description: "Investigaciones en progreso",
              value: investigationsInProgressResponse.data.length,
            },
          ]}
        />
        <RadialChart
          title="Investigaciones"
          description="Canceladas"
          total={totalInvestigations.data.length}
          value={investigationsCancelledResponse.data.length}
          config={chartConfig} // Configuración dinámica
          status="cancelled" // Clave para seleccionar configuración
          features={[
            {
              description: "Total de investigaciones",
              value: totalInvestigations.data.length,
            },
            {
              description: "Investigaciones canceladas",
              value: investigationsCancelledResponse.data.length,
            },
          ]}
        />
        <RadialChart
          title="Investigaciones"
          description="Completas"
          total={totalInvestigations.data.length}
          value={investigationsCompletedResponse.data.length}
          config={chartConfig} // Configuración dinámica
          status="done" // Clave para seleccionar configuración
          features={[
            {
              description: "Total de investigaciones",
              value: totalInvestigations.data.length,
            },
            {
              description: "Investigaciones completas",
              value: investigationsCompletedResponse.data.length,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardUAPPage;
