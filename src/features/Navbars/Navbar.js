import React, { Component } from "react";
import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <div className="container-fluid container-md">
        {/* xs NAV BAR */}
        <nav className="bg-light xs-nav fixed-bottom d-sm-none">
          <div className="container-fluid">
            <div className="row h-50">
              <div className="col-3 text-center">
                <span>
                  <i className="fa-solid fa-house fs-3 py-3"></i>
                </span>
              </div>
              <div className="col-3 text-center">
                <span>
                  <i className="fa-solid fa-magnifying-glass fs-2 py-3"></i>
                </span>
              </div>
              <div className="col-3 text-center">
                <span>
                  <i className="fa-solid fa-bell fs-2 py-3"></i>
                </span>
              </div>
              <div className="col-3 text-center">
                <span>
                  <i className="fa-solid fa-envelope fs-2 py-3"></i>
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="row">
          {/* LEFT SIDE BAR */}
          <div className=" d-none col-sm-2 d-sm-block col-md-2 col-lg-3 d-flex flex-column text-sm-end text-md-start align-items-lg-start left_sidebar ">
            <div className="mb-3 d-flex align-items-center justify-content-center  ">
              <span>
                <i className="fa-brands fa-twitter display-5 text-info"></i>
              </span>
            </div>

            <div className="d-flex align-items-center py-1 pl-5">
              <span>
                <i className="fa-solid fa-house fs-3"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2 ">Home</p>
            </div>

            <div className="d-flex align-items-center py-2 pl-5 ">
              <span>
                <i className="fa-solid fa-hashtag fs-2 d-none d-md-block"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Explore</p>
            </div>
            <div className="d-flex align-items-center py-2 pl-5">
              <span>
                <i className="fa-solid fa-bell fs-2"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Notifications</p>
            </div>
            <div className="d-flex align-items-center py-2 pl-5">
              <span>
                <i className="fa-solid fa-envelope fs-2"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Messages</p>
            </div>
            <div className="d-flex align-items-center py-2 pl-5">
              <span>
                <i className="fa-solid fa-bookmark fs-2"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Bookmarks</p>
            </div>
            <div className="d-flex align-items-center py-2 pl-5">
              <span>
                <i className="fa-solid fa-file-lines fs-2"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Lists</p>
            </div>
            <div className="d-flex align-items-center py-2 pl-5">
              <span>
                <i className="fa-solid fa-user fs-2"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Profile</p>
            </div>
            <div className="d-flex align-items-center py-2 pl-5">
              <span>
                <i className="fa-solid fa-ellipsis fs-2"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">More</p>
            </div>
          </div>

          <div class="col-12 col-sm-10 col-md-9 col-lg-6  main_bar  ">
            <div class="row d-flex justify-content-between align-items-center ps-1">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
                in quidem reprehenderit cum aliquid at id perspiciatis
                excepturi? Porro libero laborum a distinctio? Ab obcaecati
                maxime nostrum eligendi ut et. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Exercitationem voluptatem iure
                fuga nisi sint quisquam mollitia aut dolore veniam pariatur
                recusandae deserunt explicabo facere, omnis sunt, nobis illo,
                voluptatibus natus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                error placeat esse voluptatum adipisci suscipit sequi? Nesciunt
                magni, accusamus rerum libero veniam animi recusandae non
                debitis similique? Exercitationem minus, pariatur reiciendis,
                aut dolore ipsam nisi aperiam corporis consequatur iusto aliquam
                distinctio vero. Fugit, alias quae? Aut minima corrupti
                explicabo quisquam, consequatur impedit fugiat sunt. Ratione
                minima cupiditate explicabo alias repudiandae cum hic sed, autem
                aut consequuntur neque nam harum nulla voluptatum! Laborum nemo
                quod doloremque sequi. A quod maiores nulla fugiat, sit eligendi
                nobis id vero? Esse deserunt consequuntur mollitia laboriosam
                dignissimos culpa in sapiente. Dicta a, reiciendis aliquam
                explicabo molestiae quisquam sint maiores numquam, omnis eaque
                quo beatae esse laborum consectetur? Harum nam labore porro eum
                vel ipsam molestiae, voluptatem dolorum minus cum doloremque
                illo ad odio itaque quia consequuntur repudiandae numquam
                delectus, qui aperiam? Earum vitae tempore qui itaque
                necessitatibus minima nulla sit labore, iusto adipisci id
                nesciunt officia culpa doloremque distinctio. Aut magni,
                molestiae magnam doloribus tenetur fugit, eum odio temporibus
                maiores, quae praesentium at eaque sequi voluptatibus obcaecati
                quidem beatae hic ut corrupti sit corporis consectetur. Quia
                minus quidem incidunt esse numquam, voluptatum nam neque et ad
                ratione labore magni eius, repellat enim, quod temporibus ab
                unde atque suscipit? Nesciunt, dolorum dolor deserunt assumenda,
                a nobis libero natus fugiat voluptas officiis ullam doloremque
                culpa sit, modi vel! Dignissimos cumque, quas sapiente unde nemo
                quisquam aspernatur. Error ut tempore id dignissimos numquam,
                minus hic, sit molestiae maxime doloremque doloribus quae
                commodi perferendis reprehenderit incidunt porro? Velit, facilis
                aliquam officiis repellendus autem dignissimos et totam incidunt
                deleniti in dolor, cum commodi adipisci dolores numquam,
                reiciendis architecto! Accusantium, hic earum sed suscipit
                veniam enim vero itaque voluptatibus temporibus, reprehenderit
                cum atque placeat. Error non nulla voluptates illo, autem eum
                dolorum aspernatur dicta quaerat quo eveniet quisquam provident
                repellat unde deserunt minima voluptate nemo iusto consectetur
                quidem omnis repellendus obcaecati distinctio. Nostrum hic aut,
                error magnam cumque, voluptatum sunt molestiae sit veritatis,
                quaerat quasi nobis vitae id. Omnis illo sed dignissimos ex
                laborum beatae ducimus. Officia dolorum cum, tenetur, esse
                doloremque nostrum itaque vero adipisci architecto eaque
                voluptate distinctio. Ad recusandae officia ullam et illo
                ducimus laboriosam, vel culpa, nam exercitationem quam
                voluptatum accusantium sint similique labore perferendis in, eos
                sunt nisi. Nihil quidem libero aut inventore id nemo assumenda
                pariatur, esse magnam corporis eius illo. Quia non veritatis
                rem, cumque dolor accusamus assumenda eaque eligendi sequi
                obcaecati dolorem cupiditate quasi at doloremque voluptates amet
                dolore voluptatibus ad animi? Quod quam aliquid inventore ipsum
                repellendus consequuntur sint praesentium id. Iste amet ipsam
                expedita quibusdam quos illum inventore reprehenderit,
                laudantium odio veniam vel, ullam perferendis commodi eveniet
                perspiciatis, dignissimos saepe. Vel harum a animi odio dolorem
                aspernatur nemo veniam porro pariatur. Eum eaque ipsam tempore,
                quia nemo cupiditate natus accusantium possimus impedit
                assumenda voluptatibus excepturi minima tenetur quam sint
                quaerat blanditiis illo cum? Perferendis, illum aliquid iure
                ipsam sed minima aspernatur animi soluta eaque magni adipisci
                amet quidem corrupti consequatur, et neque reiciendis numquam
                minus rerum quas iste voluptatum cupiditate explicabo! Non, enim
                molestias facere ducimus vel recusandae deleniti vitae ut
                aliquid soluta ab quod laborum unde itaque quasi, ipsam
                accusamus libero eius dolore consectetur blanditiis. Minus
                commodi amet itaque placeat suscipit nesciunt reprehenderit
                corporis autem incidunt obcaecati sit quibusdam eius accusamus
                repellendus sed eveniet pariatur, culpa fugiat quasi mollitia
                eum dolorem eaque cupiditate. Quos nam quaerat, incidunt, ipsa
                exercitationem corrupti sapiente facere voluptate accusantium
                fugiat cupiditate eveniet omnis voluptatum eos corporis
                doloremque expedita laboriosam asperiores. Esse molestias
                incidunt illum corporis nemo explicabo blanditiis eum quae saepe
                ex dicta repellat quas doloremque repudiandae, mollitia
                consequuntur molestiae quasi sunt veniam ipsa ratione ullam
                voluptatum? Sunt cumque praesentium veritatis delectus sint
                culpa commodi placeat corporis est. Incidunt, reiciendis rerum
                omnis quibusdam nesciunt, eveniet architecto at necessitatibus
                rem ea voluptates fugit voluptatibus debitis maiores, corporis
                atque veniam cum illum assumenda. Quae reiciendis nobis cum,
                amet illo sapiente earum eligendi neque exercitationem quo.
                Tempora, magni et minus vitae rerum dolores alias autem ea sit
                ab nulla placeat. Veritatis quam error voluptas atque explicabo.
                Quisquam, soluta eos, tempora sunt incidunt sapiente reiciendis
                eaque mollitia dicta cupiditate et laborum debitis similique. Ex
                non eveniet aliquam expedita aliquid necessitatibus eius,
                tenetur nesciunt accusamus itaque qui. Unde ullam vitae dolorem
                vero veritatis magnam ut quibusdam fugit quaerat temporibus
                incidunt ipsum porro impedit repudiandae ipsam reprehenderit
                minima quam, quisquam enim culpa et corrupti libero voluptate?
                Distinctio inventore dolorem blanditiis non, totam asperiores
                iure similique natus perspiciatis explicabo ipsam pariatur
                aliquid velit facilis, magni doloribus, earum a ea nihil minus
                repellat odio. Doloremque, consequuntur animi. Odit harum autem
                modi reiciendis aliquid praesentium nisi atque corporis quia
                illo incidunt quos deleniti, magnam nesciunt eligendi dolore rem
                magni beatae possimus consequuntur a laudantium? Tempore natus
                dolore illum expedita vero tenetur fugit aspernatur. Quam sed
                quasi illo, iste aliquam perferendis autem hic culpa, non itaque
                dolores laboriosam. Commodi cupiditate vitae, amet asperiores
                optio eveniet porro facilis obcaecati beatae dolor dolorum?
                Quidem voluptatum architecto nostrum, inventore quam excepturi
                at harum quisquam voluptas nesciunt, id aspernatur fuga possimus
                ab maiores veniam! Veritatis facilis eaque blanditiis ex iusto
                quas, facere corporis vitae quo asperiores vero accusamus quod
                nulla perspiciatis et dignissimos nihil obcaecati sint nostrum,
                dolor earum commodi consequatur? Voluptates veritatis, porro
                pariatur unde quod repellendus, quidem suscipit omnis incidunt
                fugit sequi provident minima tempora quas laboriosam! Esse ipsam
                unde accusamus ipsa optio odit cupiditate corrupti aspernatur
                eos, dignissimos beatae sapiente? Soluta harum similique autem
                maiores quisquam vitae ullam magnam, facilis vel voluptatem
                corrupti accusamus dicta esse incidunt, ex quibusdam explicabo
                obcaecati. Porro illo velit nemo in sit officiis, fugit suscipit
                eveniet, voluptate id aut, veritatis corrupti ut iste
                accusantium aperiam tempora modi quaerat odio nam deleniti!
                Asperiores cumque nisi culpa unde cupiditate obcaecati deserunt,
                veniam, nulla aspernatur eum at assumenda. Est voluptatum
                numquam ut perspiciatis suscipit dicta earum consequatur
                aliquam, distinctio inventore provident asperiores unde
                molestias sunt natus quia quibusdam culpa odio dolorem. Soluta
                itaque ab officia. Molestiae, ad? Molestias, illum, aut
                necessitatibus praesentium similique et molestiae vero, saepe
                architecto sed expedita distinctio suscipit dolore aspernatur?
              </p>
            </div>
          </div>
          {/* <!-- RIGHT SIDE BAR --> */}
            <div class=" bg-info col-lg-3 d-none d-lg-block  w-25 h-25 right_side_bar">
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum aliquam molestiae a totam error dicta atque impedit numquam quas minus accusamus, quisquam ipsa temporibus rem ad velit nemo maiores molestias doloremque qui commodi porro iste? Totam earum possimus sint delectus rerum nemo, veniam vel molestiae, distinctio quos suscipit facilis officia? Dignissimos quis non illo nemo maiores deleniti blanditiis in tempora quaerat deserunt explicabo quae voluptatum delectus, similique rem voluptate? Tempore vel voluptatem esse, vero corporis, nostrum fugit blanditiis nisi, ratione omnis placeat quis. Harum iure laudantium voluptas facere eos maiores sint, temporibus aperiam ipsam excepturi modi quisquam, voluptatibus dolore labore necessitatibus unde reprehenderit expedita vel repellendus dolorem nemo, aliquam ullam! Amet, rem dolor! Labore id minima hic. Ratione provident libero, maxime, beatae dicta nihil distinctio voluptatem soluta impedit incidunt nobis perferendis officiis voluptatibus! Sapiente nihil minus, placeat voluptates quasi facilis voluptatem, qui eius quis tempora amet, accusantium maxime. Nobis quaerat perferendis nemo illum quae autem non distinctio odit, quos facilis a aliquid repellendus architecto sed at? Iure optio laudantium quia atque nostrum sunt hic magnam distinctio voluptatibus at, et harum reprehenderit exercitationem perferendis numquam cum velit fuga, cupiditate necessitatibus quibusdam repellat mollitia rerum. Esse natus eligendi voluptate odio atque fuga sed? Temporibus nostrum nobis quas labore inventore voluptatum quaerat nam vel, quidem atque ipsa voluptas sed, odio voluptatem veniam ducimus quae laboriosam, tempora optio cum dolores error eaque incidunt. Velit maxime voluptas excepturi, perspiciatis eius corporis soluta quisquam tempora recusandae quibusdam eligendi eaque nesciunt quo suscipit quae. Cum perferendis, delectus tempore accusantium placeat dolorum eveniet quae vel nobis atque quibusdam enim libero quaerat id cumque labore totam! Blanditiis molestiae debitis impedit repudiandae beatae quisquam, eligendi unde consectetur? Et cum harum, impedit sed quibusdam dolores voluptates voluptatibus ut quidem quae veritatis fugiat repudiandae omnis in perspiciatis placeat perferendis qui architecto? Quo, pariatur! Necessitatibus distinctio quisquam, labore obcaecati a fuga earum nesciunt alias? Perferendis tenetur molestiae magnam velit quod veniam minus vero autem eligendi consectetur illo odit doloribus, voluptatum soluta dicta, quam corporis numquam repellendus quae. Est iste quasi eius inventore nihil suscipit adipisci quis nam, earum, vitae aliquid doloremque! Sequi voluptate autem consequatur ipsa ex, quis fugit amet ratione dignissimos laborum ut dolor nobis quod quisquam repellat nesciunt eum a eveniet enim iusto quaerat! Maxime, sapiente? Harum vel accusantium ut officia nemo est sint consequuntur quo voluptates a. Corrupti facere harum totam saepe earum magni reprehenderit distinctio. Numquam, sequi cum illo voluptate quis, rem possimus natus reiciendis temporibus dolore laudantium itaque quisquam incidunt odit nobis tenetur iure? Optio distinctio quisquam animi vero tempora, sit eveniet. Vel earum blanditiis qui dolore, veniam deserunt asperiores consequatur quae! Rem voluptatem recusandae dignissimos est reiciendis, quod consequatur similique officiis debitis iusto eum doloribus harum soluta accusantium laborum dolorum adipisci! Vel accusamus provident, unde excepturi blanditiis corrupti optio quo eos laudantium, error odit debitis doloribus, dolorum pariatur exercitationem! Laborum obcaecati tempora atque reiciendis! Veritatis tenetur, unde dolorum quae consectetur facere aperiam tempora cum beatae numquam iure pariatur quis quod excepturi nihil nesciunt. Inventore, maiores quas obcaecati enim perspiciatis dolore ipsam distinctio expedita cumque atque quod quisquam a, tempora quae odit, cupiditate nesciunt veritatis suscipit. Quasi qui minus eaque laudantium vitae, corporis porro ipsa corrupti amet fugit voluptatem eligendi dolores nulla deserunt? Reiciendis unde dolores praesentium autem ut sunt tempora, natus ipsam placeat est non temporibus ratione dolore minus! A iste reprehenderit rem quae illo neque numquam fugiat architecto commodi error temporibus, obcaecati sequi esse porro, nostrum nemo omnis doloribus provident, consequuntur sint. Culpa soluta neque quaerat numquam itaque aspernatur modi sapiente. Dolores iste commodi alias atque enim sint delectus molestiae repellendus, esse, explicabo optio dignissimos vel fugiat a at ipsam asperiores aspernatur vero voluptas non laudantium nulla iure minima et! Nobis dignissimos beatae voluptas ratione deserunt ipsam adipisci fuga, velit repellendus perferendis natus assumenda tempore repellat suscipit inventore quae, excepturi alias hic consequuntur voluptatibus aspernatur accusantium! Aspernatur unde a natus obcaecati ex, nemo at doloremque alias aut cumque earum architecto! Vel dolorum voluptate quia ipsam, corporis id vero officiis porro unde eveniet. Quas voluptatem hic eius incidunt architecto! Hic maiores quae nulla doloremque, magni quos ipsam optio itaque eaque nobis, magnam facilis blanditiis sint similique ipsa sequi nam suscipit rem voluptate unde incidunt eligendi odio in. Et ipsa aut saepe, exercitationem nihil dolores! Minima odit, voluptas facere quas ullam nihil repellat aliquam soluta ea vitae ex reiciendis labore, voluptates cum commodi! Ipsum quo voluptatibus reprehenderit voluptatem ea delectus accusamus dolor ut, sit fugiat veniam facere, architecto esse eaque dolorum voluptates libero ratione recusandae ad? Veritatis, officia voluptatem. Optio, iste dolorem, quas blanditiis consequuntur provident et velit fugiat tenetur magni ipsa alias amet consequatur voluptates. Tempora nulla nihil veniam ratione. Neque, esse id rerum veritatis nulla ipsa laborum dolore culpa obcaecati, dignissimos sit repellendus a? Odio molestiae saepe perferendis. Tempore ad aliquid pariatur saepe praesentium hic. Illo officia itaque voluptates, alias unde vel tempore aut dolores atque in doloribus inventore nesciunt laboriosam voluptatibus repellendus laudantium blanditiis maiores quod! Vero corporis velit eos enim porro! Atque itaque perspiciatis vel? Laudantium magnam itaque inventore fuga fugit eius nobis provident, accusamus adipisci. Omnis cupiditate harum velit aspernatur molestias, debitis porro fugiat, maiores temporibus laboriosam nesciunt ut aut? Enim a perspiciatis quod eveniet nulla exercitationem velit quae! In vel impedit asperiores aliquid omnis autem culpa necessitatibus provident tenetur optio at, suscipit expedita consequatur laboriosam aspernatur perspiciatis temporibus! Consequuntur cumque tenetur vitae qui velit laborum ratione ipsum adipisci, aperiam corporis! Cum consequuntur deleniti ea quaerat, nisi voluptatibus fugit sapiente temporibus dicta accusamus tempore fugiat quis aperiam mollitia voluptates! Corrupti saepe rem, aut obcaecati hic libero exercitationem? Officiis recusandae officia a eos inventore quam illum accusamus debitis delectus perferendis facere, obcaecati autem, adipisci voluptates corporis iure odit! Velit necessitatibus porro nemo exercitationem quos, explicabo fugit saepe id tenetur dolor recusandae sapiente a non modi ratione, voluptatum iusto iure harum ut. Libero tenetur quisquam eum ut a nihil molestiae, pariatur temporibus tempora, laborum provident voluptate sint illo qui minima. Nulla praesentium commodi ipsum veniam, architecto eius exercitationem, minima id itaque voluptatum rerum magnam debitis.</p>
                </div>
                </div>



        </div>
      </div>
    );
  }
}
