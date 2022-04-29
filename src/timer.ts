import { onMounted, ref } from "vue";

export const useTimer = (minutes = 3) => {
    const duration = ref(minutes * 60);
    const timer = ref();
    const timerInterval = ref();

    const start = () => {
        duration.value = minutes * 60;
        getTime(duration.value);
        setTimerInterval();
    };
    
    const stop = () => {
        clearInterval(timerInterval.value);
    };

    const resume = () => {
        getTime(duration.value);
        setTimerInterval();
    };

    const reset = () => {
        stop();
        start();
    };

    const setTimerInterval = () => {
        timerInterval.value = setInterval(() => {
            --duration.value;
            if (duration.value === 0) stop();
            getTime(duration.value);
        }, 1000);
    };

    const getTime = (duration: number) => {
        const minutes = Math.floor(duration / 60),
        seconds = duration % 60;
        const formatedMinutes = minutes < 10 ? "0" + minutes : minutes.toString(),
        formatedseconds = seconds < 10 ? "0" + seconds : seconds.toString();
        timer.value = formatedMinutes + ":" + formatedseconds;
    };

    onMounted(() => start());
    
    return {
        duration,
        timer,
        start,
        stop,
        resume,
        reset
    }
}
