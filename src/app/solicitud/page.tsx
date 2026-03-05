'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SolicitudPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: '',
        documento: '',
        correo: '',
        telefono: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string} | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:3001/api/v1/solicitudes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Error al enviar la solicitud');

            setMessage({ type: 'success', text: 'Solicitud enviada exitosamente' });
            setFormData({ nombre: '', documento: '', correo: '', telefono: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Hubo un problema al enviar la solicitud.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-primary-2 mb-6">Solicitar Tarjeta de Crédito</h1>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Nombre Completo</label>
                    <input
                        type="text"
                        name='nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-1 focus:outline-none text-black"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Documento de Identidad</label>
                    <input
                        type="text"
                        name='documento'
                        value={formData.documento}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-1 focus:outline-none text-black"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Correo Electrónico</label>
                    <input
                        type="text"
                        name='correo'
                        value={formData.correo}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-1 focus:outline-none text-black"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
                    <input
                        type="text"
                        name='telefono'
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-1 focus:outline-none text-black"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-1 text-white py-3 rounded font-bold hover:bg-primary-2 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
            </form>
        </div>
    )
}