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

    emailjs.sendForm('your_service_id', 'your_template_id', e.target, 'your_user_id')
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
        <label htmlFor="file">Upload do Arquivo (.doc):</label>
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