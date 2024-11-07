declare module 'react-lottie' {
    import { Component } from 'react';

    interface Options {
        loop: boolean;
        autoplay: boolean;
        animationData: any;
        rendererSettings: {
            preserveAspectRatio: string;
        };
    }

    interface LottieProps {
        options: Options;
        height?: number;
        width?: number;
        isStopped?: boolean;
        isPaused?: boolean;
    }

    export default class Lottie extends Component<LottieProps> { }
}
