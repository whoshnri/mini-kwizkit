let audioContext: AudioContext | null = null;

function getAudioContext() {
 if (typeof window ==="undefined") {
 return null;
 }

 if (!audioContext) {
 audioContext = new AudioContext();
 }

 return audioContext;
}

function playTone(frequency: number, durationSec: number, volume = 0.12) {
 const ctx = getAudioContext();
 if (!ctx) return;

 void ctx.resume();

 const oscillator = ctx.createOscillator();
 const gain = ctx.createGain();

 oscillator.type ="sine";
 oscillator.frequency.value = frequency;
 gain.gain.value = volume;

 oscillator.connect(gain);
 gain.connect(ctx.destination);

 const start = ctx.currentTime;
 oscillator.start(start);
 gain.gain.exponentialRampToValueAtTime(0.001, start + durationSec);
 oscillator.stop(start + durationSec);
}

export const liveSounds = {
 join() {
 playTone(660, 0.12);
 },
 leave() {
 playTone(440, 0.16);
 },
 flag() {
 playTone(880, 0.08);
 window.setTimeout(() => playTone(880, 0.08), 120);
 },
 message() {
 playTone(523, 0.1);
 },
};
