
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./HadithBoxSkeleton.css";
const HadithBoxSkeleton = () => {
  return (
    <div className="hadith-box skeleton-loader shadow-sm mb-2 mb-1 shadow-lg bg-white rounded border">
      <div className="hadith-head skeleton-loader-head ms-0 ps-0">
        <Skeleton width={60} height={30} />
        <Skeleton width={100} height={30} />
        <Skeleton circle={true} width={35} height={35} />
      </div>
      <div className="card-body skeleton-loader-body p-0 pt-1 ps-2">
        <Skeleton count={5} />
      </div>
    </div>
  );
};

export default HadithBoxSkeleton;
