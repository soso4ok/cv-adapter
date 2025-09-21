import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>⚡ CV Adapter</h1>
                <p>Адаптуйте своє резюме під будь-яку вакансію за допомогою AI</p>
            </header>
            <main className="App-main">
                <div className="form-container">
                    <div className="form-section">
                        <h2>1. Завантажте ваше CV</h2>
                        <input type="file" />
                    </div>

                    <div className="form-section">
                        <h2>2. Вставте опис вакансії</h2>
                        <textarea placeholder="Вставте текст вакансії сюди..."></textarea>
                    </div>

                    <button className="generate-button">
                        🚀 Generate CV
                    </button>
                </div>
            </main>
        </div>
    );
}

export default App;