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
       <>
       <h2>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolor est expedita nemo odit! Magnam, vero ratione, veniam accusamus amet doloribus ex officia ipsum odio eius totam quas fugiat tempora? loream200
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis hic molestiae accusamus consequatur quis praesentium ad ducimus ullam consectetur alias quam ab rem, id accusantium nam soluta modi minus quasi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut unde a, maxime eum voluptas excepturi et maiores, voluptate reiciendis saepe nisi dolor illum nesciunt error, itaque autem at minima! Optio. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, fugit quia. Quibusdam reiciendis ad consequatur aperiam dolorem porro aliquam laborum. Voluptatem repellat voluptatibus maxime maiores saepe est vitae iste laboriosam. amet consectetur adipisicing elit. Quibusdam voluptatibus dicta, sapiente maxime expedita earum maiores iusto aliquam id animi, quas laborum nostrum quae recusandae rem, quia officiis! Ab, <cupiditate className="loream">
        
     
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div></cupiditate></h2></>
    );
}


