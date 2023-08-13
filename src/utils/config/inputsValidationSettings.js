const minNameLength = 2;
const maxNameLength = 30;

const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$';

export { minNameLength, maxNameLength, passwordRegex };
