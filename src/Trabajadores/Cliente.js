import React, { useEffect, useState } from 'react';
import '../App.css'; // Asegúrate de que el archivo CSS esté correcto
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, BarElement, ArcElement, Tooltip, Legend);

const Cliente = () => {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                setError(error);
                console.error('Fetch error:', error);
            }
        };
        fetchData();

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    // Preparar datos para la gráfica de todos los clientes
    const globalChartData = {
        labels: clientes.map(cliente => cliente.nombre),
        datasets: [
            {
                label: 'ID de Clientes',
                data: clientes.map(cliente => cliente.id),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const globalChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: clientes.length + 2, // Ajuste dinámico según la cantidad de clientes
                ticks: { stepSize: 1 }, // Incrementos de 1 en el eje y
            },
        },
    };

    // Calcular la distribución por sexo (H, M, I)
    const sexoCount = clientes.reduce(
        (acc, cliente) => {
            if (cliente.sexo === 'H') acc.H++;
            if (cliente.sexo === 'M') acc.M++;
            if (cliente.sexo === 'I') acc.I++;
            return acc;
        },
        { H: 0, M: 0, I: 0 }
    );

    // Datos para la gráfica de pastel
    const pieChartData = {
        labels: ['Hombres', 'Mujeres', 'Indefinido'],
        datasets: [
            {
                label: 'Distribución por Sexo',
                data: [sexoCount.H, sexoCount.M, sexoCount.I],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="container">
            <h1 className="App App-link">LISTA DE CLIENTES</h1>
            <div className="card-container">
                {error ? (
                    <div className="error">Error: {error.message}</div>
                ) : (
                    clientes.map((cliente) => (
                        <div key={cliente.id} className="card">
                            <div className="card-content">
                                <h2>ID: {cliente.id}</h2>
                                <p><strong>Nombre:</strong> {cliente.nombre}</p>
                                <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                                <p><strong>Sexo:</strong> {cliente.sexo}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Gráfica de barras */}
            <div className="global-chart-container" style={{ maxWidth: '500px', height: '300px', margin: '0 auto' }}>
                <h2>Gráfica de IDs de Todos los Clientes</h2>
                <Bar data={globalChartData} options={globalChartOptions} />
            </div>

            {/* Gráfica de pastel */}
            <div className="pie-chart-container" style={{ maxWidth: '500px', height: '300px', margin: '20px auto' }}>
                <h2>Distribución por Sexo</h2>
                <Pie data={pieChartData} options={pieChartOptions} />
            </div>
        </div>
    );
};

export default Cliente;
