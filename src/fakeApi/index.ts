import data from "./data"
import { CityType } from "../models/CityType";

const fetch = (search: string) =>
  new Promise<CityType[]>((res) => {
    setTimeout(() => res(
      data.filter((city =>
        city[ 0 ]
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      ))
        .map(([
          name,
          lat,
          lon
        ]): CityType => ({
          lat,
          lon,
          name: name
        }))
    ), 500)
  })

export default fetch;