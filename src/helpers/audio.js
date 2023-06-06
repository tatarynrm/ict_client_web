import sound from "../assets/sounds/message.wav";
import send from "../assets/sounds/send.wav";
export const beep = () => {
  let snd = new Audio(sound);
  snd.volume = 0.1;
  snd.play();
};
export const beepSend = () => {
  let snd = new Audio(send);
  snd.volume = 0.1;
  snd.play();
};
