let audioOn = true;
let videoOn = true;
let haveBeenEmbarrassed = false;
let colleagueTiles = [];
let currentColleague = 0;
let openingDialogueCompleted = false;
let openingDialogueLine = 0;
let postEmbarrassmentDialogueLine = -1;
let loopingDialogueLine = -1;

window.addEventListener("load", function(event) {
  const join = document.getElementById("join");
  const audio = document.getElementById("audio");
  const video = document.getElementById("video");
  const endCall = document.getElementById("end-call");
  const embarrassYourself = document.getElementById("embarrass-yourself");
  const aprilFoolsTooltip = document.getElementById("dismiss-april-fools");
  const endCallTooltip = document.getElementById("dismiss-end-call");
  join.addEventListener('click', joinCall, false);
  audio.addEventListener('click', toggleAudio, false);
  video.addEventListener('click', toggleVideo, false);
  endCall.addEventListener('click', showEndCallTooltip, false);
  embarrassYourself.addEventListener('click', completeEmbarrassment, false);
  aprilFoolsTooltip.addEventListener('click', closeAprilFoolsTooltip);
  endCallTooltip.addEventListener('click', closeEndCallTooltip);

  colleagueTiles = document.querySelectorAll(".speech-bubble");
  setInterval(advanceMeetingDialogue, 5000);
  // start with colleague one (index 0)
  document.getElementById("bubble-1").style.display = "block";
});

function joinCall() {
  document.getElementById("screen-1").style.display = "none";
  document.getElementById("screen-2").style.display = "block";
}

function toggleAudio() {
  const audio = document.getElementById("audio");
  const audioIcon = document.getElementById("audio").querySelector("span");
  audioOn = !audioOn;

  if (audioOn) {
    audio.style.backgroundColor = "#ffffff";
    audio.style.color = "#000000";
    audioIcon.innerText = "mic";
  } else {
    audio.style.backgroundColor = "#fa4d4d";
    audio.style.color = "#ffffff";
    audioIcon.innerText = "mic_off";
  }

  timeToBeEmbarrassedCheck();
  showAprilFoolsTooltip(); // checks for post-embarrassment in this function
  closeEndCallTooltip();
}

function toggleVideo() {
  const video = document.getElementById("video");
  const videoIcon = document.getElementById("video").querySelector("span");
  const selfTileImg = document.getElementById("self-tile-screen-2").querySelector("img");

  videoOn = !videoOn;

  if (videoOn) {
    video.style.backgroundColor = "#ffffff";
    video.style.color = "#000000";
    videoIcon.innerText = "videocam";
    selfTileImg.src = "img/you.jpg";
  } else {
    video.style.backgroundColor = "#fa4d4d";
    video.style.color = "#ffffff";
    videoIcon.innerText = "videocam_off";
    selfTileImg.src = "img/you_camera_off.jpg";
  }

  timeToBeEmbarrassedCheck();
  showAprilFoolsTooltip(); // checks for post-embarrassment in this function
  closeEndCallTooltip();
}

function timeToBeEmbarrassedCheck() {
  if (!videoOn && !audioOn && !haveBeenEmbarrassed) setUpForEmbarrassment();
}

function setUpForEmbarrassment() {
  document.getElementById("embarrass-yourself").style.display = "block";
}

function completeEmbarrassment() {
  document.getElementById("embarrass-yourself").style.display = "none";
  haveBeenEmbarrassed = true;
  showAprilFoolsTooltip();
  document.getElementById("page-title").innerText = ".........";
  document.body.classList.add("embarrassing-background");
}

function showAprilFoolsTooltip() {
  if (haveBeenEmbarrassed) {
    document.getElementById("april-fools-tooltip").style.display = "block";
  }
}

function closeAprilFoolsTooltip() {
  document.getElementById("april-fools-tooltip").style.display = "none";
}
function showEndCallTooltip() {
  document.getElementById("end-call-tooltip").style.display = "block";
  closeAprilFoolsTooltip();
}

function closeEndCallTooltip() {
  document.getElementById("end-call-tooltip").style.display = "none";
}

function advanceMeetingDialogue() {
  let selectedTileIndex = currentColleague;
  
  while (selectedTileIndex === currentColleague) {
    selectedTileIndex = Math.floor(Math.random() * colleagueTiles.length);
  }
  currentColleague = selectedTileIndex;

  for (let i = 0; i < colleagueTiles.length; i++) {
    if (i === selectedTileIndex) {
      colleagueTiles[i].style.display = "block";
      colleagueTiles[i].parentElement.classList.add("speaking");
      // post-embarrassment dialogue
      if (haveBeenEmbarrassed) {
        let dialogueLine = postEmbarrassmentDialogueLine;
        do {
          dialogueLine = Math.floor(Math.random() * post_embarrassment_dialogue.length);
        } while (dialogueLine === postEmbarrassmentDialogueLine);
        postEmbarrassmentDialogueLine = dialogueLine;
        colleagueTiles[i].innerText = post_embarrassment_dialogue[dialogueLine];
      }
      else {
      // opening dialogue
      if (!openingDialogueCompleted) {
        colleagueTiles[i].innerText = opening_dialogue[openingDialogueLine];
        openingDialogueLine++;
        if (openingDialogueLine === opening_dialogue.length) {
          openingDialogueCompleted = true;
        }
      } else {
      // looping dialogue
        let dialogueLine = loopingDialogueLine;
        do {
          dialogueLine = Math.floor(Math.random() * looping_dialogue.length);
        } while (dialogueLine === loopingDialogueLine);
        loopingDialogueLine = dialogueLine;
        colleagueTiles[i].innerText = looping_dialogue[dialogueLine];
      }
      }
    } else {
      colleagueTiles[i].parentElement.classList.remove("speaking");
      colleagueTiles[i].style.display = "none";
    }
  }
}