// import { CityType } from "./CityType"

import { InferType } from "yup";
import { SearchFormSchema } from "./searchFormValidationModel";

// export type SearchFormModel = {
//   origin: CityType;
//   destinations: Partial<CityType>[];
//   passengers: number;
//   date: Date;
// }

export type SearchFormModel = InferType<typeof SearchFormSchema>;