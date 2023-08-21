const nameRegex = /^[a-zA-Zа-яА-Я\s-]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export { nameRegex, passwordRegex };
