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
        if (character && dialogRef.current) toggleDialog(dialogRef, character, setCharacter)
    }, [dialogRef.current])

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
                        <button className="splide__arrow splide__arrow--prev">&lt;</button>
                        <button className="splide__arrow splide__arrow--next">&gt;</button>
                    </div>
                </Splide>
                <span onPointerDown={() => toggleDialog(dialogRef, character, setCharacter)}>
                    [X]
                </span>
            </dialog>
        </>
    )
}

