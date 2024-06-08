import React from "react";
import "./Home.css";
import image from "./logo.jpg";
import image1 from "./logo1.png";
import image2 from "./logo2.png";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import BothPost from "./Components/BothPost/BothPost";
import ImagePost from "./Components/ImagePost/ImagePost";
export default function Home() {
  return (
    <div className="">

      {/* //HadithIteam */}
      <div className="wrapper p-1 ">
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
      </div>
      {/* //Main Home container */}
    
        <div class="center-flex-container flex-item">

       {/*  //Home bar */}
          <div class="home">
            <h1>Home</h1>
            <i class="fas fa-magic"></i>
          </div>

       {/* CreatePost */}
     
          
          {/*  <!-- User Content --> */}

         {/*  Text Posts */}
        <TextPost/>
          {/* Both Post */}
  





         
          
          <div class="follow-users-box">
            <div class="follow-header">
              <h1 class="main-text">Who to follow</h1>
              <i class="fas fa-chevron-down"></i>
            </div>

            <div class="follow-user">
              <div class="related-followers">
                <p class="sub-text">
                  <i class="fas fa-user"></i> Ellie Jamie and 20 others follow
                </p>
              </div>

              <div class="user-profile">
                <div class="user-pics">
                  <img src="./img/user6.jpg" alt="user6" />
                </div>

                <div class="user-profile-content">
                  <div class="title-container">
                    <div class="user-names">
                      <div class="full-name">
                        <h1 class="main-text">
                          Linda Shelton #BlackLivesMatter
                        </h1>
                      </div>
                      <div class="user-name">
                        <p class="sub-text">@Linda_shelton</p>
                      </div>
                    </div>

                    <div class="follow-btn">
                      <a href="#">follow</a>
                    </div>
                  </div>
                  <div class="bio-container">
                    <p>
                      <a href="#">♯WordPress/Php</a> Geek Smiling face with
                      sunglasses <a href="#">♯JavascriptDeveloper</a> Slightly
                      smiling face <a href="#">♯ToolsCreator</a>{" "}
                      <a href="#">♯http://webscreenshot.now.sh</a> Always ready
                      to help with code Handshake
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="follow-user">
              <div class="related-followers">
                <p class="sub-text">
                  <i class="fas fa-user"></i> JavaScript Ninja and 200 others
                  follow
                </p>
              </div>

              <div class="user-profile">
                <div class="user-pics">
                  <img src="./img/user7.jpg" alt="user7" />
                </div>

                <div class="user-profile-content">
                  <div class="title-container">
                    <div class="user-names">
                      <div class="full-name">
                        <h1 class="main-text">Gavin Johnson #JavaScript</h1>
                      </div>
                      <div class="user-name">
                        <p class="sub-text">@Gavinjohnson</p>
                      </div>
                    </div>

                    <div class="follow-btn">
                      <a href="#">follow</a>
                    </div>
                  </div>
                  <div className="bio-container">
                    <p>
                      <a href="#">♯JavascriptDeveloper</a> Avocado | Fire
                      Speaker | Fire Teacher | Youtube -{" "}
                      <a href="#">http://bit.ly/jqqyt</a> |<a href="#"> d</a>{" "}
                      Champion | Motto: <a href="#">#LearnBuildTeach</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="follow-user">
              <div class="related-followers">
                <p class="sub-text">
                  <i class="fas fa-user"></i> The Code Boy and 50 others follow
                </p>
              </div>

              <div class="user-profile">
                <div class="user-pics">
                  <img src="./img/user8.jpg" alt="user8" />
                </div>

                <div class="user-profile-content">
                  <div class="title-container">
                    <div class="user-names">
                      <div class="full-name">
                        <h1 class="main-text">William D Gallucci</h1>
                      </div>
                      <div class="user-name">
                        <p class="sub-text">@Iamwilliamd_shelton</p>
                      </div>
                    </div>

                    <div class="follow-btn">
                      <a href="#">follow</a>
                    </div>
                  </div>
                  <div class="bio-container">
                    <p>
                      software engineer at
                      <a href="#">@soonastudios</a>. career switcher. vue +
                      rails. tweeting about tech, books, startups, and big
                      ideas. writing @ <a href="#">http://jamestucker.dev.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="follow-footer">
              <a href="#">Show more</a>
            </div>
          </div>
          <div class="tweets">
            <div class="user-pics">
              <img src="./img/user5.jpg" alt="user5" />
            </div>
            <div class="user-content-box">
              <div class="user-names">
                <hi class="full-name">Nora Chao</hi>
                <p class="user-name">@chaonora</p>
                <p class="time"> . 6hrs</p>
              </div>

              <div class="user-content">
                <p>
                  Time to settle down and play my favourite game IN THE WORLD
                  Earth globe europe-africa
                </p>

                <p>
                  {" "}
                  Haven’t played for about a month, too busy coding. So tired
                  this evening though. Poker tournament with husband later..
                </p>
                <img src="./img/content5.jpg" alt="content5" />
              </div>

              <div class="content-icons">
                <i class="far fa-comment blue"> 78</i>
                <i class="fas fa-retweet green"> 265</i>
                <i class="far fa-heart red"> 934</i>
                <i class="fas fa-chevron-up blue"></i>
              </div>
            </div>
          </div>
          <div class="pagnation">
            <a href="#">Load more</a>
          </div>
        </div>
      
    </div>
  );
}
