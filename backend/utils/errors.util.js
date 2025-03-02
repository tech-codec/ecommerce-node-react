
exports.registerErrors = (error)=>{
    let errors = {name:"", email:"", password:"", firstName:""}

    if(error.message.includes("name"))
        errors.name = "Le nom est incorrect et doit avoir entre 3 et 55 caractères."
    if(error.message.includes("firstName"))
        errors.firstName = "Le prénom est incorrect et doit avoir entre 3 et 55 caractères."
    if(error.message.includes("email"))
        errors.email = "cet email est incorrecte ou dèjà pris"
    if(error.message.includes("password"))
        errors.password ="le mot de passe doit avoir au-moins 6 caractères"
    if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("name"))
        errors.name = "Ce nom est déjà pris";
    
      if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré";
    //longer  minimum  shorter maximum

    return errors
}

exports.loginErrors = (error)=>{
    let errors = {email:"", password:""}
    if (error.message.includes("email")) 
        errors.email = "Email inconnu";
      
    if (error.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"
    
    return errors;
}


exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
}