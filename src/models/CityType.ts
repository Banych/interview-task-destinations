// export type CityType = {
//   name: string;
//   lat: number;
//   lon: number;
// }

import { InferType } from "yup";
import { CitySchema } from "./searchFormValidationModel";

export type CityType = InferType<typeof CitySchema>;