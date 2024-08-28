import React, { useState, useEffect } from 'react';
import Form from "../Form/Forma"

function Regras() {
  const [tempoRestante, setTempoRestante] = useState(35);
  const [podeEnviar, setPodeEnviar] = useState(false);
  const [mostraFormulario, setMostraFormulario] = useState(false);

  // Função para iniciar o temporizador e mostrar o formulário
  const iniciarFormulario = () => {
    <Form />
    setMostraFormulario(true);
    setTempoRestante(35);
    setPodeEnviar(false);
  };

  // Hook useEffect para gerenciar o temporizador
  useEffect(() => {
    let timer;
    if (mostraFormulario) {
      timer = setInterval(() => {
        setTempoRestante((prevTempo) => {
          if (prevTempo > 1) {
            return prevTempo - 1;
          } else {
            clearInterval(timer);
            setPodeEnviar(true); // Permite o envio quando o tempo acabar
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mostraFormulario]);

  // Função para lidar com o envio do formulário
  const enviarFormulario = () => {
    alert('Formulário enviado!');
    // Aqui você pode adicionar a lógica para enviar o formulário ou redirecionar
  };

  // Função para lidar com o cancelamento do formulário
  const cancelarFormulario = () => {
    alert('Formulário cancelado. Retornando ao formulário principal.');
    setMostraFormulario(false);
    setTempoRestante(25);
    setPodeEnviar(false);
  };

  return (
    <div>
      {!mostraFormulario ? (
        <button onClick={iniciarFormulario}>Iniciar Formulário</button>
      ) : (
        <div>
          <p>Normas de Submissão</p>
          <ol>
            <li>xxxxxxxxxxxxxxxxxx</li>
            <li>xxxxxxxxxxxxxx</li>
            <li>xxxxxxxxxxxxxx</li>
          </ol>
          <p>Tempo restante: {tempoRestante} segundos</p>
          <form>
            <label>
              Nome:
              <input type="text" name="nome" required />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <br />
            <button type="button" onClick={enviarFormulario} disabled={!podeEnviar}>
              Enviar
            </button>
            <button type="button" onClick={cancelarFormulario}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Regras;
