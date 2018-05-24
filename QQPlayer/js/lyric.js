(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }

    Lyric.prototype = {
        constructor: Lyric,

        init: function (path) {
            this.path = path;
        },
        times: [],
        lyrics: [],
        loadLyric: function (callBack) {
            var $this = this;
            $.ajax({
                url: $this.path,
                dataType: 'text',
                success: function (data) {
                    $this.parseLyric(data);
                    callBack();
                },
                error: function (e) {
                    console.log(e);
                }
            })
        },
        parseLyric: function (data) {
            var $this = this;
            // 清空上一首的歌曲的时间和歌词数据
            this.times = [];
            this.lyrics = [];

            var array = data.split('\n');
            var timeReg = /\[(\d*:\d*\.\d*)\]/;

            $.each(array,function (index,ele) {
                // 处理歌词

                var lrc = ele.split(']')[1];
                if(lrc.length == 1) return true;
                $this.lyrics.push(lrc);

                // 处理时间
                var res = timeReg.exec(ele);

                if(res == null){
                    return true;
                }

                var timeStr = res[1];
                var res2 = timeStr.split(':');
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(min + sec).toFixed(2));
                $this.times.push(time);
            })
        },
        index: -1,
        currentIndex: function (currentTime) {
            if(currentTime >= this.times[0]){
                this.index++;
                this.times.shift(); // 删除数组最前面的一个
            }
            return this.index;

            /*
            * 同步歌词原理：
            *
            * [0.92, 4.8, 6.4, 23.59, 26.16, 29.33, 34.27, 36.9,...];
            *
            * ["告气球 - 周杰伦" , "词： 方文山", "曲：周杰伦", "塞纳德河畔作案的咖啡",...]
            * */
        }
    }

    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);