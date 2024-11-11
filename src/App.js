import React from 'react';
import './App.css';
import ListaDocentes from './Trabajadores/Docente'; // Importa ListaDocentes
import Cliente from './Trabajadores/Cliente'; // Importa Cliente

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bienvenido a la Aplicación de Gestión</h1>
            </header>
            <main>
                <ListaDocentes /> {/* Renderiza ListaDocentes */}
                <Cliente /> {/* Renderiza Cliente */}
            </main>
        </div>
    );
}

export default App;
