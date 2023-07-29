import { object, array, number, date, string, ObjectSchema, mixed, InferType } from 'yup';

export const CitySchema = object().shape({
  lat: number().required(),
  lon: number().required(),
  name: string().required(),
});

export const SearchFormSchema =
  object().shape({
    origin: CitySchema
      .required('City of origin must be filled in'),
    destinations: array()
      .of(CitySchema.when((value, schema) => (
        value.length > 0
          ? schema.nonNullable().required('City of destination must be filled in')
          : schema.nullable()
      )))
      .min(1, 'Minimum one destination city should present')
      .required(),
    // passengers: number()
    //   .min(1)
    //   .required(),
    // date: date()
    //   .required()
  });