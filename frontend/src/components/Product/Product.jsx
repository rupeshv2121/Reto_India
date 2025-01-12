import StarRateIcon from "@mui/icons-material/StarRate";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Product.css";
import Review from "./Reviews/Review";
import SofaImg1 from "./SofaImgBox/SofaImg/sofa_img1.jpg";
import SofaImg2 from "./SofaImgBox/SofaImg/sofa_img2.jpeg";
import SofaImg3 from "./SofaImgBox/SofaImg/sofa_img3.jpg";
import SofaImg4 from "./SofaImgBox/SofaImg/sofa_img4.jpg";

const Product = () => {
  const [data, setData] = useState([{}]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ProductInfo");
      setData(response.data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="MainPage">
      <div className="ProductPage">
        <div className="ProdSection">
          <div className="ProdHead">
            <img
              // src={`http://localhost:3000${data[0].HeadImg}`}
              src={SofaImg1}
              alt="sofa"
              className="sofa_img_head"
            />
          </div>

          <div className="sofa_other">
            <img
              // src={`http://localhost:3000${data[0].Img1}`}
              src={SofaImg2}
              alt="bed"
              className="sofa_img"
            />
            <img
              // src={`http://localhost:3000${data[0].Img2}`}
              src={SofaImg3}
              alt="chair"
              className="sofa_img"
            />
            <img
              // src={`http://localhost:3000${data[0].Img3}`}
              src={SofaImg4}
              alt="chair"
              className="sofa_img"
            />
            <img
              // src={`http://localhost:3000${data[0].Img4}`}
              src={SofaImg1}
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
                <button>Buy Now</button>
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
