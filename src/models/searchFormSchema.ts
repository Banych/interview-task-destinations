import { object, array, number, date, string, ObjectSchema, mixed, InferType } from 'yup';
import { CityType } from "./CityType";
import { SearchFormModel } from "./searchForm";

// export const CitySchema = object().shape({
//   lat: number().required(),
//   lon: number().required(),
//   name: string().required(),
// });

// export const SearchFormSchema =
//   object().shape({
//     origin: CitySchema
//       .required('City of origin must be filled in'),
//     destinations: array()
//       .of(CitySchema.when((value, schema) => (
//         value.length > 0
//           ? schema.nonNullable().required('City of destination must be filled in')
//           : schema.nullable()
//       )))
//       .min(1, 'Minimum one destination city should present')
//       .required(),
//     // passengers: number()
//     //   .min(1)
//     //   .required(),
//     // date: date()
//     //   .required()
//   });

// help write yup schema with validation rules for nested objects for
// the form with origin city, list of destinations city,
// number of passengers and date
// use already prepared CityType from src\models\CityType.ts and
// SearchFormModel from src\models\searchForm.ts
// I want to use it in react-final-form in resolver function
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
