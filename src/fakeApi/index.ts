import data from "./data"
import { CityType } from "../models/CityType";

export const fetch = (search: string) =>
  new Promise<CityType[]>((res, rej) => {
    if (search.toLowerCase() === 'dijon') {
      setTimeout(() => rej('Dijon is not a city'), 500)
    }
    setTimeout(() => {
      const cities = data.filter((city =>
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
      if (cities.length === 0) {
        rej('No city found')
      } else {
        res(cities);
      }
    }, 500)
  });

export const fetchCitiesByNames = (names: string[]) =>
  new Promise<CityType[]>((res) => {
    setTimeout(() => {
      let cities: CityType[] = [];
      names.forEach((name) => {
        const city = data.find((city =>
          city[ 0 ]
            .toLowerCase()
            .includes(
              name.toLowerCase()
            )
        ))
        if (city) {
          cities.push({
            lat: city[ 1 ],
            lon: city[ 2 ],
            name: city[ 0 ]
          })
        }
      })
      res(cities);
    }, 500)
  });
