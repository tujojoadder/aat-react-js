import { useMediaQuery } from "react-responsive";
import PageLargeScreenCard from "./PageLargeScreenCard/PageLargeScreenCard";
import PageSmallScreenCard from "./PageSmallScreenCard/PageSmallScreenCard";
import PageTabs from "./PageTabs/PageTabs";

export default function PageHome() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const profiles = [
    {
      name: "Mark Rockwell bjbbi jnj",
      handle: "@mark_rockwell",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Jane Doe",
      handle: "@jane_doe",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
  ];

  return (
    /* <<<--- Scroll Needed --->>> */

    <div
      className="friend-home main border-left border-right px-0"
      style={{ backgroundColor: "white" }}
    >
      {/* Page Tabs */}
      <div className="d-block d-lg-none">
        <PageTabs />
      </div>
      {/* Friend Request Section */}
      <div className="friend-request-section mb-5 px-2">
        <h5 className="p-2">Suggested for you</h5>
        <div className="row">
          {profiles.length === 0 ? (
            <div className="col-12 text-center">No records</div>
          ) : (
            profiles.map((profile, index) =>
              isSmallScreen ? (
                <PageSmallScreenCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type="discover"
                />
              ) : (
                <PageLargeScreenCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type="discover"
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
