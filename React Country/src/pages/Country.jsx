import { useEffect, useState, useTransition } from "react"
import { getCountryData } from "../api/PoatApi";
import { Loader } from "../components/UI/loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";

const Country = () => {

  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  }

  const filterReagion = (country) => {
    if (filter === "all") return country;
    return country.region === filter;
  }

  const filterCountry = countries.filter((country) => searchCountry(country) && filterReagion(country))

  return (
    <section className="country-section">

      <SearchFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} countries={countries} setCountries={setCountries}/>

      <ul className="grid grid-four-cols">
        {
          filterCountry.map((curCountry, index) => {
            return <CountryCard country={curCountry} key={index} />;
          })
        }
      </ul>
    </section>
  )
}

export default Country
