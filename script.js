const form = document.getElementById("impactForm");
const resultCard = document.getElementById("resultCard");

const emissionFactors = {
  carro: {
    label: "Carro",
    emoji: "🚗",
    factor: 0.192,
  },
  onibus: {
    label: "Ônibus",
    emoji: "🚌",
    factor: 0.089,
  },
  aviao: {
    label: "Avião",
    emoji: "✈️",
    factor: 0.255,
  },
  moto: {
    label: "Moto",
    emoji: "🏍️",
    factor: 0.103,
  },
  bicicleta: {
    label: "Bicicleta",
    emoji: "🚲",
    factor: 0,
  },
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const distance = Number(document.getElementById("distance").value);
  const transport = document.getElementById("transport").value;

  if (!distance || distance <= 0) {
    showError("Informe uma distância válida para calcular o impacto.");
    return;
  }

  if (!transport) {
    showError("Selecione um meio de transporte.");
    return;
  }

  const selectedTransport = emissionFactors[transport];
  const emission = calculateEmission(distance, selectedTransport.factor);
  const impact = getImpactLevel(emission);
  const bestAlternative = getBestAlternative(transport, distance);
  const tip = getEcoTip(transport, emission);

  renderResult({
    distance,
    selectedTransport,
    emission,
    impact,
    bestAlternative,
    tip,
  });
});

function calculateEmission(distance, factor) {
  return distance * factor;
}

function getImpactLevel(emission) {
  if (emission <= 10) {
    return {
      label: "Impacto baixo",
      className: "impact-low",
      description: "Sua viagem possui uma emissão relativamente baixa de CO₂.",
    };
  }

  if (emission <= 50) {
    return {
      label: "Impacto moderado",
      className: "impact-medium",
      description: "Sua viagem possui uma emissão intermediária de CO₂.",
    };
  }

  return {
    label: "Impacto alto",
    className: "impact-high",
    description: "Sua viagem possui uma emissão elevada de CO₂.",
  };
}

function getBestAlternative(currentTransport, distance) {
  const alternatives = Object.entries(emissionFactors)
    .filter(([key]) => key !== currentTransport)
    .map(([key, item]) => {
      return {
        key,
        ...item,
        emission: calculateEmission(distance, item.factor),
      };
    })
    .sort((a, b) => a.emission - b.emission);

  return alternatives[0];
}

function getEcoTip(transport, emission) {
  if (transport === "bicicleta") {
    return "Excelente escolha! A bicicleta não gera emissão direta de CO₂ e ainda contribui para a saúde.";
  }

  if (transport === "aviao") {
    return "Para distâncias menores, avalie alternativas como ônibus ou carro compartilhado para reduzir o impacto.";
  }

  if (transport === "carro") {
    return "Sempre que possível, compartilhe a viagem com outras pessoas ou considere transporte coletivo.";
  }

  if (transport === "moto") {
    return "A moto pode emitir menos que um carro, mas ainda gera impacto. Para trajetos curtos, considere bicicleta ou caminhada.";
  }

  if (transport === "onibus") {
    return "Boa escolha! O ônibus tende a ter menor emissão por passageiro em comparação ao transporte individual.";
  }

  if (emission > 50) {
    return "Como a emissão foi alta, vale considerar reduzir deslocamentos, compensar carbono ou escolher meios coletivos.";
  }

  return "Pequenas mudanças na escolha do transporte podem gerar grande impacto positivo no meio ambiente.";
}

function renderResult(data) {
  const {
    distance,
    selectedTransport,
    emission,
    impact,
    bestAlternative,
    tip,
  } = data;

  const emissionFormatted = emission.toFixed(2);
  const alternativeEmission = bestAlternative.emission.toFixed(2);
  const saving = Math.max(emission - bestAlternative.emission, 0).toFixed(2);

  resultCard.innerHTML = `
    <h2>Resultado da simulação</h2>

    <div class="result-content">
      <span class="impact-badge ${impact.className}">
        ${impact.label}
      </span>

      <p>${impact.description}</p>

      <div class="emission-value">
        <strong>${emissionFormatted} kg</strong>
        <span>de CO₂ estimados</span>
      </div>

      <div class="result-list">
        <div>
          <strong>Transporte escolhido:</strong>
          ${selectedTransport.emoji} ${selectedTransport.label}
        </div>

        <div>
          <strong>Distância informada:</strong>
          ${distance} km
        </div>

        <div>
          <strong>Alternativa com menor emissão:</strong>
          ${bestAlternative.emoji} ${bestAlternative.label}
          — ${alternativeEmission} kg de CO₂
        </div>

        <div>
          <strong>Possível redução:</strong>
          até ${saving} kg de CO₂
        </div>
      </div>

      <div class="eco-tip">
        <strong>Dica sustentável:</strong>
        <p>${tip}</p>
      </div>
    </div>
  `;
}

function showError(message) {
  resultCard.innerHTML = `
    <h2>Resultado da simulação</h2>

    <div class="eco-tip">
      <strong>Atenção:</strong>
      <p>${message}</p>
    </div>
  `;
}
