import { useState } from 'react';

const shepardTones = [
  new Audio('/shepard-tone/1.mp3'),
  new Audio('/shepard-tone/2.mp3'),
  new Audio('/shepard-tone/3.mp3'),
  new Audio('/shepard-tone/4.mp3'),
  new Audio('/shepard-tone/5.mp3'),
  new Audio('/shepard-tone/6.mp3'),
  new Audio('/shepard-tone/7.mp3'),
  new Audio('/shepard-tone/8.mp3'),
  new Audio('/shepard-tone/9.mp3'),
  new Audio('/shepard-tone/10.mp3'),
  new Audio('/shepard-tone/11.mp3'),
  new Audio('/shepard-tone/12.mp3'),
  new Audio('/shepard-tone/13.mp3'),
  new Audio('/shepard-tone/14.mp3'),
  new Audio('/shepard-tone/15.mp3'),
  new Audio('/shepard-tone/16.mp3'),
  new Audio('/shepard-tone/17.mp3'),
  new Audio('/shepard-tone/18.mp3'),
  new Audio('/shepard-tone/19.mp3'),
  new Audio('/shepard-tone/20.mp3'),
  new Audio('/shepard-tone/21.mp3'),
  new Audio('/shepard-tone/22.mp3'),
  new Audio('/shepard-tone/23.mp3'),
  new Audio('/shepard-tone/24.mp3'),
];

const useShepardTones = () => {
  const [index, setIndex] = useState(0);

  const playNextShepardTone = () => {
    shepardTones[index].play();
    setIndex((prev) => (prev === shepardTones.length - 1 ? 0 : prev + 1));
  };

  return [playNextShepardTone];
};

export default useShepardTones;
