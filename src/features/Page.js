import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";
export default function Page() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const localStorageKey = "scrollPositionPage"; // Unique key for this component

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
            <div ref={scrollRef} className="scroll-container py-5" style={{ overflowY: 'scroll', position:'fixed'}}>

<div className="p-3">
    <h1>Page</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi error eveniet cum aliquid aspernatur totam quaerat? Tempore id dicta voluptate aperiam saepe accusamus itaque quos qui, quia modi sapiente quod soluta iusto sit et. Esse fuga et suscipit eius nobis sequi, corporis, quis accusamus necessitatibus quibusdam assumenda! Rerum incidunt ipsam voluptatibus cum non tenetur ratione ipsum asperiores dolorum maxime doloremque et vel magni iusto, obcaecati accusamus ut minus ab error at voluptas enim, vitae beatae! Et illo corporis quis optio hic voluptatum repudiandae similique, ex recusandae officiis, quasi minima eius vitae praesentium ratione odio perferendis alias autem accusamus. Ex accusamus explicabo voluptate mollitia quaerat delectus tempora sequi nisi ut, distinctio eaque assumenda labore odit esse eveniet soluta! Dolore nemo optio rerum voluptas quibusdam blanditiis? Dignissimos autem officiis reiciendis placeat corporis, unde expedita totam esse accusantium ad delectus quia, quam ipsum? Minus nemo consectetur animi. Porro aut quaerat ipsum modi, commodi suscipit delectus maiores itaque maxime corrupti fugiat inventore sunt? Cumque, magni doloribus, nisi iste quidem maxime molestiae distinctio dolore tempora adipisci cum aperiam hic accusamus nostrum nam veniam, porro voluptates quos praesentium. Molestias enim qui quas a error tempora laudantium ratione dolorem nihil, omnis repudiandae quibusdam asperiores pariatur officia ad voluptates nesciunt officiis debitis, quos impedit aperiam maxime, magnam quidem. Doloribus nulla earum id labore corporis omnis similique placeat suscipit. Alias officia delectus atque placeat ipsa. Temporibus accusantium illo nesciunt impedit excepturi error saepe, quisquam laboriosam totam ratione delectus officia? Explicabo laborum ipsum vero possimus magni dolorem voluptas eum maiores dignissimos fugit, sequi eligendi ipsa quaerat, esse nostrum officia unde molestias voluptatibus? Debitis laborum blanditiis natus rerum. Tempora, obcaecati, sapiente laudantium tempore dicta provident quasi quo perspiciatis adipisci facere assumenda id dolores quos esse aliquam, veritatis molestiae! Ipsum architecto eveniet officia eum, enim aut in doloremque repellendus mollitia. Saepe incidunt ex quae aliquam voluptatibus, totam aperiam earum accusamus voluptas, adipisci molestias. Debitis culpa ex omnis, deserunt, et dolorum tempora fugiat error architecto asperiores vel magni voluptatum dolore nobis aliquam inventore. Tenetur deleniti magnam accusamus totam debitis eaque officia tempore ipsum sint recusandae unde necessitatibus dolores, minus nemo ea consectetur nostrum dolorum iste nobis quae quidem impedit id pariatur? Dolorem minima iusto explicabo. Perferendis iure delectus, sit mollitia facilis illum reiciendis ad voluptas vero blanditiis obcaecati non! In sed ratione corporis molestiae explicabo modi nobis quod, optio id inventore voluptatibus vel! Tempora quisquam doloribus maxime ut repudiandae nesciunt, in molestiae aperiam dolores inventore hic reiciendis, quo nemo vitae recusandae non mollitia, nihil corporis. Deleniti dolor eaque fuga necessitatibus esse quia earum aliquam praesentium facilis porro, beatae blanditiis commodi quos maxime? Recusandae at mollitia beatae similique ducimus vitae ex placeat sequi incidunt neque perspiciatis error impedit enim, dolorum minus cumque modi explicabo reiciendis molestias doloremque! Laudantium obcaecati nemo pariatur tempora qui aut fuga provident animi dicta voluptatibus eligendi est eveniet vitae, beatae aperiam, nobis quam ab corporis nostrum sed iure natus. Assumenda tempore dolores laboriosam nam dolor reiciendis ut quis iure accusamus, ab eligendi libero, consequatur pariatur possimus molestiae culpa quod similique!</p>
</div>


            </div>
        </div>
    );
}


