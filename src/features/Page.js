import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Pagea() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const localStorageKey = "scrollPositionAbout"; // Unique key for this component

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(localStorage.getItem(localStorageKey)) || 0;
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const handleScroll = () => {
        localStorage.setItem(localStorageKey, scrollRef.current.scrollTop);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const goToTable = () => {
        navigate('/table');
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <div ref={scrollRef} className=" py-5" style={{ overflowY: 'scroll', height: '100vh', paddingRight: '17px' }}>
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <h2 className="display-4 mb-4">About</h2>
                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur vel laudantium numquam veritatis ducimus debitis soluta pariatur ratione cupiditate reiciendis, sint corporis perspiciatis ipsa minima odio veniam! Iste, commodi?.</h1>
                   <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab veniam, accusantium tempora odit minima amet nihil non est, ea harum neque, officia provident quasi laborum. Optio impedit, maiores nisi error sapiente blanditiis repudiandae. Eos quo exercitationem, odit aliquid tenetur inventore placeat aut omnis dolorum nobis tempora numquam expedita accusantium dicta tempore natus, dignissimos cumque, assumenda rerum iste incidunt ducimus earum! Laboriosam sequi blanditiis quis quidem tenetur quas corporis, neque modi molestiae doloribus eos, praesentium atque impedit numquam rem expedita, veritatis repellat? Aspernatur neque impedit error alias nobis? Saepe officiis porro architecto impedit eius? Doloribus deserunt minima nisi officiis id accusantium ipsa. Ut exercitationem nesciunt ratione vitae accusamus commodi quia soluta, animi inventore modi possimus impedit fugit officiis. Vitae voluptatibus, nemo maiores error esse cumque veniam veritatis iste quam blanditiis facilis quae. Delectus dolorem excepturi impedit amet aspernatur voluptatum qui explicabo odit, saepe, hic asperiores rerum consequatur nobis magni totam mollitia cumque laboriosam consequuntur ratione in dolorum omnis ab ut. Error, sunt nesciunt architecto odit autem recusandae qui sint nostrum, adipisci voluptates amet! Tenetur natus fuga reiciendis autem quis nobis quae optio expedita reprehenderit in architecto explicabo commodi libero possimus debitis et error, exercitationem provident vitae consequatur, minus numquam praesentium officiis?</h2>
                    
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam minus voluptatibus porro consequatur accusantium excepturi tenetur error natus, corporis adipisci expedita officiis quam animi possimus, similique dolores dolore omnis. Odio facilis sequi, necessitatibus explicabo illum magnam reprehenderit aspernatur eos unde a quaerat et quibusdam consectetur aperiam ipsam esse impedit soluta iste quisquam vero ab sit temporibus rerum ducimus! Explicabo aperiam dolore accusantium aliquid labore cumque eligendi excepturi porro sit debitis perferendis rerum nobis voluptatum nihil, delectus est temporibus neque unde. Vel quam quisquam dolore commodi in assumenda error enim itaque quasi perspiciatis mollitia impedit debitis dolorem distinctio, iusto placeat repudiandae. Repudiandae esse inventore error praesentium, suscipit temporibus recusandae consequuntur amet, nesciunt velit vero nam. Aliquid impedit minus aut adipisci delectus laborum similique deleniti nulla eos, amet autem ipsam, ducimus enim sunt officiis quam explicabo assumenda. Vitae sunt ut asperiores nostrum magnam! Eveniet necessitatibus autem magni tenetur cupiditate aliquam, ipsa ea voluptatem nihil esse aperiam officia nobis atque? Ut dolor pariatur mollitia. Quam laborum sequi quos debitis placeat voluptatibus odio excepturi. Ullam deserunt necessitatibus repellendus. Pariatur aut aliquid, minus facilis quidem voluptates quibusdam eligendi eaque veritatis fugit porro blanditiis corrupti earum perferendis ad magnam illo, optio, magni unde hic nam iusto temporibus dolore. Accusantium neque suscipit similique incidunt, obcaecati debitis molestiae facere eaque totam inventore, nam odit dicta expedita corporis, eveniet nemo quos ipsa natus ipsum numquam deleniti eligendi quibusdam! Recusandae error esse similique animi aspernatur, hic ipsam sed nisi harum, consequatur, ullam porro eligendi. Libero distinctio earum nesciunt dicta, quam, ipsam quasi recusandae harum voluptates ex eaque. Enim animi nostrum laudantium nesciunt reprehenderit dignissimos quisquam quos, omnis accusantium maxime beatae veniam! Corrupti, iure! Dolore saepe inventore excepturi impedit vel. Molestiae repudiandae dolor optio eius aut debitis asperiores suscipit quidem perspiciatis nisi doloremque reprehenderit necessitatibus eaque vitae at ratione, fuga autem!</h2>
                    
                    </div>
                </div>
            </div>
        </div>
    );
}


