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
console.log("Refresh");
    return (
        <div style={{ overflowX: 'hidden' }}>
<div ref={scrollRef} className="scroll-container" style={{ overflowY: 'scroll', position:'fixed'}}>

<div className="p-3 ">
    <h1>Page</h1>
 <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam assumenda voluptatem doloribus sit velit quas, natus delectus aspernatur culpa fugit, eligendi veritatis consectetur nemo nostrum, harum et. Inventore, explicabo architecto?
    </h3>   <p>Lorem ipsum dolor Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit aspernatur laudantium tempora neque maiores aliquam quas accusantium fugit officia explicabo, minima non ex molestiae harum dolorum veniam doloribus aliquid? Accusamus cumque obcaecati nemo facilis soluta nesciunt, id corrupti sed expedita tempore eos maxime distinctio dolorem itaque consequatur, at quas! Nesciunt neque sint cum quos eos autem sit odit. Eius illo ex facere veniam perferendis consectetur quidem dolore mollitia cum sapiente voluptas voluptate porro quibusdam, quae soluta commodi, in quod totam, sed voluptates qui? Expedita asperiores velit cum reprehenderit omnis excepturi, eveniet soluta reiciendis aperiam sunt. Nihil, quas fuga dolorum reiciendis esse consequuntur aliquam culpa quam possimus. Ipsa harum fuga quisquam. Repellat maxime quos, eveniet nulla itaque enim natus corporis reprehenderit accusamus, atque quia expedita culpa velit assumenda mollitia ratione necessitatibus tenetur hic saepe vel ad nostrum! Amet, asperiores odio! Omnis enim tempore amet quia optio earum laudantium pariatur provident assumenda voluptatem harum quas, voluptas, maxime dolorum totam reiciendis, architecto molestiae! Doloremque perspiciatis doloribus et suscipit eos commodi quas repellat nihil. Culpa temporibus distinctio eum delectus itaque numquam. Perferendis doloribus nesciunt in, eos officiis beatae harum maxime accusantium id omnis officia quis animi ea provident tenetur unde nulla voluptates corporis ut quibusdam! Labore atque tempora temporibus perferendis animi quasi cum illo sed porro aperiam reprehenderit id officiis deleniti quibusdam provident ducimus vero, nemo illum repellat facilis quam corporis. Rem ducimus non, aliquid voluptatem eveniet necessitatibus nihil. Consectetur excepturi eos ut voluptatem, pariatur iure quo sapiente officiis, a inventore qui eius eum iste! Est blanditiis provident maiores eveniet enim beatae vitae qui, ratione, molestiae quod exercitationem? Provident voluptates, odit dolores veniam voluptatum harum, dolore nostrum id debitis quae exercitationem placeat inventore, repellendus deleniti adipisci dolor sint incidunt illum doloremque at eveniet. Ratione ex molestias sint asperiores, facere officia porro voluptatum quisquam voluptates eligendi nobis eveniet tenetur velit eius explicabo dignissimos veniam. Voluptas eveniet voluptatem quas officia nisi impedit quisquam voluptate autem laboriosam id? Voluptate a neque dolores, provident laborum quaerat soluta laboriosam doloribus eius. Voluptate eveniet fuga facilis voluptatem odit adipisci explicabo culpa, ipsa dicta laudantium reiciendis eaque vitae, et, id facere maxime quibusdam nobis corporis dolore atque sed. Expedita accusamus earum tempora beatae voluptas cumque velit, recusandae praesentium laudantium libero quaerat. Beatae placeat harum, commodi rerum corporis, voluptas alias voluptatibus saepe optio similique deserunt necessitatibus suscipit dolores quia exercitationem at a adipisci iure delectus esse ea, atque consectetur eius? Ipsam explicabo aspernatur natus, nobis dignissimos, soluta dolorum sunt iusto commodi tempora rerum repellat architecto cupiditate obcaecati maxime veritatis ducimus dolores odio non perferendis asperiores beatae? Nesciunt soluta laborum dicta placeat facere similique veritatis quos aspernatur iure, asperiores, nam architecto veniam voluptate! Porro, numquam libero, culpa molestias amet quam assumenda sapiente rem dignissimos et repellendus ducimus nulla voluptas iusto laudantium suscipit repellat enim magnam repudiandae atque! Iusto numquam facere cupiditate corporis ea cum deserunt omnis dolor veniam rem odit debitis mollitia, illo ex molestias, at non inventore nam. Cum inventore sapiente nostrum, deleniti iste magnam, voluptatum consectetur dolores explicabo eligendi saepe ullam aliquam id voluptates! Fugiat beatae temporibus quos ut debitis, molestias ad dolore voluptate officia consequatur obcaecati magni unde modi autem ipsam porro provident deleniti odio blanditiis sapiente eos cupiditate quia! Debitis, dolores. Porro deserunt pariatur consequatur esse corporis, libero dolore impedit cum quidem sed quasi ipsam, dicta aliquid recusandae voluptate aliquam doloribus autem perspiciatis dolorum temporibus repudiandae error ex non tempora! Dolorum consectetur esse, aliquid pariatur exercitationem odit vitae ducimus sapiente, sed eaque a placeat non consequatur, repellat minima ullam earum eum quasi laboriosam eveniet possimus aliquam. Sapiente, illo, quasi vitae sunt culpa voluptatem assumenda id quo corporis illum, porro officia iste ad. Commodi facere reiciendis tenetur quasi reprehenderit eaque, at veniam est amet veritatis architecto dicta cum, qui quas in suscipit! Debitis at corrupti pariatur voluptatum error exercitationem, sint non quibusdam ipsum beatae cum impedit! Placeat ex dolor quo labore officia ut. Rerum nisi in harum doloribus adipisci officiis deserunt, voluptates neque ullam assumenda vitae hic voluptate repellendus, nemo nihil. Et tenetur incidunt asperiores eum vel rerum quisquam repellat maxime aliquid. Voluptates accusantium delectus libero nobis possimus, iste ut nam labore blanditiis hic porro esse, adipisci non. Hic praesentium mollitia sit error ducimus aperiam minima. Ad laudantium aspernatur adipisci eius, molestiae eligendi unde doloribus eaque minima? Beatae repellat sit id sunt maxime nihil doloremque quo, accusantium similique culpa vero cumque nulla inventore, voluptatum perspiciatis voluptatem esse numquam quae reiciendis possimus, minus delectus provident alias magnam. Recusandae provident incidunt placeat! Laboriosam officia suscipit minima ea, cupiditate soluta quidem id veritatis placeat quos, harum qui, omnis unde accusamus corporis. Expedita autem, ipsum id laboriosam nulla repudiandae alias ut assumenda recusandae incidunt, praesentium placeat earum? Libero, sit deleniti iste, nulla vitae cumque accusamus enim, cupiditate eveniet amet provident. Pariatur quisquam eos quam incidunt nemo soluta dolore itaque. Accusantium in earum eius labore quod pariatur. Optio facilis voluptatibus id perferendis dicta impedit repudiandae odio quae? Architecto impedit nihil quisquam ullam explicabo nam, quas a iste repellendus odit reiciendis beatae iusto pariatur sed facere dolorum quibusdam fugiat ea dolorem quo ut. Iusto non tempora quibusdam nesciunt quas, magnam hic ex nulla corrupti voluptatem dolores maiores similique blanditiis tempore sint, velit, ab eum eveniet amet optio eligendi asperiores fugit est! Soluta quod laborum illum magnam esse suscipit vitae hic doloremque dignissimos, similique quibusdam et placeat, ratione aperiam facere repellendus nihil. Saepe, deserunt! Commodi non veniam ipsum quo repudiandae provident autem consequuntur dicta? Cupiditate repudiandae aspernatur cumque unde? Debitis id natus cumque mollitia sequi ipsum nihil quisquam nemo. Natus commodi assumenda delectus accusamus harum, labore velit dolorem officia porro excepturi consequuntur eius cupiditate nam quos minima sunt laboriosam temporibus omnis deleniti. Cumque fugiat sapiente hic debitis facilis aliquam totam placeat eaque sint, maiores numquam praesentium, dolorem perspiciatis eum, perferendis excepturi esse laudantium! Id inventore quis similique, officiis quam dolore repudiandae perferendis ex eum, obcaecati sit a dolorem facilis aut quibusdam ipsum, rem fugit illo? Sed sequi quis cum quaerat rem voluptates placeat assumenda beatae? Doloribus error nemo voluptatibus iste eum ducimus beatae magnam rem veritatis nostrum!sit, amet consectetur adipisicing elit. Eaque quis error atque quas autem ratione deserunt facilis, quo ex commodi, laudantium eos. Repudiandae incidunt labore, quos omnis veritatis aspernatur repellat.</p>
</div>


            </div>
        </div>
    );
}


