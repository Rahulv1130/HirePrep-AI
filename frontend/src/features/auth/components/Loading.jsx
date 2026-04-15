import {DotLottieReact}  from '@lottiefiles/dotlottie-react';

function Loading() {
    return(
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"

        }}>
            <DotLottieReact
                src="/loading.lottie"
                loop
                autoplay
                style={{width: 500 , height: 500}}
            />
        </div>
    )
}

export default Loading;