export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};


export const extractUploads = (filePath) => {
  if (typeof filePath === 'string') {
    const tab = filePath.split('/shared');
    if (tab.length > 1) {
      return tab[1];
    }
  }
  return null;
};

export const generatePassword = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}


export function formatNumberWithSeparators(number, separator = ' ') {
  // Convertir le nombre en chaîne de caractères
  const numStr = number?.toString();

  // Utiliser une expression régulière pour insérer des séparateurs
  // L'expression (\d)(?=(\d{3})+(?!\d)) correspond à chaque chiffre qui a exactement un multiple de trois chiffres à sa droite
  const formattedNum = numStr?.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return formattedNum;
}



// Helper function to format numbers
export function formatNumberWithSeparators_2(number) {
  if (!number) return '';
  // Split integer and decimal parts
  const [integerPart, decimalPart] = number.split(',');
  // Format the integer part with thousand separators
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // Combine the formatted integer part and the decimal part
  return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
}

export function removeTrailingZeros(num) {
  // Convert the number to a string
  let numStr = num?.toString();

  // Check if the number ends with at least two zeros
  if (numStr?.endsWith("00")) {
      // Remove the last two zeros
      numStr = numStr?.slice(0, -2);
  }

  // Convert back to a number (if needed) and return
  return parseFloat(numStr);
}




