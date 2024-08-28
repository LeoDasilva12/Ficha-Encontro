import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    message: '' 
});

  const [file, setFile] = useState(null);

  const handleChange = (e) => {setFormData({...formData,[e.target.name]: e.target.value,});};

  const handleFileChange = (e) => {setFile(e.target.files[0]);};

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('file', file);

    emailjs.sendForm('service_j9mor3t', 'template_acvlmdn', e.target, 'ElH6MxKBSzSx-5ZoY')
      .then((result) => {
        console.log(result.text);
        alert('Email enviado com sucesso!');
      }, (error) => {
        console.log(error.text);
        alert('Erro ao enviar o email.');
      });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message">Mensagem:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="file">Upload do Arquivo (.docx):</label>
        <input
          type="file"
          name="file"
          accept=".doc,.docx"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;