import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AudiosContext } from "./audiosContext";

function Audio({ file }) {
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { current, setCurrent } = useContext(AudiosContext);

    const url = "https://od.lk";
    const audioRef = useRef();
    const HandleDownload = () => {
        window.open(`${url}/d/${file?.id}`, "_self");
    };
    const HandlePlayPause = () => {
        if (!isLoading) {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                // audioRef.current?.load();
                setIsPlaying(true);
                setCurrent(file?.id);
            }
        }
    };

    useEffect(() => {
        audioRef.current?.addEventListener("canplay", () => {
            setIsLoading(false);
        });
    }, []);
    useEffect(() => {
        if (file?.id !== current) {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    }, [current, file?.id]);

    useEffect(() => {
        if (isPlaying)
            setInterval(() => {
                setTime(audioRef.current?.currentTime);
            }, 100);
    }, [isPlaying, time]);
    return (
        <>
            <div className="flex flex-col items-center">
                <p className=" font-semibold">{file?.name}</p>
                <div className="bg-stone-200 rounded-md h-20 flex gap-5 items-center my-2 px-2 w-80">
                    <img className="w-16 h-16 rounded-md" src="/Ekambi/ekambi.jpeg" alt="ekambi" />
                    <div>
                        <input
                            type="range"
                            min={0}
                            max={audioRef.current?.duration || 2000}
                            value={time}
                            onChange={(e) => {
                                if (!isLoading)
                                    audioRef.current.currentTime = parseInt(e.target.value);
                            }}
                        />
                        <span className="flex items-center justify-between">
                            {!isLoading && <p>{formatTime(time)}</p>}
                            <p>
                                {audioRef.current?.duration
                                    ? formatTime(audioRef.current.duration)
                                    : "00:00"}
                            </p>
                        </span>
                    </div>
                    {isPlaying ? (
                        <IoMdPause onClick={HandlePlayPause} className="text-xl mr-[-4px]" />
                    ) : (
                        <FaPlay
                            onClick={HandlePlayPause}
                            className={`${isLoading ? "text-stone-500" : "text-black"}`}
                        />
                    )}
                    <IoMdDownload
                        onClick={HandleDownload}
                        className={`text-2xl ${isLoading ? "text-stone-500" : "text-black"}`}
                    />
                </div>
            </div>
            <audio id={file?.id} ref={audioRef} src={`${url}/s/${file?.id}`} />
        </>
    );
}

export default Audio;

function formatTime(time) {
    const totalSeconds = Math.floor(time);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
}
