$(function () {
    // 初始化 音乐列表区域的高度
    var mainH = $(window).height() - ($('.header').height() + $('.footer').height() + 46);
    $('.content').height(mainH);

    // 初始化自定义滚动条
    $(".content-list").mCustomScrollbar();

    var $audio = $('audio');
    var player = new Player($audio);
    var progress;
    var voiceProgress;
    var lyric;

    // 初始化音乐列表
    getPlayerList();

    // 初始化音乐列表函数
    function getPlayerList() {
        $.ajax({
            //url: 'http://api.jirengu.com/fm/getSong.php',
            url: './source/musiclist.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                // console.log(data);
                player.musicList = data;
                // 遍历获取到的数据 每一条音乐
                var $listMsic = $('.content-list ul');
                $.each(data, function (index, ele) {
                    var $item = createMusicItem(index, ele);
                    $listMsic.append($item);
                });

                initMusicInfo(data[0]);
                initMusicLyric(data[0]);
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    // 初始化音乐的信息
    function initMusicInfo(music) {
        // 获取对应信息
        var $musicImg = $('.song-info-pic img');
        var $musicName = $('.song-info-name a');
        var $musicSinger = $('.song-info-singer a');
        var $musicAblum = $('.song-info-ablum a');
        var $musicProgressName = $('.music-progress-title');
        var $musicProgressTime = $('.music-progress-time');
        var $musicBg = $('.mask-pic');

        $musicImg.attr('src', music.pictrue);
        $musicName.text(music.title);
        $musicSinger.text(music.singer);
        $musicAblum.text(music.album);
        $musicProgressName.text(music.title + ' - ' + music.album);
        $musicProgressTime.text('00:00 / ' + music.time);
        $musicBg.css("background", "url('" + music.pictrue + "') no-repeat center");
    };

    // 初始化事件监听
    initEvent();

    // 初始化进度条
    initProgress();

    // 初始化进度条函数
    function initProgress() {
        // 监听音乐进度条的事件
        var $progressBar = $('.music-progress-bar');
        var $progressLine = $('.music-progress-line');
        var $progressDot = $('.music-progress-dot');
        progress = new Progress($progressBar, $progressLine, $progressDot);
        progress.progressClick(function (value) {
            player.musicSeekTo(value);
            /*
              （音乐进度算法）
               精度条的前景色宽度 / 整个进度条的长度 = music的currentTime / music的duration
               得到以下公式
               music的currentTime = 精度条的前景色宽度 / 整个进度条的长度 * music的duration
            */
        });
        progress.ProgressMove(function (value) {
            player.musicSeekTo(value);
        });

        // 声音进度条
        var $voiceBar = $('.music-voice-bar');
        var $voiceLine = $('.music-voice-line');
        var $voiceDot = $('.music-voice-dot');
        voiceProgress = new Progress($voiceBar, $voiceLine, $voiceDot);
        voiceProgress.progressClick(function (value) {
            player.musicVoiceSeekTo(value);
        });
        voiceProgress.ProgressMove(function (value) {
            player.musicVoiceSeekTo(value);
        });
    }

    // 初始化事件监听函数
    function initEvent() {
        // 监听歌曲的移入移出事件
        $('.content-list').delegate('.list-music', 'mouseenter', function () {
            // 显示子菜单
            $(this).find('.list-menu').show();
            $(this).find('.list-time a').show();
            // 隐藏时长
            $(this).find('.list-time span').hide();
        });
        $('.content-list').delegate('.list-music', 'mouseleave', function () {
            // 隐藏子菜单
            $(this).find('.list-menu').hide();
            $(this).find('.list-time a').hide();
            // 显示时长
            $(this).find('.list-time span').show();
        });

        // 监听复选框选中
        $('.content-list').delegate('.list-check', 'click', function () {
            $(this).toggleClass('list-checked');
        });

        // 添加子菜单播放按钮监听
        var $musicPlay = $('.music-play');
        $('.content-list').delegate('.list-menu-play', 'click', function () {
            var $item = $(this).parents('.list-music');
            // 切换播放图标
            $(this).toggleClass('list-menuPlay');
            // 复原其他按钮
            $item.siblings().find('.list-menuPlay').removeClass('list-menuPlay');
            // 同步底部播放按钮
            if ($(this).attr('class').indexOf('list-menuPlay') != -1) {
                // 当前按钮是播放状态
                $musicPlay.addClass('music-paly-satr');
                // 当前文字高亮
                $item.find('.list-name,.list-singer a').css('color', 'rgba(255,255,255,1)');
                $item.siblings().find('.list-name,.list-singer a').css('color', 'rgba(255,255,255,.5)');
            } else {
                // 当前按钮不是是播放状态
                $musicPlay.removeClass('music-paly-satr');
                // 当前文字变暗
                $item.find('.list-name,.list-singer a').css('color', 'rgba(255,255,255,.5)');
            }
            // 显示与隐藏当前播放的动态icon
            $item.find('.list-number').toggleClass('list-numberMove');
            $item.siblings().find('.list-number').removeClass('list-numberMove');

            //播放音乐
            player.playMusic($item.get(0).index, $item.get(0).music);

            // 切换播放歌曲信息
            initMusicInfo($item.get(0).music);
            // 切换歌词信息
            initMusicLyric($item.get(0).music);

        });

        // 监听底部的播放按钮 播放
        $musicPlay.click(function () {
            // 判断有没有播放过
            if (player.currentIndex == -1) {
                // 没有播放过
                $('.list-music').eq(0).find('.list-menu-play').trigger('click');
            } else {
                // 播放过
                $('.list-music').eq(player.currentIndex).find('.list-menu-play').trigger('click');
            }
        });
        // 监听底部的播放按钮 上一首
        $('.music-pre').click(function () {
            $('.list-music').eq(player.preIndex()).find('.list-menu-play').trigger('click');
        });
        // 监听底部的播放按钮 下一首
        $('.music-next').click(function () {
            $('.list-music').eq(player.nextIndex()).find('.list-menu-play').trigger('click');
        });

        // 监听删除按钮
        $('.content-list').delegate('.list-music-del', 'click', function () {
            var $item = $(this).parents('.list-music');

            if ($item.get(0).index == player.currentIndex) {
                $('.music-next').trigger('click');
            }
            $item.remove();
            player.changeMusic($item.get(0).index);

            // 重新排序
            $('.list-music').each(function (index, ele) {
                ele.index = index;
                $(ele).find('.list-number').text(index + 1);
            })
        });

        // 监听音乐的播放进度设置与时间设置
        player.musicTimeUpDtae(function (duration, currentTime, timeTemp) {
            var value = currentTime / duration * 100;
            progress.setProgress(value);
            $('.music-progress-time').text(timeTemp);

            if(currentTime >= duration){
                $('.music-next').trigger('click');
            }


            // 歌词同步
            var index = lyric.currentIndex(currentTime);
            var $item = $('.song-lyric li');
            $item.eq(index).addClass('on').siblings().removeClass('on');

            if (index < 2) return;
            $('.song-lyric').css({
                'margin-top': (-index + 2) * 34
            })
        })

        // 监听声音按钮的点击
        $('.music-voice-icon').click(function () {
            $(this).toggleClass('music-voice-icon-on');
            if ($(this).attr('class').indexOf('music-voice-icon-on') != -1) {
                // 没有声音
                player.musicVoiceSeekTo(0);
            } else {
                // 有声音
                player.musicVoiceSeekTo(1);
            }
        })
    }

    // 初始化歌词信息
    function initMusicLyric(music) {
        lyric = new Lyric(music.link_lrc);
        var lyricContainer = $('.song-lyric');

        // 清空上一首歌曲的歌词信息
        lyricContainer.empty();

        lyric.loadLyric(function () {
            // 创建歌词
            $.each(lyric.lyrics, function (index, ele) {
                var $item = $('<li>' + ele + '</li>');
                lyricContainer.append($item);
            })
        });
    }

    // 定义一个方法创建一个音乐
    function createMusicItem(index, music) {
        var $itemTemp = $('<li class="list-music">\n' +
            '                            <div class="list-check"><i></i></div>\n' +
            '                            <div class="list-number">' + (index + 1) + '</div>\n' +
            '                            <div class="list-name">' + music.title + '' +
            '                                <div class="list-menu">\n' +
            '                                    <a class="list-menu-play" href="javascript:;" title="播放"></a>\n' +
            '                                    <a class="list-menu-add" href="javascript:;" title="添加"></a>\n' +
            '                                    <a class="list-menu-down" href="javascript:;" title="下载"></a>\n' +
            '                                    <a class="list-menu-share" href="javascript:;" title="分享"></a>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="list-singer"><a href="javascript:;">' + music.singer + '</a></div>\n' +
            '                            <div class="list-time">\n' +
            '                                <span>' + music.time + '</span>\n' +
            '                                <a class="list-music-del" href="javascript:;"></a>\n' +
            '                            </div>\n' +
            '                        </li>');

        $itemTemp.get(0).index = index;
        $itemTemp.get(0).music = music;
        return $itemTemp;
    }
})