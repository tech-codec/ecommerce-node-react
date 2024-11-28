function formatNumberWithSeparators(number, separator = ' ') {
    // Convertir le nombre en chaîne de caractères
    const numStr = number?.toString();
  
    // Utiliser une expression régulière pour insérer des séparateurs
    // L'expression (\d)(?=(\d{3})+(?!\d)) correspond à chaque chiffre qui a exactement un multiple de trois chiffres à sa droite
    const formattedNum = numStr?.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  
    return formattedNum;
  }
  
 export default formatNumberWithSeparators