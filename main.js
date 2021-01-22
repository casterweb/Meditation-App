const app = () =>{
    const song = document.querySelector('.song'),
        play = document.querySelector('.play'),
        outline = document.querySelector('.moving-outline circle'),
        video = document.querySelector('.vid-container video'),
        sounds = document.querySelectorAll('.sound-picker button'),
        timeSelect = document.querySelectorAll('.time-select button'),
        timeDisplay = document.querySelector('.time-display'),
        outlineLength = outline.getTotalLength();
        
        let fakeDucation = 600;

        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;

        sounds.forEach(sound => {
            sound.addEventListener("click", function(){
                song.src = this.getAttribute("data-sound");
                video.src = this.getAttribute("data-video");
              checkPlaying(song);
            });
          });

        play.addEventListener('click',() => {
           checkPlaying(song);
        });

        timeSelect.forEach(option => {
            option.addEventListener('click',function(){
                fakeDucation = this.getAttribute('data-time');
                timeDisplay.textContent = `${Math.floor(fakeDucation / 60)}:${Math.floor(fakeDucation % 60)}`;
            });
        });

        const checkPlaying =  song =>{
            if (song.paused){
                song.play();
                video.play();
                play.src='svg/pause.svg'
            } else {
                song.pause();
                video.pause();
                play.src="svg/play.svg"
            }
        };

        song.ontimeupdate =()=>{
            let currentTime = song.currentTime;
            let elapsed = fakeDucation - currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed /60);

            let progress = outlineLength - (currentTime / fakeDucation) * outlineLength;
            outline.style.strokeDashoffset = progress;

            timeDisplay.textContent = `${minutes}:${seconds}`;

            if (currentTime >= fakeDucation ){
                song.pause();
                song.currentTime = 0 ;
                play.src= 'svg/play.svg';
                video.pause();
            };
        };
};
app();

