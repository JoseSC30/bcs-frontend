'use client'

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react";

interface Solicitud {
    id: number;
    nombre: string;
    telefono: string;
    estado: string;
}

export default function GestionPage() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSolicitudes = async () => {
        try {
            const res = await fetch('http://192.168.0.9:3001/api/v1/solicitudes');
            const data = await res.json();

            setSolicitudes(data.filter((s: Solicitud) => s.estado === 'PENDIENTE'));
        } catch (error) {
            console.error('Error fetching solicitudes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    const handleEstado = async (id: number, estado: 'APROBADO' | 'RECHAZADO') => {
        try {
            const res = await fetch(`http://192.168.0.9:3001/api/v1/solicitudes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado }),
            })

            if (res.ok) {
                setSolicitudes(solicitudes.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error(`Error updating solicitud ${id}:`, error);
        }
    };

    if (loading) return <div className="text-center p-8 text-black">Cargando solicitudes....</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary-2 mb-6">Gestión de Solicitudes</h1>

            {solicitudes.length === 0 ? (
                <div className="text-gray-500">No hay solicitudes pendientes.</div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {solicitudes.map((s) => (
                            <li key={s.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{s.nombre}</h3>
                                    <p className="text-gray-600">Tel: {s.telefono}</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleEstado(s.id, 'APROBADO')}
                                        className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                                        title="Aprobar"
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleEstado(s.id, 'RECHAZADO')}
                                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                        title="Rechazar"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                )}
        </div>
    );

}