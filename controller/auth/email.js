import axios from 'axios';
import API_BASE_URL from "../api.js"
import { Alert } from 'react-native';
import emailjs from 'emailjs-com';

export const sendEmail = async (email,code) => {
    const templateParams = {
        to_email: email,
        message: 'A continuacion le enviamos el codigo de 5 digitos para que pueda recuperar su contraseña: ' + code  
        ,
      };
      emailjs.init('l_Wam9RV1OhZxbQT5');
      emailjs
        .send('service_fg28m5o', 'template_dbwl4u4', templateParams, 'l_Wam9RV1OhZxbQT5')
        .then((result) => {
          console.log('Email sent successfully:', result.text);
        })
        .catch((error) => {
          console.error('Error sending email:', error.text);
        });
};

export const sendSupportEmail = async (email,subject,content) => {
  const templateParams = {
      to_email: email,
      subject: subject,
      message: content  
      ,
    };
    emailjs.init('l_Wam9RV1OhZxbQT5');
    emailjs
      .send('service_fg28m5o', 'template_ptnd8eo', templateParams, 'l_Wam9RV1OhZxbQT5')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
      });
};
