 // Utilitaire pour convertir FormData en objet simple
 const formDataToObject = (formData) => {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }
    return obj;
  };

  const onSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObj = formDataToObject(formData)
    const formJson = JSON.stringify(formObj)
    dispatch(resetPassword(token, ))
  }



  const isUniqueName = (name) => {
    const userExists = usersData.some(
      (u) => u.name === name && u._id !== getValues('_id')
    );
    return !userExists || 'Le nom existe déjà';
  };

  const isUniqueEmail = (email) => {
    const emailExists = usersData.some(
      (u) => u.email === email && u._id !== getValues('_id')
    );
    return !emailExists || 'L\'email existe déjà';
  };


  if (newMotCle.length < 4 || newMotCle.length > 100) {
    alert("Chaque mot-clé doit contenir entre 4 et 100 caractères.");
    return;
  }

  if (localListMotCle.length >= 10) {
    alert("Vous ne pouvez pas ajouter plus de 10 mots-clés.");
    return;
  }