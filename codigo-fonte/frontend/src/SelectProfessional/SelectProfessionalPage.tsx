import React, { useState } from 'react';
import styles from './selectProfessional.module.scss';


function SelectProfessionalPage() {
    const [selectedProfessional, setSelectedProfessional] = useState('');

    const professionals = ['Lucas Henrique', 'Lucas Vinicios', 'Matheus Kezuka', 'Gabriel Nakahata'];

    const handleSelectionChange = (event) => {
        setSelectedProfessional(event.target.value);
    };

    const handleSubmit = () => {
        alert(`Você selecionou: ${selectedProfessional}`);
    };

    return (
        <div className={styles.selectProfessionalContainer}>
            <h1>Olá! Selecione o profissional que deseja para realizar o seu atendimento:</h1>
            <select value={selectedProfessional} onChange={handleSelectionChange} className={styles.select}>
                <option value="">Selecione</option>
                {professionals.map(professional => (
                    <option key={professional} value={professional}>{professional}</option>
                ))}
            </select>
            <button onClick={handleSubmit} className={styles.button}>Escolher</button>
        </div>
    );
}


export default SelectProfessionalPage;
