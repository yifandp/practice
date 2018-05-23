(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constrator : Player,
        musicList: [],
        init: function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex : -1,
        playMusic: function (index,music) {
            // 如果重复点击当前的音乐
            if(this.currentIndex == index){
                if(this.audio.pause){
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
            }else{
                // 不是点击当前音乐
                this.$audio.attr('src',music.link_url);
                this.audio.play();
                // 更新传进来的歌曲 索引index值
                this.currentIndex = index;
            }
        },
        preIndex: function () {
            var index = this.currentIndex - 1;
            if(index < 0){
                index = this.musicList.length - 1;
            }
        },
        nextIndex: function () {
            var index = this.currentIndex + 1;
            if(index > this.musicList.length - 1){
                index = 0;
            }
        },
        // 删除对应的音乐
        changeMusic: function (index) {
            this.musicList.splice(index, 1);
            // 判断当前删除的是否为播放的音乐前面的音乐
            if(index < this.currentIndex){
                this.currentIndex = this.currentIndex - 1;
            }
        },
        // 监听音乐播放时间进度
        musicTimeUpDtae: function (callBack) {
            var $this = this;
            this.$audio.on('timeupdate', function () {
                var duration = $this.audio.duration;;
                var currentTime = $this.audio.currentTime;
                var timeTemp = formatDate(currentTime,duration);
                callBack(duration,currentTime,timeTemp);
            })
        },
        // 定义一个格式化时间的方法
        formatDate: function (currentTime,duration) {
            var endMin = parseInt(duration / 60);
            var endSec = parseInt(duration % 60);
            endMin = endMin < 10 ? endMin + '0' : endMin;
            endSec = endSec < 10 ? endSec + '0' : endSec;

            var starMin = parseInt(currentTime / 60);
            var starSec = parseInt(currentTime % 60);
            starMin = starMin < 10 ? starMin + '0' : starMin;
            starSec = starSec < 10 ? starSec + '0' : starSec;

            return starMin +':'+ starSec +' / '+ endMin +':'+ endSec;
        },
        musicSeekTo: function (value) {
            if(isNaN(value))return;
            this.audio.currentTime = this.audio.duration * value;
        },
        musicVoiceSeekTo: function (value) {
            if(isNaN(value))return;
            if(value < 0 || value > 1) return;
            this.audio.volume = value;
        }
    }

    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;

})(window)