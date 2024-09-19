let song;
let peakDetect;
let fft;

let x = 40;
let y = 40;
let changeColor = false;

function preload() {
  // Load your mp3 file here
  song = loadSound('audio.mp3');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);

  // Create an FFT analyzer
  fft = new p5.FFT();
  
  // Create PeakDetect with custom thresholds
  peakDetect = new p5.PeakDetect(20, 20000, 0.2, 20); // Detects peaks across all frequencies

  // Play the song
  song.play();
}

function draw() {
  background(0, 20); // Slightly transparent background for fade effect
  
  // Analyze the sound and update the peak detector
  fft.analyze();
  peakDetect.update(fft);

  // If a peak (onset) is detected, change the color
  if (peakDetect.isDetected) {
    changeColor = !changeColor; // Toggle the color change
  }

  // Use the changeColor flag to switch between two colors
  if (changeColor) {
    stroke(0, 255, 0); // Green
  } else {
    stroke(255, 0, 0); // Red
  }
  
  // Drawing a simple pattern that reacts to onset detection
  if (y <= height - 40) {
    line(x - 5, y - 5, x + 5, y + 5);
    x += 25;
  }
  if (x > width - 40) {
    x = 40;
    y += 10;
  }
  if (y >= height - 40) {
    x = 40;
    y = 40;
  }
}
  
// Start playing the song when mouse is pressed
function mousePressed() {
  if (!song.isPlaying()) {
    song.play();
  } else {
    song.pause();
  }
}
