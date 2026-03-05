'use client';

import { useEffect, useState } from "react";

interface Solicitud {
    id: number;
    nombre: string;
    telefono: string;
    monto: number;
    estado: string;
}

export default function AprobadasPage() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSolicitudes = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/v1/solicitudes');
            const data = await res.json();
            setSolicitudes(data.filter((s: Solicitud) => s.estado === 'APROBADO'));
        } catch (error) {
            console.error('Error fetching solicitudes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    const handleActualizarMonto = async (id: number, monto: number) => {
        try {
            await fetch(`http://localhost:3001/api/v1/solicitudes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monto })
            });
        } catch (error) {
            console.error('Error updating solicitud:', error);
        }
    };

    if (loading) return <div className="text-center p-8 text-black">Cargando aprobados...</div>;

    return(
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-primary-2 mb-6">Tarjetas Aprobadas</h1>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Tarjeta Aprobado</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {solicitudes.map((s) => (
                            <tr key={s.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.telefono}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            defaultValue={s.monto}
                                            onBlur={(e) => handleActualizarMonto(s.id, parseFloat(e.target.value))}
                                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-1 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {solicitudes.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No hay tarjetas aprobadas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}