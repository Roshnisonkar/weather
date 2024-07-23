import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import cloud from '../../images/Clouds.png'
import rain from '../../images/Rain.png'
import clear from '../../images/Clear.png'
import mist from '../../images/mist.png';
import err from '../../images/error.png'

const Home = () => {
  const  [search , setSearch ] =useState("");
const [data , setData ] = useState();
const [error , setError] = useState();

    const API_KEY = "335e722df5f6846b4e0a15a3a13a07cf";
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

    const handleinput = (event) =>{
       setSearch(event.target.value)
       console.log(event.target.value);
    }

    const myFun = async ()=>{
      const get =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
    
      const jsonData = await get.json();
      console.log(jsonData);
      setData(jsonData);
if(search == "")
{
 
  setError("Please Enter name")
}
 else if(jsonData.cod == '404')
{
  setError("Please Enter Valid Name");
}
else{
  setError("");
}
setSearch("");



    }
  return (
    <div className="container">
        <div className="inputs">
            <input  placeholder='Enter city' onChange={handleinput} />
            <button onClick={myFun}><FaSearch /></button>
        </div>
        <div>
          {
            error ? <div className='errorPage'>
              <p>{error}</p>
              <img src={err} alt="" />
            </div> : ""
          }
        {
            data && data.weather ? 
            <div className='weathers'>
              <h2 className='cityName'>{data.name}</h2>
              <img src={data.weather[0].main == "Clouds" ? cloud : ""} />
              <img src={data.weather[0].main == "Rain" ? rain : ""} />
              <img src={data.weather[0].main == "Clear" ? clear : ""} />
              <img src={data.weather[0].main == "Mist" ? mist : ""} />
              <img src={data.weather[0].main == "Haze" ? cloud : ""} />

              <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
               {/* math.trunc is used to remove value after point 30.9 = 30 */}
              <p className='climate'>{data.weather[0].description}</p>
            </div> : ""
            
}
        </div>
    </div>
  )
}

export default Home