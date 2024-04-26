import { ValidationObj } from "../models/validation-obj";

export const validationRules: Record<string, ValidationObj> = {
  name: {
    required: true, 
    regexp: /^[a-zA-Z]{3}.*$/,  
    error: 'The name must be at least 3 letters long'
  },
  vacancy: {
    required: true, 
    regexp: /^[a-zA-Z]{3}.*$/,  
    error: 'The vacancy must be at least 3 letters long'
  },
  phone: {
    required: true,
    regexp: /^(\+?)[78]\d{10}$/,
    error: 'The number must folow RU region format'
  }
}