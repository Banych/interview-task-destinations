import { object, array, number, date, string } from 'yup';

export const SearchFormSchema = object().shape({
  origin: object().shape({
    lat: number().required(),
    lon: number().required(),
    name: string().required(),
  }).required('City of origin must be filled in'),
  destinations: array()
    .of(object().shape({
      lat: number().required(),
      lon: number().required(),
      name: string().required(),
    })
      .when((value, schema) => (
        value.length > 0
          ? schema.required('City of destination must be filled in')
          : schema.notRequired()
      )))
    .min(1, 'Minimum one destination city should present')
    .required(),
  passengers: number()
    .min(1)
    .required(),
  date: date()
    .required()
});
