document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eco-form');
    const resultSection = document.getElementById('result-section');
    const co2Result = document.getElementById('co2-result');
    const routeSummary = document.getElementById('route-summary');
    const tipText = document.getElementById('tip-text');
    const resetBtn = document.getElementById('reset-btn');

    // Fatores de emissão mockados (kg CO2 por km por pessoa - valores ilustrativos)
    const emissionFactors = {
        plane: 0.285,
        car: 0.104, // Assumindo carro dividido
        bus: 0.068,
        train: 0.014
    };

    const ecoTips = {
        plane: "Voos curtos emitem mais CO2 por km. Considere pegar um trem ou ônibus para distâncias menores que 500km.",
        car: "Dar carona ou usar aplicativos de compartilhamento de viagens reduz drasticamente a pegada de carbono por passageiro.",
        bus: "Ótima escolha! Ônibus são uma das formas mais eficientes de viajar longas distâncias.",
        train: "Excelente! Trens elétricos são a opção de transporte motorizado mais ecológica disponível."
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        const transport = document.getElementById('transport').value;
        const passengers = parseInt(document.getElementById('passengers').value);

        // Mockando uma distância aleatória entre 100km e 2000km para o exemplo
        const mockDistance = Math.floor(Math.random() * 1900) + 100;

        // Cálculo mockado
        const factor = emissionFactors[transport];
        const totalEmission = (mockDistance * factor) / passengers;

        // Atualizando a UI
        co2Result.textContent = totalEmission.toFixed(1).replace('.', ',');
        routeSummary.innerHTML = `De <strong>${origin}</strong> para <strong>${destination}</strong> (${mockDistance}km estimados) em <strong>${getTransportName(transport)}</strong> para ${passengers} pessoa(s).`;
        tipText.textContent = ecoTips[transport];

        // Mostrando o resultado com animação
        resultSection.classList.remove('hidden');
        resultSection.classList.add('fade-in');
        
        // Scroll suave para o resultado
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        resultSection.classList.add('hidden');
        resultSection.classList.remove('fade-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function getTransportName(key) {
        const names = {
            plane: 'Avião',
            car: 'Carro',
            bus: 'Ônibus',
            train: 'Trem'
        };
        return names[key];
    }
});
