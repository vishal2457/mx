export const generatePassword = () => {
   const length = 11;
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%&-_.';

    if (length < 10) {
      throw new Error('Password length must be greater than 10 characters.');
    }

    let password = '';
    password +=
      lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    password +=
      upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password length with random characters from all sets
    const allChars = lowerCaseChars + upperCaseChars + numbers + specialChars;
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
      return password
}
