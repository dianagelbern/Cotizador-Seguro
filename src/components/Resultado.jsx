import React, { useCallback, useMemo, useRef } from "react";
import useCotizador from "../hooks/useCotizador";
import { MARCAS, PLANES } from "../constants";

export default function Resultado() {
  const { resultado, datos } = useCotizador();
  const { marca, plan, year } = datos;
  //useCallbak da una versión cacheada de la información, en los corchetes se le indica cuando dejar dehacerlo
  const [nombreMarca] = useCallback(
    MARCAS.filter((m) => m.id === Number(marca)),
    [resultado]
  );
  //useMemo es similar a useCallback, además optimiza el rendimiento
  //Para fines de aprendizaje en estos ejemplos uso ambas, useMemo no es recomendable usarlo
  //en todos los componentes de la aplicación, solo en los que se necesite
  const [nombrePlan] = useMemo( () =>
    PLANES.filter((p) => p.id === Number(plan)),
    [resultado]
  );
  //useRef "congela" el valor, en este caso se utiliza ya que al no ser una
  //función useCallback y useMemo no funcionan para year
  const yearRef = useRef(year);

  if (resultado === 0) return null;

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-600 font-black text-2xl">Resumen</h2>
      <p className="my-2">
        <span className="font-bold">Marca: </span>
        {nombreMarca.nombre}
      </p>
      <p className="my-2">
        <span className="font-bold">Plan: </span>
        {nombrePlan.nombre}
      </p>
      <p className="my-2">
        <span className="font-bold">Año del Auto: </span>
        {yearRef.current}
      </p>
      <p className="my-2 text-2xl">
        <span className="font-bold">Total Cotización: </span>
        {resultado}
      </p>
    </div>
  );
}
