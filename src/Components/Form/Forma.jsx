import React from 'react';
import { useState } from "react";
import footerimg from "../../img/_footer.jpg";
import logoEncontro from '../../img/_encti.png';
import logoMED from '../../img/_mnte.png';
import logoMirex from '../../img/_mntrle.png';
import jsPDF from 'jspdf';
import BarraAzul from '../../img/corEfect.jpg';
import emailjs from 'emailjs-com';


// Importar a biblioteca que vai conecatar o front com a API


// import Axios from 'axios';

export default function Form() {

    const centerX = (docWidth, elementWidth) => (docWidth - elementWidth) / 2;

    const [showForm, setShowForm] = useState(true);

    // Declarando uma nova variavel dados com state e atribuir o objecto
    const [data, setData] = useState({
        nome: '',
        area: '',
        instituition: '',
        country: '',
        phone1: '',
        phone2: '',
        email: '',
        tema: '',
        resumo: '',
    }); 
    // Declarar variavel para receber a mensagem
    // const [mensagem, setMensagem] = useState(" ");

    // Receber os valores dos campos do formulario
    const valorInput = e => setData({ ...data, [e.target.name]: e.target.value });
    // Funcao
    const enviarDados = (e) => {
        // Bloquear o carregamento da pagina
        e.preventDefault();

        if (!data.nome || !data.area || !data.instituition || !data.country || !data.phone1 || !data.email || !data.tema || !data.resumo ) {
            alert("Por favor, preencha todos os campos corretamente.");
        }

        const TemplateParams = {
            from_name: data.nome,
            formatio_area: data.area,
            instituition_represent: data.instituition,
            your_country: data.country,
            your_phone1: data.phone1,
            your_phone2: data.phone2,
            email: data.email,
            tema: data.tema,
            resumo: data.resumo,
            //file_doc: data.file
        };

        emailjs.send("service_j9mor3t", "template_tv15f95", TemplateParams, "VUpV8h73I5hAtJioZ")
        //emailjs.send("service_k8rse5k", "template_acvlmdn", TemplateParams, "ElH6MxKBSzSx-5ZoY")
            .then((response) => {
                alert("Inscrição enviado com sucesso. Confirme o downloand da sua ficha", response.status, response.text);
                // Funcao para gerar pdf
                if (!data.nome || !data.area || !data.instituition || !data.country || !data.phone1 || !data.email || !data.resumo) {
                    alert("Por favor, preencha todos os campos corretamente.");
                } else {
                    // Criar um novo objeto jsPDF
                    const doc = new jsPDF();

                    // Barra Azul
                    const BarradWidth = 500;
                    const BarraHeight = 10;
                    doc.addImage(BarraAzul, 'PNG', 0, 0, BarradWidth, BarraHeight);

                    // Adicionar as insignias MED dentro do PDF
                    const logoMedWidth = 45;
                    const logoMedHeight = 25;
                    doc.addImage(logoMED, 'PNG', 5, 10, logoMedWidth, logoMedHeight);

                    // Adicionar as insignias MED dentro do PDF
                    const logoMirexWidth = 45;
                    const logoMirexHeight = 25;
                    doc.addImage(logoMirex, 'PNG', 155, 10, logoMirexWidth, logoMirexHeight);

                    // Adicionar insígnia no centro do PDF
                    const logoEncontroWidth = 65;
                    const logoEncontroHeight = 45;
                    doc.addImage(logoEncontro, 'PNG', centerX(doc.internal.pageSize.width, logoEncontroWidth), 36, logoEncontroWidth, logoEncontroHeight);

                    // Adicionar texto "Semana da Língua Portuguesa"
                    doc.setFont('Times New Roman', 'bold');
                    doc.setFontSize(25, 5);
                    doc.setTextColor(27, 117, 188); // Cor azul
                    doc.text("Encontro Internacional", centerX(doc.internal.pageSize.width, 0), 90, { align: 'center' });

                    // Adicionar parágrafo "Partilha de Saberes, com vista ao Desenvolvimento da Língua Portuguesa"
                    doc.setFont('Times New Roman');
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0); // Cor preta
                    doc.text("“Sobre Lexicologia, Lexicografia e Terminologia em Angola”", centerX(doc.internal.pageSize.width, 0), 97, { align: 'center' });

                    // Adicionar parágrafo "De 5 a 11 de Maio de 2023 - 4.ª edição"
                    doc.setFont('Times New Roman');
                    doc.text("De 13 a 15 de Novembro de 2024 - 1.ª edição", centerX(doc.internal.pageSize.width, 0), 104, { align: 'center' });

                    // Adicionar detalhes do formulário ao PDF com estilos personalizados
                    doc.setFont('Times New Roman');
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0); // Cor preta

                    // Adicionar campos do formulário
                    doc.text(`Nome: ${data.nome}`, 10, 140);
                    doc.text(`_________________________________________________________________________________`, 10, 141);
                    doc.text(`Área de Formação: ${data.area}`, 10, 147);
                    doc.text(`_________________________________________________________________________________`, 10, 148);
                    doc.text(`Instituição que representa: ${data.instituition}`, 10, 154);
                    doc.text(`_________________________________________________________________________________`, 10, 155);
                    doc.text(`País: ${data.country}`, 10, 161);
                    doc.text(`_________________________________________________________________________________`, 10, 162);
                    doc.text(`Contacto1: ${data.phone1}`, 10, 168);
                    doc.text(`_________________________________________________________________________________`, 10, 169);
                    doc.text(`Contacto2: ${data.phone2}`, 10, 175);
                    doc.text(`_________________________________________________________________________________`, 10, 176);
                    doc.text(`Email: ${data.email}`, 10, 182);
                    doc.text(`_________________________________________________________________________________`, 10, 183);
                    doc.text(`Tema: ${data.tema}`, 10, 189);
                    doc.text(`Resumo: ${data.resumo}`, 10, 196);
                    doc.text(`Arquivo: Word enviado com sucesso!`, 10, 223)

                    // Adicionar marca d'água na parte inferior do PDF
                    const footerimgWidth = 200;
                    const footerimgHeight = 10;
                    const footerimgX = (doc.internal.pageSize.width - footerimgWidth) / 2;
                    doc.addImage(footerimg, 'PNG', footerimgX, doc.internal.pageSize.height - footerimgHeight - 10, footerimgWidth, footerimgHeight);

                    // Salvar o arquivo PDF
                    doc.save(`Ficha_de_Inscricao__${data.nome}.pdf`);
                };
                setData({
                    nome: '',
                    area: '',
                    instituition: '',
                    country: '',
                    phone1: '',
                    phone2: '',
                    email: '',
                    tema: '',
                    resumo: '',
                    file: ''
                });

            }, (err) => {
                console.log("Erro: ", err);
            });
    };
    const WordDoc = () => {
        const emailRecipient = 'encontrointernacional.ao@gmail.com'; // Email do destinatário
        const emailSender = data.email; // Email do emissor
        const subject = 'Nome completo (o mesmo utilizado na ficha):'; // Assunto do e-mail (opcional)
        const body = 'Endereço de correio electrónico (o mesmo utilizado na ficha):      \n\n\nInsira o arquivo Word do Resumo'; // Corpo do e-mail (opcional)
    
       // window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailRecipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&bcc=${emailSender}`;
        window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${emailRecipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&bcc=${emailSender}`
        );

        setShowForm(true);
    };

    return (
        <div>
            {showForm ? (
            <section className="form__section">
                <div className="container form__section-container">
                    <div className="logoEncontro"><img src={logoEncontro} width="250" id="Encontro_internacional" /></div>
                    <h1 id="Tema">Encontro Internacional</h1>
                    <h1 id="Tema1">“Sobre Lexicologia, Lexicografia e Terminologia em Angola”</h1>
                    <h1 id="Tema3">De 13 a 15 de Novembro de 2024 - 1.ª edição</h1>
                    <h1 id="Tema5">Formulário de Inscrição</h1>


                    {/* Inicio do formulario, executar o onSubmit quando o usuario clicar no input submit e chamar a funcao enviarDados */}
                    <form action="" method="" onSubmit={enviarDados}>

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="text" name="nome" placeholder="Nome completo" onChange={valorInput} value={data.name} required />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="text" name="area" placeholder="Área de formação" onChange={valorInput} value={data.area} required />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="text" name="instituition" placeholder="Instituição que representa" onChange={valorInput} value={data.instituition} required />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="text" name="country" placeholder="País" onChange={valorInput} value={data.country} required />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="number" name="phone1" placeholder="Contacto 1" onChange={valorInput} value={data.phone1} required />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="number" name="phone2" placeholder="Contacto 2" onChange={valorInput} value={data.phone2} />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="email" name="email" placeholder="Endereço de correio electrónico" onChange={valorInput} value={data.email} required />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        <input type="text" name="tema" placeholder="Título da comunicação (Caso apresente cominicação)" onChange={valorInput} value={data.tema} required />

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        {/* Deixar o textarea com valor de caracteres em infinito*/}
                        <textarea name="resumo" id="Tema4" cols="30" rows="10" placeholder="Palavras Chaves" onChange={valorInput} value={data.resumo} maxLength={990000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000} required></textarea>

                        {/* Criar o campo, quando o usuario digitar valor no campo, chamar com onChange a funcao valorInput*/}
                        {/* Editar o valor do placeholder e remover as bordas*/}
                        {/* <input type="file" onChange={valorInput} name="file"  value={data.file} accept=".doc,.docx,.pdf" required />*/}
                        
                        {/* Imprimir a mensagem retornada da API*/}
                        {/*mensagem ? <p>{mensagem}</p> : ""*/}

                        <input type="submit" name="Increver" value="Inscrever-se" className="btn" />
                    </form>
                    <label htmlFor="" onClick={WordDoc} >Por favor envie o seu resumo no formato Word.doc -->  <a onClick={WordDoc} > Enviar Resumo</a></label>
                    {/* <EmailButton />*/}
                    <img src={footerimg} width="780" id="_footer" />
                </div>
            </section>) : (
                <button onClick={WordDoc}>
                  Enviar E-mail
                </button>
              )}
        </div>
    );
}