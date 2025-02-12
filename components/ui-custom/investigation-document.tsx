/* eslint-disable @next/next/no-img-element */

"use client";

import {useEffect} from "react";
import {redirect} from "next/navigation";

import {useAuth} from "@/hooks/use-auth";
import {InvestigationWithDetails} from "@/lib/db/schema";
import {cn} from "@/lib/utils";
import {dateFormat} from "@/helpers/dates";
import {
  Object,
  People,
  PersonArrested,
  RecoveredObject,
  SecuredDrug,
  SocialNetwork,
  Vehicle
} from "@/types/investigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface InvestigationDocumentProps {
  data: InvestigationWithDetails;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export const InvestigationDocument = ({
  data,
  contentRef,
  className
}: InvestigationDocumentProps) => {
  const {auth} = useAuth();

  // Convertir los folios de la llamada a un array
  const callFolios = data.investigation.callFolios
    ? JSON.parse(data.investigation.callFolios)
    : [];

  // Convertir los folios de los IPH a un array
  const iphFolios = data.investigation.iphFolios
    ? JSON.parse(data.investigation.iphFolios)
    : [];

  // Convertir people a un array
  const people = data.investigation.people
    ? JSON.parse(data.investigation.people)
    : [];

  // Convertir redes sociales a un array
  const socialNetworks = data.investigation.socialNetworks
    ? JSON.parse(data.investigation.socialNetworks)
    : [];

  // Convertir personas arrestadas en un array
  const personsArrested = data.investigation.personsArrested
    ? JSON.parse(data.investigation.personsArrested)
    : [];

  // Convertir en array los objetos recuperados
  const recoveredObjects = data.investigation.recoveredObjects
    ? JSON.parse(data.investigation.recoveredObjects)
    : [];

  // Convertir en array la droga asegurada
  const securedDrug = data.investigation.securedDrug
    ? JSON.parse(data.investigation.securedDrug)
    : [];

  // Convertir en array los vehículos asegurados
  const securedVehicles = data.investigation.securedVehicles
    ? JSON.parse(data.investigation.securedVehicles)
    : [];

  // Convertir en array los objetos asegurados
  const securedObjects = data.investigation.securedObjects
    ? JSON.parse(data.investigation.securedObjects)
    : [];

  useEffect(() => {
    const userModules = JSON.parse(auth?.modules || "[]");
    // Validamos el acceso
    if (
      auth?.id !== data.createdBy.id &&
      auth?.role !== "admin" &&
      !userModules.includes(data.investigation.group)
    ) {
      redirect("/dashboard/not-access");
    }
  }, [auth?.id, auth?.role, auth?.modules, data]);

  return (
    <div
      id="investigationPdf"
      ref={contentRef}
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <img
          src="/images/logo-dspm.webp"
          alt="DSPM"
          className="w-[200px] h-auto object-scale-down"
        />
        <h1 className="font-bold uppercase text-lg">
          Grupos especiales de investigación
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2 bg-[#F5F5F5] p-2">
          <h3 className="uppercase flex items-center gap-2 font-bold">
            Nombre del elemento:{" "}
            <p className="font-normal normal-case">
              {data.createdBy.name} {data.createdBy.lastname}
            </p>
          </h3>
        </div>
        <div className="bg-[#F5F5F5] p-2">
          <h3 className="uppercase flex items-center gap-2 font-bold">
            Grupo: <p className="font-normal">{data.investigation.group}</p>
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2 bg-[#F5F5F5] p-2">
          <h3 className="uppercase flex items-center gap-2 font-bold">
            Nombre del elemento que brinda apoyo:{" "}
            <p className="font-normal normal-case">
              {data.supportBy
                ? `${data.supportBy.name} ${data.supportBy.lastname}`
                : ""}
            </p>
          </h3>
        </div>
        <div className="bg-[#F5F5F5] p-2">
          <h3 className="uppercase flex items-center gap-2 font-bold">
            Distrito:{" "}
            <p className="font-normal capitalize">
              {data.investigation.district}
            </p>
          </h3>
        </div>
      </div>
      <div className="py-1 bg-blue-950 my-5">
        <h4 className="text-white uppercase text-center font-bold">
          Modo del inicio de la investigación
        </h4>
      </div>
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="uppercase flex items-center gap-2 font-bold">
            Tipo de evento:
          </h3>
          <p className="capitalize">{data.investigationType?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="uppercase flex items-center gap-2 font-bold">
            Fecha de evento:
          </h3>
          <p className="capitalize">
            {dateFormat(data.investigation.investigationDate)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="uppercase flex items-center gap-2 font-bold">
            Ubicación:
          </h3>
          <p className="capitalize">{data.investigation.location}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Víctima física:
            </h3>
            <p className="capitalize">{data.investigation.physicalVictim}</p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Víctima Moral:
            </h3>
            <p className="capitalize">{data.investigation.moralVictim}</p>
          </div>
        </div>
      </section>
      <hr className="my-5 border-[#F5F5F5]" />
      <section className="mb-5 space-y-2">
        <div className="flex items-start gap-2">
          <h3 className="uppercase font-bold mb-2">Llamadas 911:</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {callFolios.map((folio: string, index: number) => {
              return (
                <span
                  key={index}
                  className="bg-[#F5F5F5] px-2 rounded-full font-medium"
                >
                  {folio}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <h3 className="uppercase font-bold mb-2">Folios IPH:</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {iphFolios.map((folio: string, index: number) => {
              return (
                <span
                  key={index}
                  className="bg-[#F5F5F5] px-2 rounded-full font-medium"
                >
                  {folio}
                </span>
              );
            })}
          </div>
        </div>
      </section>
      <section className="space-y-2">
        <h5 className="font-bold uppercase">Entrevista por investigación</h5>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Víctimas:</h5>
            {data.investigation.victimInv === 0 ? (
              <p className="text-zinc-500">Ninguno</p>
            ) : (
              <p>0</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Testigos:</h5>
            {data.investigation.witnessInv === 0 ? (
              <p className="text-zinc-500">Ninguno</p>
            ) : (
              <p>0</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Imputados:</h5>
            {data.investigation.invAccused === 0 ? (
              <p className="text-zinc-500">Ninguno</p>
            ) : (
              <p>0</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Serie fotográfica:</h5>
            {data.investigation.photoCount === 0 ? (
              <p className="text-zinc-500">Ninguno</p>
            ) : (
              <p>0</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Video grabaciones:</h5>
            {data.investigation.videoCount === 0 ? (
              <p className="text-zinc-500">Ninguno</p>
            ) : (
              <p>0</p>
            )}
          </div>
        </div>
      </section>
      <div className="py-1 bg-sky-400 mt-5">
        <h4 className="text-white uppercase text-center font-bold">
          Consultas
        </h4>
      </div>
      <div className="py-1 bg-blue-950 mb-5">
        <h4 className="text-white uppercase text-center font-bold">
          U.A.T. (Cantidad)
        </h4>
      </div>
      <section className="space-y-2 mb-5">
        <h5 className="font-bold uppercase">Personas</h5>
        <div>
          {people.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Domicilio</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Teléfono</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((item: People, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.plate}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-zinc-500 text-center">
              No hay personas en la investigación
            </p>
          )}
        </div>
      </section>
      <section className="mb-5">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Censos</h5>
            {data.investigation.census && data.investigation.census > 0 ? (
              <p>{data.investigation.census}</p>
            ) : (
              <p className="text-zinc-500">Sin censos</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Antecedentes AOP</h5>
            {data.investigation.atecedentsAOP &&
            data.investigation.atecedentsAOP > 0 ? (
              <p>{data.investigation.atecedentsAOP}</p>
            ) : (
              <p className="text-zinc-500">Sin antecedentes</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Afis</h5>
            {data.investigation.afis && data.investigation.afis > 0 ? (
              <p>{data.investigation.afis}</p>
            ) : (
              <p className="text-zinc-500">Sin afis</p>
            )}
          </div>
        </div>
      </section>
      <section className="mb-5">
        <h5 className="font-medium">Redes sociales</h5>
        {socialNetworks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Red social</TableHead>
                <TableHead>URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialNetworks.map((item: SocialNetwork, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium capitalize">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.url}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-zinc-500 text-center">
            No hay redes sociales en la investigación
          </p>
        )}
      </section>
      <section className="mb-5">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Fichas de personas</h5>
            {data.investigation.peopleFiles &&
            data.investigation.peopleFiles > 0 ? (
              <p>{data.investigation.peopleFiles}</p>
            ) : (
              <p className="text-zinc-500">Sin fichas</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Comparativas</h5>
            {data.investigation.comparision &&
            data.investigation.comparision > 0 ? (
              <p>{data.investigation.comparision}</p>
            ) : (
              <p className="text-zinc-500">Sin comparativas</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Cronología de U.A.T.</h5>
            {data.investigation.chronologyUAT &&
            data.investigation.chronologyUAT > 0 ? (
              <p>{data.investigation.chronologyUAT}</p>
            ) : (
              <p className="text-zinc-500">Sin cronologías</p>
            )}
          </div>
        </div>
      </section>
      <section className="mb-5 space-y-5">
        <h5 className="font-bold uppercase">Operativo de vigilancia</h5>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Personas</h5>
            {data.investigation.surveillanceOperationPeople &&
            data.investigation.surveillanceOperationPeople > 0 ? (
              <p>{data.investigation.surveillanceOperationPeople}</p>
            ) : (
              <p className="text-zinc-500">Sin personas</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Vehiculos</h5>
            {data.investigation.surveillanceOperationVehicles &&
            data.investigation.surveillanceOperationVehicles > 0 ? (
              <p>{data.investigation.surveillanceOperationVehicles}</p>
            ) : (
              <p className="text-zinc-500">Sin vehículos</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Domicilios</h5>
            {data.investigation.surveillanceOperationAdressess &&
            data.investigation.surveillanceOperationAdressess > 0 ? (
              <p>{data.investigation.surveillanceOperationAdressess}</p>
            ) : (
              <p className="text-zinc-500">Sin domicilios</p>
            )}
          </div>
        </div>
      </section>
      <section className="mb-5 space-y-5">
        <h5 className="font-bold uppercase">Operativo de búsqueda</h5>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Rastreo</h5>
            {data.investigation.searchOperationTracking &&
            data.investigation.searchOperationTracking > 0 ? (
              <p>{data.investigation.searchOperationTracking}</p>
            ) : (
              <p className="text-zinc-500">Sin rastreos</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Otros</h5>
            {data.investigation.searchOperationOthers &&
            data.investigation.searchOperationOthers > 0 ? (
              <p>{data.investigation.searchOperationOthers}</p>
            ) : (
              <p className="text-zinc-500">Sin otros</p>
            )}
          </div>
        </div>
      </section>
      <section className="mb-5">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Reporte policial</h5>
            {data.investigation.pliceReport &&
            data.investigation.pliceReport > 0 ? (
              <p>{data.investigation.pliceReport}</p>
            ) : (
              <p className="text-zinc-500">Sin reporte</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Serie fotográfica</h5>
            {data.investigation.photographicSeries &&
            data.investigation.photographicSeries > 0 ? (
              <p>{data.investigation.photographicSeries}</p>
            ) : (
              <p className="text-zinc-500">Sin series</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Mapa de U.A.T.</h5>
            {data.investigation.mapUAT && data.investigation.mapUAT > 0 ? (
              <p>{data.investigation.mapUAT}</p>
            ) : (
              <p className="text-zinc-500">Sin mapas</p>
            )}
          </div>
        </div>
      </section>
      <div className="py-1 bg-sky-400 my-5">
        <h4 className="text-white uppercase text-center font-bold">
          Operativo de detención
        </h4>
      </div>
      <section className="space-y-2 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <h5 className="font-medium">Ubicación:</h5>
          {data.investigation.arrestOperationLocation ? (
            <p>{data.investigation.arrestOperationLocation}</p>
          ) : (
            <p className="text-zinc-500">Sin ubicación</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h5 className="font-medium">Distrito:</h5>
          {data.investigation.arrestOperationDistrict ? (
            <p>{data.investigation.arrestOperationDistrict}</p>
          ) : (
            <p className="text-zinc-500">Sin distrito</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h5 className="font-medium">Fecha:</h5>
          {data.investigation.arrestOperationDate ? (
            <p>{dateFormat(data.investigation.arrestOperationDate)}</p>
          ) : (
            <p className="text-zinc-500">Sin fecha</p>
          )}
        </div>
      </section>
      <section className="mb-5">
        <h5 className="font-bold uppercase">Personas detenidas</h5>
        {personsArrested.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Pandilla</TableHead>
                <TableHead>Grupo criminal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personsArrested.map((item: PersonArrested, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium capitalize">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.pandilla}</TableCell>
                    <TableCell>{item.criminalGroup}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-zinc-500 text-center">
            No hay personas arrestadas
          </p>
        )}
      </section>
      <section className="mb-5 space-y-2">
        <h5 className="font-bold uppercase">
          Detenciones y arrestos por D.S.P.M.
        </h5>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Por flagrancia</h5>
            {data.investigation.arrestsInFlagranteDelicto &&
            data.investigation.arrestsInFlagranteDelicto > 0 ? (
              <p>{data.investigation.arrestsInFlagranteDelicto}</p>
            ) : (
              <p className="text-zinc-500">Sin detenciones por flagrancia</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Por administrativo</h5>
            {data.investigation.arrestsForAdministrative &&
            data.investigation.arrestsForAdministrative > 0 ? (
              <p>{data.investigation.arrestsForAdministrative}</p>
            ) : (
              <p className="text-zinc-500">
                Sin detenciones por administrativo
              </p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Por seguimiento</h5>
            {data.investigation.arrestsForTracking &&
            data.investigation.arrestsForTracking > 0 ? (
              <p>{data.investigation.arrestsForTracking}</p>
            ) : (
              <p className="text-zinc-500">Sin detenciones por seguimiento</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Orden de aprehensión</h5>
            {data.investigation.arrestsByArrestWarrant &&
            data.investigation.arrestsByArrestWarrant > 0 ? (
              <p>{data.investigation.arrestsByArrestWarrant}</p>
            ) : (
              <p className="text-zinc-500">
                Sin detenciones por orden aprehensión
              </p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Orden de cateo</h5>
            {data.investigation.arrestsBySearchWarrant &&
            data.investigation.arrestsBySearchWarrant > 0 ? (
              <p>{data.investigation.arrestsBySearchWarrant}</p>
            ) : (
              <p className="text-zinc-500">Sin detenciones por orden cateo</p>
            )}
          </div>
        </div>
      </section>
      <section className="mb-5 space-y-2">
        <h5 className="font-bold uppercase">Personas localizadas</h5>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <h5 className="font-medium">Canalizaciones a UNNA</h5>
            {data.investigation.personsLocatedUNNA &&
            data.investigation.personsLocatedUNNA > 0 ? (
              <p>{data.investigation.personsLocatedUNNA}</p>
            ) : (
              <p className="text-zinc-500">Sin canalizaciones a UNNA</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Canalizaciones a trabajo social</h5>
            {data.investigation.personsLocatedSocialWork &&
            data.investigation.personsLocatedSocialWork > 0 ? (
              <p>{data.investigation.personsLocatedSocialWork}</p>
            ) : (
              <p className="text-zinc-500">
                Sin canalizaciones a trabajo social
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="mb-5 space-y-2">
        <h5 className="font-bold uppercase">Objetos recuperados</h5>
        {recoveredObjects.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de recuperación</TableHead>
                <TableHead>Tipo de arma</TableHead>
                <TableHead>Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recoveredObjects.map((item: RecoveredObject, index: number) => {
                let typeRecovered = item.typeRecovered;
                let typeWeapon = item.typeWeapon;

                switch (item.typeRecovered) {
                  case "flagrante":
                    typeRecovered = "Flagrante";
                    break;
                  case "tracking":
                    typeRecovered = "Seguimiento de investigación";
                    break;
                }

                switch (item.typeWeapon) {
                  case "arma-corta":
                    typeWeapon = "Arma corta";
                    break;
                  case "arma-hechiza":
                    typeWeapon = "Arma hechiza";
                    break;
                  case "arma-larga":
                    typeWeapon = "Arma larga";
                    break;
                  case "arma-utileria":
                    typeWeapon = "Arma de utilería";
                    break;
                  case "cuchillo":
                    typeWeapon = "Cuchillo";
                    break;
                }

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {typeRecovered}
                    </TableCell>
                    <TableCell>{typeWeapon}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-zinc-500 text-center">
            No hay objetos recuperados
          </p>
        )}
      </section>
      <section className="mb-5 space-y-2">
        <h5 className="font-bold uppercase">Droga asegurada</h5>
        {securedDrug.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de droga</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Unidad de medida</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securedDrug.map((item: SecuredDrug, index: number) => {
                let drugType = item.type;
                let drugUnit = item.unit;

                switch (item.type) {
                  case "cocaina":
                    drugType = "Cocaína";
                    break;
                  case "cristal":
                    drugType = "Cristal";
                    break;
                  case "marihuana":
                    drugType = "Marihuana";
                    break;
                  case "pastillas":
                    drugType = "Pastillas";
                    break;
                  case "heroina":
                    drugType = "Heroína";
                    break;

                  default:
                    drugType = "Marihuana";
                    break;
                }

                switch (item.type) {
                  case "grs":
                    drugUnit = "Gramos";
                    break;
                  case "kgs":
                    drugUnit = "Kilogramos";
                    break;
                  case "tns":
                    drugUnit = "Toneladas";
                    break;

                  default:
                    drugUnit = "Kilogramos";
                    break;
                }

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{drugType}</TableCell>
                    <TableCell>{item.quantity.toFixed(2)}</TableCell>
                    <TableCell>{drugUnit}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-zinc-500 text-center">No hay droga asegurada</p>
        )}
      </section>
      <section className="mb-5 space-y-2">
        <h5 className="font-bold uppercase">Vehículos asegurados</h5>
        {securedVehicles.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Características</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securedVehicles.map((item: Vehicle, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium uppercase">
                      {item.brand}
                    </TableCell>
                    <TableCell className="uppercase">{`${item.type} - ${item.model}`}</TableCell>
                    <TableCell className="uppercase">{item.plate}</TableCell>
                    <TableCell className="capitalize">{item.color}</TableCell>
                    <TableCell>{item.caracteristics}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-zinc-500 text-center">
            No hay vehículos asegurados
          </p>
        )}
      </section>
      <section className="mb-5 space-y-2">
        <h5 className="font-bold uppercase">Objetos asegurados</h5>
        {securedObjects.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securedObjects.map((item: Object, index: number) => {
                let typeObject = item.type;

                switch (item.type) {
                  case "cellphones":
                    typeObject = "Celulares";
                    break;
                  case "cash":
                    typeObject = "Efectivo";
                    break;
                  case "electronics":
                    typeObject = "Electrónicos";
                    break;
                  case "tools":
                    typeObject = "Herramientas";
                    break;
                  case "others":
                    typeObject = "Otros";
                    break;
                }

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{typeObject}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-zinc-500 text-center">No hay objetos asegurados</p>
        )}
      </section>
      <section className="space-y-2 mb-10">
        <div>
          <h5 className="font-medium">Ficha informativa</h5>
          {data.investigation.informativeSheet &&
          data.investigation.informativeSheet > 0 ? (
            <p>{data.investigation.informativeSheet}</p>
          ) : (
            <p className="text-zinc-500">Sin ficha informativa</p>
          )}
        </div>
        <div>
          <h5 className="font-medium">Oficios M.P.</h5>
          {data.investigation.officesMP && data.investigation.officesMP > 0 ? (
            <p>{data.investigation.officesMP}</p>
          ) : (
            <p className="text-zinc-500">Sin oficios</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-5">
          <div>
            <h5 className="font-medium">Fecha de entrega</h5>
            {data.investigation.deliveryDate ? (
              <p>{dateFormat(data.investigation.deliveryDate)}</p>
            ) : (
              <p className="text-zinc-500">Sin fecha de entrega</p>
            )}
          </div>
          <div>
            <h5 className="font-medium">Hora de entrega</h5>
            {data.investigation.deliveryHour ? (
              <p>{data.investigation.deliveryHour}</p>
            ) : (
              <p className="text-zinc-500">Sin hora de entrega</p>
            )}
          </div>
        </div>
      </section>
      <section className="mb-10">
        <div className="flex items-center justify-between gap-5">
          <div className="max-w-72">
            <div className="w-full h-20 border border-zinc-500" />
            <h5 className="bg-[#F5F5F5] p-2 font-medium border-l border-b border-r border-zinc-500 text-center">
              Nombre y firma de quien entrega
            </h5>
          </div>
          <div className="max-w-72">
            <div className="w-full h-20 border border-zinc-500" />
            <h5 className="bg-[#F5F5F5] p-2 font-medium border-l border-b border-r border-zinc-500 text-center">
              Nombre y firma de quien recibe
            </h5>
          </div>
        </div>
      </section>
      <section className="mb-5">
        <div className="max-w-72 mx-auto">
          <div className="w-full h-20 border border-zinc-500" />
          <h5 className="bg-[#F5F5F5] p-2 font-medium border-l border-b border-r border-zinc-500 text-center">
            Vo. Bo.
          </h5>
        </div>
      </section>
    </div>
  );
};
