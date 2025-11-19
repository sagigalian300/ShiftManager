import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
        <ClipLoader size={100} color={"#8b5cf6"} />
    </div>
  )
}

export default Loader