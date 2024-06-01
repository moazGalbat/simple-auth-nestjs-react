import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPasswordComplex(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordComplex',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          const re =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.*!@#$%^&*(),.?":{}|<>])[A-Za-z\d.*!@#$%^&*(),.?":{}|<>]{8,}$/;
          return re.test(value);
        },
      },
    });
  };
}
