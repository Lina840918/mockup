let inputField;
let micButton = { x: 300, y: 660, r: 30 };
let registerButton;
let recognition;
let isRecognizing = false;
let charCount = 0;
let maxChar = 20;
let tipText = "공지사항으로 매장 일정이나 이벤트를\n고객에게 효과적으로 알릴 수 있어요.";
let isActive = false;
let appBarImg;

function preload() {
  appBarImg = loadImage('appbar.jpg'); // 앱바 이미지 경로
}

function setup() {
  createCanvas(360, 780);
  noStroke();

  // 텍스트 인풋 필드
  inputField = createInput('');
  inputField.position(20, 130);
  inputField.size(320, 80);
  inputField.attribute('placeholder', '고객에게 알릴 공지사항을 작성해 주세요.');
  inputField.attribute('maxlength', maxChar);
  inputField.style('font-size', '16px');
  inputField.style('padding', '12px');
  inputField.style('border', '1px solid #ccc');
  inputField.style('border-radius', '12px');
  inputField.style('box-sizing', 'border-box');
  inputField.input(updateCharCount);

  // 등록 버튼
  registerButton = createButton('공지사항 등록');
  registerButton.position(20, 710);
  registerButton.size(320, 50);
  registerButton.style('font-size', '16px');
  registerButton.style('color', 'white');
  registerButton.style('border', 'none');
  registerButton.style('border-radius', '15px');
  registerButton.mousePressed(handleRegister);
  updateButtonStyle();

  // 음성 인식
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'ko-KR';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    inputField.value(transcript);
    updateCharCount();
  };

  recognition.onerror = function (event) {
    isRecognizing = false;
    alert("음성 인식 실패: " + event.error);
  };

  recognition.onend = function () {
    isRecognizing = false;
  };
}

function draw() {
  background(255);

  // 앱바
  image(appBarImg, 0, 0, width, 56);

  // TIP 박스
  fill('#F4F6F8');
rect(20, 230, 320, 60, 10);
let tipBoxX = 120;
let tipBoxY = 230;
let paddingX = 15;
let paddingY = 15;

fill('#5A75A7');
textSize(14);
textStyle(BOLD);
text("TIP", 120 + paddingX, 230+ paddingY + 2);

fill('#444');
textStyle(NORMAL);
textSize(14);
let lines = tipText.split('\n');
let startY = tipBoxY + paddingY + 2;

for (let i = 0; i < lines.length; i++) {
  text(lines[i], tipBoxX + paddingX + 40, startY + i * 18); // 각 줄 18px 간격
}

  // 글자 수 카운트
  fill('#777');
  textAlign(RIGHT);
  textSize(12);
  text(`${charCount}자 / ${maxChar}자`, width - 40, 215);

  // 마이크 버튼
  fill('#2D72F3');
  ellipse(micButton.x, micButton.y, micButton.r * 2);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text('🎤', micButton.x, micButton.y);
}

function mousePressed() {
  let d = dist(mouseX, mouseY, micButton.x, micButton.y);
  if (d < micButton.r && !isRecognizing) {
    recognition.start();
    isRecognizing = true;
  }
}

function handleRegister() {
  const content = inputField.value().trim();
  if (content.length === 0) {
    alert("공지사항을 입력해 주세요.");
    return;
  }
  console.log("등록된 공지:", content);
  alert("공지사항이 등록되었습니다.");
  inputField.value('');
  updateCharCount();
}

function updateCharCount() {
  charCount = inputField.value().length;
  isActive = charCount > 0;
  updateButtonStyle();
}

function updateButtonStyle() {
  if (isActive) {
    registerButton.style('background-color', '#2D72F3');
  } else {
    registerButton.style('background-color', '#C3C9D6');
  }
}
