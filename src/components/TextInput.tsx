// src/components/TextInput.tsx
import { type InputHTMLAttributes } from 'react';
import type { UseFormRegister, FieldValues, FieldErrors, Path } from 'react-hook-form'; // Importe 'Path'
 // Importe 'Path'

// Torne a interface genérica com um tipo TFieldValues que estende FieldValues
interface TextInputProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<TFieldValues>; // Use Path para garantir que 'name' seja uma chave válida do formulário
  register: UseFormRegister<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  validationRules?: Record<string, unknown>;
}

// O componente agora também é genérico
function TextInput<TFieldValues extends FieldValues>({
  label,
  name,
  register,
  errors,
  validationRules,
  ...rest
}: TextInputProps<TFieldValues>) {
  const hasError = errors && errors[name];

  return (
    <div className="w-full">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        className={`
          bg-gray-100 outline-none p-3 text-base border-b-2 rounded-md w-full transition-colors duration-200
          ${hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
          focus:ring-2 focus:ring-blue-200
        `}
        {...register(name, validationRules)}
        {...rest}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {/* Acessar a mensagem do erro de forma mais segura */}
          {typeof hasError.message === 'string' ? hasError.message : 'This field is required.'}
        </p>
      )}
    </div>
  );
}

export default TextInput;