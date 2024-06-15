import React from 'react'

export default function HadithBox() {
  return (
    <div class="mb-1 ms-2 haddis ">
              <div
                class="hadis-head  bg-info d-flex justify-content-between"
                style={{ height: "50px" }}
              >
                {/* Copy button */}
                <button
                  style={{ borderRadius: "30px" }}
                  class="btn btn-info btn-sm btn-custom ml-3 my-2"
                >
                  Copy
                  <i class="fa-solid fa-copy"></i>
                </button>
                {/* New hadis button */}
                <div class="btn btn-info btn-sm mr-3 my-2 rounded-circle d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-rotate text-light"></i>
                </div>
              </div>

              <div
                className=" card-body custom-scroll bg-opacity-10 bg-black"
                style={{
                  height: "350px",
                  borderBottomRightRadius: "30px",
                  borderBottomLeftRadius: "30px",
                }}
              >
                <div className="" style={{ maxWidth: "290px" }}>
                  <h5 className="card-title">Primary card title</h5>
                  <p className="card-text">
                    এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ
                    ওয়াহী প্রেরণ করেছি যেরূপ নূহ ও তাঁর পরবর্তী নবীদের (নবীদের)
                    প্রতি ওয়াহী প্রেরণ করেছিলাম।’’ (সূরাহ্ আন-নিসা ৪/১৬৩) ১.
                    ’আলক্বামাহ ইবনু ওয়াক্কাস আল-লায়সী (রহ.) হতে বর্ণিত। আমি
                    ’উমার ইবনুল খাত্তাব (রাঃ)-কে মিম্বারের উপর দাঁড়িয়ে বলতে
                    শুনেছিঃ আমি আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-কে
                    বলতে শুনেছিঃ কাজ (এর প্রাপ্য হবে) নিয়্যাত অনুযায়ী। আর মানুষ
                    তার নিয়্যাত অনুযায়ী প্রতিফল পাবে। তাই যার হিজরত হবে ইহকাল
                    লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশে- তবে তার হিজরত সে
                    উদ্দেশেই হবে, যে জন্যে, সে হিজরত করেছে।] (৫৪, ২৫২৯, ৩৮৯৮,
                    ৫০৭০, ৬৬৮৯, ৬৯৫৩; মুসলিম ২৩/৪৫ হাঃ ১৯০৭, আহমাদ ১৬৮) ( আধুনিক
                    প্রকাশনী- ১, ইসলামিক ফাউন্ডেশন ১)
                  </p>
                </div>
              </div>
            </div>
  )
}
