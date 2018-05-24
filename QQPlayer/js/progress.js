(function (window) {
    function Progress($progressBar,$progressLine,$progressDot) {
        return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }

    Progress.prototype = {
        constrator : Progress,

        init: function ($progressBar,$progressLine,$progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove: false,
        progressClick: function (callBack) {
            var $this = this;
            // 监听进度条的点击
            this.$progressBar.click(function (event) {
                // 默认left偏移量
                var normalLeft = $(this).offset().left;
                // 鼠标点击偏移量
                var eventLeft  = event.pageX;
                // 设置滚动条的位置
                $this.$progressLine.css('width', eventLeft - normalLeft);
                $this.$progressDot.css('left', (eventLeft - normalLeft) - 5);

                //设置音乐的播放时长（跳转）
                var value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            })
        },
        ProgressMove: function (callBack) {
            var $this = this;
            // 默认left偏移量
            var normalLeft = this.$progressBar.offset().left;
            var eventLeft;
            // 监听鼠标按下事件
            this.$progressBar.mousedown(function () {
                $this.isMove = true;
                // 监听鼠标按移动事件
                $(document).mousemove(function (event) {
                    eventLeft  = event.pageX;
                    var movePos = eventLeft - normalLeft;
                    if(movePos < 0){
                        movePos = 0;
                    }else if(movePos > $this.$progressBar.width() - 10){
                        movePos = $this.$progressBar.width() - 10 ;
                    }
                    $this.$progressLine.css('width', movePos);
                    $this.$progressDot.css('left', movePos);
                })
            })
            // 监听鼠标抬起事件
            $(document).mouseup(function () {
                $(document).off('mousemove');
                $this.isMove = false;
                //设置音乐的播放时长（跳转）
                var value = (eventLeft - normalLeft) / $this.$progressBar.width();
                callBack(value);
            })
        },
        // 设置精度条的进度（随时间变化）
        setProgress: function (value) {
            if(this.isMove)return;
            if(value < 0 && value > 100)return;
            this.$progressLine.css('width',value + '%');
            this.$progressDot.css('left',value + '%');
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);