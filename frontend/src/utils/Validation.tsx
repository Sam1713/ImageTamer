// validation.ts
export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validateUsername = (username: string): boolean => {
    return username.length >= 3 && username.length <= 20;
  };
  
  export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  export const validatePhone = (phone: string): boolean => {
    const regex = /^[0-9]{10,15}$/;
    return regex.test(phone);
  };
  