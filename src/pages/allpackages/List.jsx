import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState,useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import useFetchfav from "../../hooks/useFetchfav";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AllList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState("");
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/packages?city=${destination}&min=${min || 0 }&max=${max || 999}&limit=10`
  );

  const { user } = useContext(AuthContext);
  const { datalist,reFetch1,loading1 } = useFetchfav(
    `/favorites/${user.username}/favlist`
  );
  console.log(datalist)

  const handleClick = () => {
    reFetch();
  };

  const [time,settime]=useState(true)

  setTimeout(() => {
    settime(false)
   
  }, 500);

  
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input 
                onChange={(e) => setDestination(e.target.value)}
                placeholder=""
                value={destination}
                type="text" />
            </div>
           
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    value={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    value={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading1 ? (
              <>
              <Skeleton count={10} style={{marginLeft:"50px",marginRight:"50px"}} />
              <br></br>
              <Skeleton count={10} style={{marginLeft:"50px",marginRight:"50px"}} />
              <br></br>
              <Skeleton count={10} style={{marginLeft:"50px",marginRight:"50px"}} />
              <br></br>
              <Skeleton count={10} style={{marginLeft:"50px",marginRight:"50px"}} />
              <br></br>
              <Skeleton count={10} style={{marginLeft:"50px",marginRight:"50px"}} />
              </>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item}  list ={datalist.favorites} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllList;
