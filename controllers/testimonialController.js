import {Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, resp) => {

    //validar 
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim()=== ''){
      errores.push({mensaje: 'Nombre esta vacio!'});
    }

    if(correo.trim()=== ''){
        errores.push({mensaje: 'Correo esta vacio!'});
     }

     if(mensaje.trim()=== ''){
        errores.push({mensaje: 'Mensaje esta vacio!'});
     }

     if(errores.length > 0){
         //consultar testimoniales existentes 
         const testimoniales = await Testimonial.findAll({limit:3});

         //mostrar vista con errores

         resp.render('testimoniales', {
             pagina: 'Testimoniales',
             errores,
             nombre,
             correo,
             mensaje,
             testimoniales
         })
     }else{
         //guardarlo en el db
         try {
             await Testimonial.create({
                 nombre,
                 correo,
                 mensaje
             });
             resp.redirect('/testimoniales');
         } catch (error) {
             console.log(error);
         }
     }
}    

export {
    guardarTestimonial
}