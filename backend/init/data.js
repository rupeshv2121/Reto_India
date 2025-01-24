const { v4: uuidv4 } = require("uuid");

const sampleProduct = [
    {
        productId: uuidv4(),
        name: "SOFA",
        Rating: 4,
        NoOfRating: 421,
        Price: 4000,
        Discount: "40%",
        OfferPrice: 2400,
        ProdDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl ac laoreet bibendum, metus felis euismod dolor, ac varius nunc purus sit amet nunc. euismod dolor, ac varius nunc purus sit amet nunc.",
        HeadImg: "/uploads/sofa_img1.jpg",
        Img1: "/uploads/sofa_img2.jpeg",
        Img2: "/uploads/sofa_img3.jpg",
        Img3: "/uploads/sofa_img2.jpeg",
        Img4: "/uploads/sofa_img4.jpg",
    }
]

const allProduct = [
    {
        productId: sampleProduct[0].productId,
        name: "Sofa 1",
        Image: '/uploads/sofa_img1.jpg',
        price: 200
    }
]

module.exports = { data: sampleProduct, allData: allProduct }