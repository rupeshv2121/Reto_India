import StarRateIcon from "@mui/icons-material/StarRate";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import "./Product.css";
import Review from "./Reviews/Review";

const Product = () => {
  const [data, setData] = useState([{}]);
  const { productId } = useParams();
  console.log(productId);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/products/${productId}`
  //     );
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("error fetching data", error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${productId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  return (
    <div className="MainPage">
      <div className="ProductPage">
        <div className="ProdSection">
          <div className="ProdHead">
            <img
              src={`http://localhost:5000${data[0].HeadImg}`}
              alt="sofa"
              className="sofa_img_head"
            />
          </div>

          <div className="sofa_other">
            <img
              src={`http://localhost:5000${data[0].Img1}`}
              alt="bed"
              className="sofa_img"
            />
            <img
              src={`http://localhost:5000${data[0].Img2}`}
              alt="chair"
              className="sofa_img"
            />
            <img
              src={`http://localhost:5000${data[0].Img3}`}
              alt="chair"
              className="sofa_img"
            />
            <img
              src={`http://localhost:5000${data[0].Img4}`}
              alt="chair"
              className="sofa_img"
            />
          </div>
        </div>

        <div className="content_section">
          <div className="content">
            <div id="header">
              <div>
                <div>
                  <h1 className="content_heading">{data[0].name}</h1>
                  <div className="rating">
                    {Array.from({ length: data[0].Rating }, (_, i) => (
                      <StarRateIcon
                        key={i}
                        className="RatingStar text-yellow-400"
                      />
                    ))}
                    <p className="rating-text">
                      {data[0].Rating} ({data[0].NoOfRating})
                    </p>
                  </div>
                </div>

                <div>
                  <h2>
                    INR {data[0].Price} ({data[0].Discount} off)
                  </h2>
                  <h2>Offer Price: INR {data[0].OfferPrice}</h2>
                </div>

                <div>
                  <h1 id="description">About this Gem</h1>
                  <div className="prod_description">
                    <p>{data[0].ProdDescription}</p>
                  </div>
                </div>
              </div>

              <div className="BtnBar">
                <button>Add to Cart</button>
                <NavLink to="/checkout">
                  <button>Buy Now</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Review />
      </div>
    </div>
  );
};

export default Product;
