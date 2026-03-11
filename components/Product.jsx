import { useLocation } from "react-router";

function Product() {
  //read state sent by the useNavigate() hook
  const { state } = useLocation();

  return (
    <div className="flex flex-col sm:flex-row justify-between mt-14">
      <div className=" w-full sm:w-2/5 ">
        <img src={state?.product?.image} className="w-96" alt="" />
      </div>
      <div className="w-full sm:w-3/5 p-2 sm:p-10">
        <p className="text-2xl mb-10">{state?.product?.title}</p>
        <p className=" mb-10">{state?.product?.description}</p>
        <p className="text-3xl mb-10">{state?.product?.price}</p>
        <p className="text-2xl mb-10">{state?.product?.category}</p>
      </div>
    </div>
  );
}

export default Product;