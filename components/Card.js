'use client'
import { useEffect, useState } from "react"

export default function Card() {
    const [review, setReview] = useState([])

    // const apiUrlReview = process.env.NEXT_PUBLIC_REVIEWS;
    const apiUrlReview = "http://o-complex.com:1337/reviews";

    useEffect(() => {
        fetch(apiUrlReview).then(res => res.json()).then(res => {
            console.log(res);
            setReview(res)
        })

    }, [])

    const stripHtml = (html) => {
        return html
            .replace(/<\/(h1|p)>/g, '\n')
            .replace(/<[^>]*>/g, '');
    };

    return (
        <div className="flex gap-12 justify-center mt-12 flex-wrap">
            {
                review.map(item => (
                    <div key={item.id} className="max-w-[468px] py-5 px-7 rounded-2xl bg-[#D9D9D9]">
                        <p className="text-xl mb-6">Отзыв {item.id}</p>
                        {stripHtml(item.text)}
                    </div>
                ))
            }
        </div>
    )
}