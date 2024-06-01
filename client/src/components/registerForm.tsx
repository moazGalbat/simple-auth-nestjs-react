import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchemaType, registerSchema } from '../validations/register';
import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../utils/apis';
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerApi,
  });
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        name:
        <input
          type="text"
          placeholder="name"
          {...register('name')}
        />
        {errors.name && (
          <span>{errors.name?.message}</span>
        )}
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          placeholder="email"
          {...register('email')}
        />
        {errors.email && (
          <span>{errors.email?.message}</span>
        )}
      </label>

      <label htmlFor="password">
        Password:
        <input
          type="password"
          placeholder="password"
          {...register('password')}
        />
        {errors.password && (
          <span>{errors.password?.message}</span>
        )}
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
