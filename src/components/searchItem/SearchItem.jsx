import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.img_link} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.Package_name}</h1>
        <span className="siDistance">{item.Reviews}</span>
       
        <span className="siFeatures">Destination: {item.Destination}</span>
        <span className="siFeatures">Age range:{item.Age_range}</span>
        <span className="siFeatures">Countryregion :{item.Country_region}</span>
        <span className="siFeatures">Operated in: {item.Operated_in}</span>
        <span className="siFeatures">Operator :{item.Operator}</span>

        
      </div>
      <div className="siDetails">
        {item.Reviews_star && <div className="siRating">
          <span>Excellent</span>
          <button>{item.Reviews_star}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">₹{item.Price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/packages/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
