import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TextPostSkeleton = () => {
  return (
    <div className="posts mx-2">
      <div className="user-pics">
        <Skeleton circle={true} height={50} width={50} />
      </div>
      <div className="user-contents-text-box">

        <div className="user-contents">
          <Skeleton count={3} />
        </div>
        <div className="content-icons pe-3">
          <Skeleton height={30} width={30} circle={true} />
          <Skeleton height={30} width={30} circle={true} style={{ marginLeft: "10px" }} />
          <Skeleton height={30} width={30} circle={true} style={{ marginLeft: "10px" }} />
        </div>
      </div>
    </div>
  );
};

export default TextPostSkeleton;
