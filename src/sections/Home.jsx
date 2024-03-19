import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { LuWaves } from "react-icons/lu";
import { FaWind } from "react-icons/fa";

const Home = () => {
    const [searchbox, setSearchbox] = useState("Philippines");
    const [weatherData, setWeatherData] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
        "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
        "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
        "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
        "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
        "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
        "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
        "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
        "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
        "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
        "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
        "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ]

    let API_URL = "http://api.weatherapi.com/v1/current.json?key="+process.env.REACT_APP_WEATHER_API_KEY+"&q=Philippines&aqi=no";

    if(searchbox != null) {
        API_URL = "http://api.weatherapi.com/v1/current.json?key="+process.env.REACT_APP_WEATHER_API_KEY+"&q="+searchbox+"&aqi=no"; 

    }

    const GetWeather = () => {
        // http://api.weatherapi.com/v1/current.json?key=4f1dfe3b4a7541909d905432241803&q=Philippines&aqi=no
        fetch(API_URL).then(response => response.json())
        .then(data => {
            setWeatherData(data);
            // console.log(process.env.REACT_APP_WEATHER_API_KEY);
            console.log(data);
            console.log(data.current.condition.icon);
            // console.log(data.current.temp_c)
        })
        .catch(error => {
            console.log("Err: "+error);
        });
    }

    const HandleInput = (event) => {
        const inputValue = event.target.value;
        setSearchbox(inputValue);
        const filterSuggestions = countries.filter(country => 
            country.toLowerCase().includes(inputValue.toLowerCase())
        )
        setSuggestions(filterSuggestions);
    }

    const HandleSelectedCountry = (value) => {
        setSearchbox(value);
        setSuggestions([]);
        // GetWeather();
    }


    useEffect(() => {
        GetWeather();
    }, [])

  return (
    <div className='flex justify-center items-center w-full  h-screen bg-primary-color'>
        {
            weatherData ? (
                <div className='flex flex-col p-5 max-w-[400px] w-[40%] justify-start items-center min-h-[550px] max-h-[600px] h-[80%] bg-white rounded-xl'>
                    <div className='flex flex-row w-full'>
                        <input className='border-2 p-2 rounded-xl w-full mr-2' value={searchbox} onChange={HandleInput} type="text" placeholder='Input a Country' />
                        {
                            setSearchbox != "" ? (
                                <ul className='absolute mt-14 p-2 bg-white z-20 w-fit border-2 max-h-[300px] overflow-y-auto'>
                                    {suggestions.map((suggestion, index) => (
                                    <li className='hover:bg-blue-600 px-5 py-2 rounded-md cursor-pointer  hover:text-white duration-200' key={index} onClick={() => HandleSelectedCountry(suggestion)}>
                                        {suggestion}
                                    </li>
                                    ))}
                                </ul>
                            ) : console.log()
                        }
                        <button className='p-4 border-2 rounded-xl' onClick={() => GetWeather()}>
                            <CiSearch />
                        </button>
                        
                    </div>
                    {/* ICON HERE  */}
                    <img className='w-[50%]' src={weatherData.current.condition.icon} alt="" />
                    {/* LOCATION  */}
                    <h3 className='text-2xl font-[Impact] tracking-widest opacity-80 mb-2'>{weatherData.location.country}</h3>
                    <h1 className='text-5xl font-[Impact] tracking-widest opacity-80 mb-2'>{weatherData.location.name}</h1>
                    <h2 className='text-3xl font-[Impact] tracking-widest opacity-80'>{weatherData.current.temp_c}°c</h2>
                    <h3 className='text-2xl font-[Impact] tracking-widest opacity-80'>{weatherData.location.localtime.substring(0, 10)}</h3>
                    <h3 className='text-2xl font-[Impact] tracking-widest opacity-80 mb-2'>{weatherData.current.condition.text}</h3>
                    {/* BOTTTOM PART  */}
                    <div className='mt-10 flex flex-row justify-between w-full'>
                        <div className='flex flex-row items-start'>
                            <LuWaves className='text-2xl mr-2 mt-1'/> 
                            <div>
                                <h4 className='text-2xl font-[Impact] tracking-widest opacity-80'>{weatherData.current.humidity}%</h4>
                                <h4 className='text-xs font-[Impact] tracking-widest opacity-80'>Humidity</h4>
                            </div>
                        </div>

                        <div className='flex flex-row items-start'>
                            <FaWind className='text-2xl mr-2 mt-1'/> 
                            <div>
                                <h4 className='text-2xl font-[Impact] tracking-widest opacity-80'>{weatherData.current.temp_c}km/h</h4>
                                <h4 className='text-xs font-[Impact] tracking-widest opacity-80'>Wind Speed</h4>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (console.log("loading data"))
        }
    </div>
  )
}

export default Home