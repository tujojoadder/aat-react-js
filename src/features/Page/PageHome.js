
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";

import SmallScreenBack from "../SmallScreenBack/SmallScreenBack.js";
import MidScreenBack from "../SmallScreenBack/MidScreenBack.js";
import Spinner from "../Spinner/Spinner.js";
import { useGetPageSuggestionQuery } from "../../services/pagesApi.js";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageSmallScreenCard from "./PageSmallScreenCard/PageSmallScreenCard.js";
import PageLargeScreenCard from "./PageLargeScreenCard/PageLargeScreenCard.js";

export default function PageHome() {
  const groupUpdate = useSelector((state) => state.home.groupUpdate);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const [pageNumber, setpageNumber] = useState(1);
  const [allAdminGroups, setAllAdminGroups] = useState([]);
  const [hasMoreAdminGroups, setHasMoreAdminGroups] = useState(true);

  // Get reference and visibility state for admin groups
  const { ref: adminRef, inView: adminInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch data for pages where the user is an admin
  const {
    data: adminGroupsData,
    isFetching: isFetchingAdminGroups,
    isError: isErrorAdminGroups,
    isSuccess: isSuccessAdminGroups,
   
  } = useGetPageSuggestionQuery(pageNumber);

  // Effect to handle fetching data from page 1 whenever the component mounts or groupUpdate changes
  useEffect(() => {
    setpageNumber(1);
    setAllAdminGroups([]);
    setHasMoreAdminGroups(true);

  }, []);

  // Effect to process fetched admin groups data
  useEffect(() => {
    if (isSuccessAdminGroups && adminGroupsData?.data) {
      setAllAdminGroups((prev) => {
        // Filter out duplicates
        const newAdminGroups = adminGroupsData.data.filter(
          (newGroup) =>
            !prev.some((group) => group.page_id === newGroup.page_id)
        );
        return [...prev, ...newAdminGroups];
      });

      // Update hasMoreAdminGroups based on the pagination data
      const { current_page, total_pages } = adminGroupsData;
      if (current_page >= total_pages) {
        setHasMoreAdminGroups(false);
      }
    }
  }, [adminGroupsData, isSuccessAdminGroups]);

  // Effect to handle infinite scroll logic for admin groups
  useEffect(() => {
    if (
      adminInView &&
      !isFetchingAdminGroups &&
      !isErrorAdminGroups &&
      hasMoreAdminGroups &&
      isSuccessAdminGroups
    ) {
      setpageNumber((prevPage) => prevPage + 1);
    }
  }, [
    adminInView,
    isFetchingAdminGroups,
    isErrorAdminGroups,
    hasMoreAdminGroups,
    isSuccessAdminGroups,
  ]);

  return (
    <div
      className="friend-home main m-0 p-0 border-sm-0 border-left border-right"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      {/* Back button */}
      <SmallScreenBack text="Your groups" />
      <MidScreenBack text="Your groups" />
      <div className="sm-back-sm"></div>

      {/* Section 1: Pages where the user is an admin */}
      <div className="admin-groups-section  px-sm-4 px-lg-2 px-3">
        <h4 className="p-2">Pages you're an admin of</h4>
        <div className="row">
          {allAdminGroups.map((page, index) =>
            isSmallScreen ? (
              <PageSmallScreenCard
                key={index}
                pageId={page.page_id}
                name={page.page_name}
                handle={page.identifier}
                image={page.page_picture}
                type='discover'
              />
            ) : (
              <PageLargeScreenCard
                key={index}
                pageId={page.page_id}
                name={page.page_name}
                handle={page.identifier}
                image={page.page_picture}
                type='discover'
              />
            )
          )}
          <div ref={adminRef} className="infinite-scroll-trigger">
            {isFetchingAdminGroups && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
