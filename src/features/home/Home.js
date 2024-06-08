import React from "react";
import "./Home.css";
import image from "./logo.jpg";
import image1 from "./logo2.png";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import './.././../all.css';
import './.././../style.css';
export default function Home() {
  return (
    <div className="">
      <div className="wrapper p-1 ">
        
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
      </div>
      <div className="text">
      <div class="center-flex-container flex-item">
      <div class="home">
        <h1>Home</h1>
        <i class="fas fa-magic"></i>
      </div>

      <div class="post-tweet">
        <form action="">
          <div class="form-group-1">
            <img src={image} alt="profile-pics"/>
            <input type="text" placeholder="What's happening?"/>
          </div>
          <div class="form-group-2">
            <div class="post-icons">
              <i class="far fa-image"></i>
              <i class="far fa-file-image"></i>
              <i class="fas fa-stream"></i>
              <i class="far fa-smile"></i>
              <i class="far fa-calendar-check"></i>
            </div>
            <button class="btn" type="submit">Tweet</button>
          </div>
        </form>

      </div>
     {/*  <!-- User Content --> */}
        <div class="tweets" >
          <div class="user-pics" ><img src={image} alt="user3"/></div>
          <div class="user-content-box">
            <div class="user-names">
              <hi class="full-name">Olivia Brent</hi>
              <p class="user-name">@iamolivia</p>
              <p class="time"> . 58mins</p>
            </div>
            
            <div class="user-content">
              <p>We've gotta send kids back to school so one day they can be doctors and scientists, and everyone can ignore them.</p>
            </div>

            <div class="content-icons">
              <i class="far fa-comment blue"> 109</i>
              <i class="fas fa-retweet green"> 865</i>
              <i class="far fa-heart red">1.6k</i>
              <i class="fas fa-chevron-up blue"></i>
            </div>
  
          </div>
        </div>
        <div class="tweets">
          <div class="user-pics"><img src={image} alt="user2"/></div>
          <div class="user-content-box">
            <div class="user-names">
              <hi class="full-name">Carole Chavez</hi>
              <p class="user-name">@carolechavez</p>
              <p class="time"> . 1hr</p>
            </div>
            
            <div class="user-content">
              <p>If the whole world was blind, how many people would you impress?
                <a href="#">#100daysofcode</a> <a href="#">#javascript</a> <a href="#">#womenwhocode</a></p>
            </div>

            <div class="content-icons">
              <i class="far fa-comment blue"> 2k</i>
              <i class="fas fa-retweet green"> 6k</i>
              <i class="far fa-heart red"> 10k</i>
              <i class="fas fa-chevron-up blue"></i>
            </div>
  
          </div>
        </div>

        <div class="tweets ">
          <div class="user-pics"><img src={image} alt="user1"/></div>
          <div class="user-content-box">
            <div class="user-names">
              <hi class="full-name">Eric Alvarez</hi>
              <p class="user-name">@eric_alvarez</p>
              <p class="time"> . 2hrs</p>
            </div>
            
            <div class="user-content">
              <p >Eat. Code, Sleep. repeat! <a href="#">#CodeNewbie</a> <a href="#">#100DaysOfCode</a></p>
              <img style={{Width:'100%',maxHeight:'65vh'}} src={image} alt="content1"/>
            </div>
            <div class="content-icons">
              <i class="far fa-comment blue"> 273</i>
              <i class="fas fa-retweet green"> 2k</i>
              <i class="far fa-heart red"> 3k</i>
              <i class="fas fa-chevron-up blue"></i>
            </div>
  
          </div>
          
        </div>



        <div class="tweets ">
          <div class="user-pics"><img src={image} alt="user1"/></div>
          <div class="user-content-box">
            <div class="user-names">
              <hi class="full-name">Eric Alvarez</hi>
              <p class="user-name">@eric_alvarez</p>
              <p class="time"> . 2hrs</p>
            </div>
            
            <div class="user-content">
              <p >Eat. Code, Sleep. repeat! <a href="#">#CodeNewbie</a> <a href="#">#100DaysOfCode</a></p>
              <img style={{Width:'100%',maxHeight:'65vh'}} src={image1} alt="content1"/>
            </div>
             <div class="content-icons">
              <i class="far fa-comment blue"> 273</i>
              <i class="fas fa-retweet green"> 2k</i>
              <i class="far fa-heart red"> 3k</i>
              <i class="fas fa-chevron-up blue"></i>
            </div>
  
          </div>
        </div>







        <div class="tweets">
          <div class="user-pics"><img src="./img/user4.jpg" alt="user4"/></div>
          <div class="user-content-box">
            <div class="user-names">
              <hi class="full-name">Harry Wilson</hi>
              <p class="user-name">@Harrywilson</p>
              <p class="time"> . 4hrs</p>
            </div>
            
            <div class="user-content">
              <p>There's no clear correlation between your background and what you are going to achieve in life..</p>
            </div>

            <div class="content-icons">
              <i class="far fa-comment blue"> 4k</i>
              <i class="fas fa-retweet green"> 8k</i>
              <i class="far fa-heart red">13k</i>
              <i class="fas fa-chevron-up blue"></i>
            </div>
  
          </div>
        </div>

        <div class="follow-users-box">

          <div class="follow-header">
            <h1 class="main-text">Who to follow</h1>
            <i class="fas fa-chevron-down"></i>
          </div>

          <div class="follow-user">
            <div class="related-followers">
              <p class="sub-text"><i class="fas fa-user"></i> Ellie Jamie and 20 others follow</p>
            </div>

            <div class="user-profile">
              <div class="user-pics"><img src="./img/user6.jpg" alt="user6"/>
              </div>

              <div class="user-profile-content">
                <div class="title-container">
                  <div class="user-names">
                    <div class="full-name"><h1 class="main-text">Linda Shelton #BlackLivesMatter</h1></div>
                    <div class="user-name"><p class="sub-text">@Linda_shelton</p></div>
                  </div>

                  <div class="follow-btn"><a href="#">follow</a></div>

                </div>
                <div class="bio-container">
                  <p><a href="#">♯WordPress/Php</a> Geek Smiling face with sunglasses <a href="#">♯JavascriptDeveloper</a> Slightly smiling face <a href="#">♯ToolsCreator</a> <a href="#">♯http://webscreenshot.now.sh</a> Always ready to help with code Handshake</p>
                </div>
                
              </div>

            </div>

          </div>

          <div class="follow-user">
            <div class="related-followers">
              <p class="sub-text"><i class="fas fa-user"></i> JavaScript Ninja and 200 others follow</p>
            </div>

            <div class="user-profile">
              <div class="user-pics"><img src="./img/user7.jpg" alt="user7"/>
              </div>

              <div class="user-profile-content">
                <div class="title-container">
                  <div class="user-names">
                    <div class="full-name"><h1 class="main-text">Gavin Johnson #JavaScript</h1></div>
                    <div class="user-name"><p class="sub-text">@Gavinjohnson</p></div>
                  </div>

                  <div class="follow-btn"><a href="#">follow</a></div>

                </div>
                <div className="bio-container">
  <p><a href="#">♯JavascriptDeveloper</a> Avocado | Fire Speaker | Fire Teacher | Youtube - <a href="#">http://bit.ly/jqqyt</a> |<a href="#"> d</a> Champion | Motto: <a href="#">#LearnBuildTeach</a></p>
</div>
                
              </div>

            </div>

          </div>

          <div class="follow-user">
            <div class="related-followers">
              <p class="sub-text"><i class="fas fa-user"></i> The Code Boy and 50 others follow</p>
            </div>

            <div class="user-profile">
              <div class="user-pics"><img src="./img/user8.jpg" alt="user8"/>
              </div>

              <div class="user-profile-content">
                <div class="title-container">
                  <div class="user-names">
                    <div class="full-name"><h1 class="main-text">William D Gallucci</h1></div>
                    <div class="user-name"><p class="sub-text">@Iamwilliamd_shelton</p></div>
                  </div>

                  <div class="follow-btn"><a href="#">follow</a></div>

                </div>
                <div class="bio-container">
                  <p>software engineer at 
                    <a href="#">@soonastudios</a>
                    . career switcher. vue + rails. tweeting about tech, books, startups, and big ideas. writing @ <a href="#">http://jamestucker.dev.</a></p>
                </div>
                
              </div>

            </div>

          </div>

          <div class="follow-footer">
            <a href="#">Show more</a>
          </div>

        </div>

        <div class="tweets">
          <div class="user-pics"><img src="./img/user5.jpg" alt="user5"/></div>
          <div class="user-content-box">
            <div class="user-names">
              <hi class="full-name">Nora Chao</hi>
              <p class="user-name">@chaonora</p>
              <p class="time"> . 6hrs</p>
            </div>
            
            <div class="user-content">
              <p>Time to settle down and play my favourite game IN THE WORLD Earth globe europe-africa</p>

              <p>  Haven’t played for about a month, too busy coding. 
                So tired this evening though. 
                Poker tournament with husband later..</p>
                <img src="./img/content5.jpg" alt="content5"/>
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
    </div>
  );
}
