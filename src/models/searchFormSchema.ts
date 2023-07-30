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
    .required('City of destination must be filled in'),
  passengers: number()
    .typeError('Must be a number')
    .min(1)
    .max(30)
    .required('Number of passengers must be filled in'),
  date: string()
    .test('is-in-future', 'Date must be in the future', (value) => {
      if (!value) return false;
      const now = new Date();
      const date = new Date(value);
      return date > now;
    })
    .required('Date must be filled in')
});
