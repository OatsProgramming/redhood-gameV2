import { useEffect, useRef } from "react";
import book from 'public/book.svg'
import Image from "next/image";
import toggleDialog from "@/lib/util/toggleDialog";
import useCharMove from "@/lib/zustand/charMoveStore";
import styles from './tutorialDialog.module.css'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import tutorialVids from "@/lib/tutorialVids";
import '@splidejs/react-splide/css/core';

export default function TutorialDialog() {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { character, setCharacter } = useCharMove()

    useEffect(() => {
        toggleDialog(dialogRef, character, setCharacter)
    }, [])

    return (
        <>
            <button onPointerDown={() => toggleDialog(dialogRef, character, setCharacter)}>
                <Image
                    src={book}
                    alt='Book'
                    width={50}
                    className={styles['icon']}
                />
            </button>
            <dialog ref={dialogRef} className={styles['dialog']}>

                <Splide tag='section' hasTrack={false} options={{
                    gap: '1rem'
                }}>
                    <SplideTrack>
                        {tutorialVids.map(vid => (
                            <SplideSlide key={vid.name}>
                                <div className={styles['slide']}>
                                    <div>{vid.name}</div>
                                    <div>
                                        <video
                                            src={vid.url}
                                            autoPlay
                                            loop
                                        />
                                        <p>{vid.description}</p>
                                    </div>
                                </div>
                            </SplideSlide>
                        ))}
                    </SplideTrack>
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </button>
                        <button className="splide__arrow splide__arrow--next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                </Splide>
                <button onPointerDown={() => toggleDialog(dialogRef, character, setCharacter)}>
                    [X]
                </button>
            </dialog>
        </>
    )
}

