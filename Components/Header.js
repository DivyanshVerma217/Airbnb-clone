import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import {useRouter} from "next/dist/client/router";
import useDarkMode from "../hooks/useDarkMode";

function Header({placeholder}) {
  const [colorTheme, setTheme] = useDarkMode();
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests]= useState(1)
  const router= useRouter()

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput=()=>{

    setSearchInput("");

  }

  const search  =()=>{
    router.push({
      pathname: '/search',
      query:{
        location:searchInput,
        startDate:startDate.toISOString(),
        endDate:endDate.toISOString(),
        noOfGuests
      }
    });
  }


  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header
      className="sticky top-0 z-50 grid grid-cols-3 bg-white 
        shadow-md p-5 md:px-10"
    >
      <div className="relative flex items-center h-10 cursor-pointer my-auto  ">
        <Image
          onClick={()=>router.push("/")}
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      <div className=" flex items-center md:border-2 rounded-full py-2 md:shadow-sm border-2 ">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className=" flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400 "
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer  " />
      </div>

      <div className=" flex items-center space-x-4 justify-end text-gray-600">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
        {colorTheme === "light" ? (
          <svg
            onClick={() => setTheme("light")}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setTheme('dark')}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto ">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">
                  Number of Guests
              </h2>
              <UsersIcon className="h-5"/>
              <input type="number" 
              value= {noOfGuests}
              onChange={(e)=> setNoOfGuests(e.target.value )}
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"/>
          </div>


          <div className="flex">
              <button onClick={resetInput} className="flex-grow text-gray-500 font-semibold">Cancel</button>
              <button onClick={search} className="flex-grow text-red-400 font-bold  ">Search</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
