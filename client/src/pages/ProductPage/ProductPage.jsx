import React, { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetail } from "../../features/user/userSlice";
import { selectUserCart, addProduct, addQuantity } from "../../features/userCart/userCartSlice";
import filledStar from '/ratingStarFilled.png';
import hollowStar from '/ratingStarHollow.png';
export default function ProductPage() {
  const { id } = useParams("id");
  const [product, setProduct] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetail);
  const cart = useSelector(selectUserCart);
  const [ratingsReviews, setRatingsReviews] = useState([]);
  useEffect(() => {
    async function getProductById() {
      try {
        axios
          .get(
            import.meta.env.VITE_SERVER_ADDRESS + `/products/get-product/${id}`,
            { withCredentials: true }
          )
          .then((response) => {
            if (response.status === 200) {
              setProduct(response.data);
            }
          });
      } catch (e) {
        console.log(e.message);
      }
    }
    async function getRatngsReviews() {
      try {
        axios
          .get(
            import.meta.env.VITE_SERVER_ADDRESS + `/products/get-product-ratings-reviews/${id}`,
            { withCredentials: true }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              setRatingsReviews(response.data);
            }
          });
      } catch (e) {
        console.log(e.message);
      }
    }
    getProductById();
    getRatngsReviews();
  }, []);

  async function addToCart() {
    const token = localStorage.getItem('userToken');
    const item = {
      userId: user.id,
      productId: product.id,
      quantity: quantity,
    };
    const oldItem = cart.find(item => item.product.id === product.id);
    if(oldItem){
      try {
        const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/cart/update-cart',
        {item: {product: { id: product.id}}, quantity: oldItem.quantity+quantity},
        {
          withCredentials: true,
          headers: { "Authorization": "Bearer " + token},
        })
        if(response) dispatch(addQuantity({id: product.id, quantity}));
        else console.log('can not update');
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try{
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/cart/add-to-cart',item,
      {
        withCredentials: true,
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      if(response.status === 200) {
        dispatch(addProduct({quantity, product : {id: product.id, image: product.image, productName: product.productName, price: product.price }}));
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!product) return <></>;
  return (
    <div className={styles.product_page_container}>
      <div className={styles.product_page}>
        <div className={styles.product_details}>
          <div className={styles.left}>
            <img src={product?.image} alt="product image" />
          </div>
          <div className={styles.right}>
            <div>
              <h2>{product?.productName}</h2>
              <br />
              <p>{product?.description}</p>
              <br />
              <h3>&#8377; {product.price}</h3>
            </div>
            <div className={styles.btns}>
              <Button
                value="-"
                action={() => {
                  setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
                }}
              />
              <p>{quantity}</p>
              <Button
                value="+"
                action={() => setQuantity((prev) => prev + 1)}
              />
              <Button
                value="Add to cart"
                action={() => {
                  addToCart();
                }}
              />
            </div>
            <div>
              <span>Facebook</span><span>Instagram</span><span>WhatsApp</span><span>Gmail</span>
            </div>
          </div>
        </div>
        <h2 className={styles.review_heading}>Reviews</h2>
        <div className={styles.reviews}>
          {ratingsReviews.map((item)=>{
            return (
              <div className={styles.productReviews}>
                <h3>User Name: {item.user.name}
                <div className={styles.ratingStars}> 
                    <spa>Rated: </spa>
                    <span><img src={ item.rating > 0 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span><img src={ item.rating > 1 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span><img src={ item.rating > 2 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span><img src={ item.rating > 3 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span><img src={ item.rating > 4 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                </div></h3>
                <p className={styles.reviewText}>{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
