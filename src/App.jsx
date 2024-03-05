import { useEffect, useState } from "react";
import Audio from "./Audio";
import { audios } from "./audios";
import { AudiosContext } from "./audiosContext";

function App() {
    const [current, setCurrent] = useState(null);
    return (
        <AudiosContext.Provider
            value={{
                current,
                setCurrent,
            }}>
            <div className="flex h-[100dvh] items-center justify-center">
                <div className="h-[90dvh] md:grid md:grid-cols-2  xl:grid-cols-3 px-5 md:gap-5 md:px-10  lg:max-w-[1200px] overflow-y-scroll mt-10">
                    {audios.map((audio) => (
                        <Audio key={audio?.id} file={audio} />
                    ))}
                </div>
                <div></div>
            </div>
        </AudiosContext.Provider>
    );
}

export default App;
