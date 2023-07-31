import { object, array, number, string } from 'yup';
import { startOfDay } from 'date-fns';

export const SearchFormSchema = object().shape({
  origin: object().shape({
    lat: number().required(),
    lon: number().required(),
    name: string().required(),
  }).required('Must be filled in'),
  destinations: array()
    .of(object().shape({
      lat: number().required(),
      lon: number().required(),
      name: string().required(),
    })
      .when((value, schema) => (
        value.length > 0
          ? schema.required('Must be filled in')
          : schema.notRequired()
      )))
    .min(1, 'Minimum one should present')
    .required('Must be filled in'),
  passengers: number()
    .typeError('Must be a number')
    .min(1, 'Must be at least 1')
    .max(30)
    .required('Must be filled in'),
  date: string()
    .test('is-in-future', 'Date must be in the future', (value) => {
      if (!value) return false;
      const today = startOfDay(new Date());
      const date = new Date(value);
      return date > today;
    })
    .required('Date must be filled in')
});
