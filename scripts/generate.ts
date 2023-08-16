import { createApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { getInfoByParseArgv, resolveModule } from './util';
import fse from 'fs-extra/esm';
import fs from 'node:fs/promises';
import { build } from './build';

const vue = `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`;

const previewTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- generate vue -->
    <title>ssg 魔法大陆</title>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?eddee58bd71af2b1030def6b8e8c7bb2";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
        </script>
        <script>
        (function (b, a, e, h, f, c, g, s) {
            b[h] =
            b[h] ||
            function () {
                (b[h].c = b[h].c || []).push(arguments);
            };
            b[h].s = !!c;
            g = a.getElementsByTagName(e)[0];
            s = a.createElement(e);
            s.src = "//s.union.360.cn/" + f + ".js";
            s.defer = !0;
            s.async = !0;
            g.parentNode.insertBefore(s, g);
        })(window, document, "script", "_qha", 457205, false);
        </script>
        <script>
        (function () {
            var bp = document.createElement("script");
            var curProtocol = window.location.protocol.split(":")[0];
            if (curProtocol === "https") {
            bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
            } else {
            bp.src = "http://push.zhanzhang.baidu.com/push.js";
            }
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(bp, s);
        })();
    </script>
    <link rel="icon" href="https://cms.boardmix.cn/images/board.ico" />
    <link rel="stylesheet" href="https://allstatics.wondershare.cn/neveragain/2019/assets/style/bootstrap-edraw.min.css" title="boardmix" />
    <link rel="stylesheet" href="https://boardmix-public.oss-cn-hangzhou.aliyuncs.com/cms/commonjs/common-2.css" title="boardmix" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
        <!-- generate style -->
    </style>
  </head>
  <body>
  <!-- generate content -->
  <script>
  <!-- generate script -->
  </script>
  <!-- 分割线 -->
  <script src="https://allstatics.wondershare.cn/neveragain/2019/assets/vendor/wsc-vendor.js"></script>
  <script src="https://allstatics.wondershare.cn/neveragain/2019/assets/script/wsc-common.js"></script>
  <script src="https://boardmix-public.oss-cn-hangzhou.aliyuncs.com/cms/commonjs/cas-client-board.www.js"
    defer></script>
  <script>
    $(function () {
      wsc.common.init();
    });
  </script>
  <script>
    function getCookie(name) {
      var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (arr != null) {
        return unescape(arr[2]);
      }
      return null;
    }
  </script>
  <script>
    const colorList = [
      "linear-gradient(135deg, rgba(129,148,254,255) 0%,rgba(156,132,252,255) 40.322%,rgba(206,103,248,255) 100%)",
      "linear-gradient(135deg, rgba(58,92,255,255) 2.465%,rgba(101,120,249,255) 39.975%,rgba(167,162,241,255) 100%)",
      "linear-gradient(135deg, rgba(74,160,255,255) 0%,rgba(101,194,239,255) 48.114%,rgba(134,246,255,255) 100%)",
      "linear-gradient(135deg, rgba(32,210,203,255) 0%,rgba(108,226,195,255) 40.561%,rgba(199,255,219,255) 100%)",
      "linear-gradient(135deg, rgba(254,225,165,255) 0%,rgba(255,203,170,255) 31.57%,rgba(255,147,179,255) 100%)"
    ];

    function avatarLabel(normal) {
      if (
        normal.charCodeAt(0) >= 0xd800 &&
        normal.charCodeAt(0) <= 0xdbff
      ) {
        return normal.substr(0, 2);
      }
      if (
        normal.charCodeAt(0) >= "A".charCodeAt(0) &&
        normal.charCodeAt(0) <= "z".charCodeAt(0)
      ) {
        return normal.charAt(0).toUpperCase();
      }
      return normal.charAt(0);
    }
    let userInfo = JSON.parse(getCookie('BOSYUNCurrent'))
    if (userInfo) {
      $('.header--login').hide()
      $('.header--user').show()
      $('.after-login').show()
      $('.header--menu--name').text(userInfo.nick_name)
      let nick_name = userInfo.nick_name.normalize()
      let mobile = userInfo.mobile
      let show_name;
      let show_bg;
      if (userInfo.avatar_url) {
        $('.avatar').attr('src', userInfo.avatar_url)
      } else {
        if (nick_name == '' || nick_name == '昵称未设置') {
          const userId = Number(userInfo.user_id);
          const pos = Number.isNaN(userId) ? 0 : userId % colorList.length;
          show_bg = colorList[pos];
        } else {
          show_name = avatarLabel(nick_name)
          $('.avatar').css('display', 'none')
          $('.ed-portrait--user__username').text(show_name)
          show_bg =
            'linear-gradient(135deg, rgba(74,160,255,255) 0%,rgba(101,194,239,255) 48.114%,rgba(134,246,255,255) 100%)'
        }
        $('.header--user--avatar').css('background', show_bg)
      }
    } else {
      $('.header--login').show()
      $('.header--user').hide()
    }
  </script>
  <script>
    $(function () {
      var timeout = null;
      window.addEventListener('scroll', function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(function () {
          var scrollTop = this.scrollY;
          if (scrollTop > 400) {
            $('.fic-to-top').addClass('fic-to-top__show')
          } else {
            $('.fic-to-top').removeClass('fic-to-top__show')
          }
        }.bind(this), 500);
      });
      $('.fic-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, '300');
      })
      $(".close-business-apply").click(function () {
        $(".business-apply").remove();
        $(".business-apply--btn-close").remove();
        $(".header").css('top', 0);
      });
    })

    function toggleHeaderExpand() {
      $('.header--expand').toggleClass('header--expand__active')
      $('.header--content').toggleClass('header--content__expand')
      $('.header--menu--mask').toggleClass('show')
      $('.expand-icon').toggleClass('d-none')
      $('.shrink-icon').toggleClass('d-none')
    }
    $('.header--expand').click(function () {
      toggleHeaderExpand()
    })
    $('.header--menu--mask').click(function () {
      toggleHeaderExpand()
    })
    $("a[href$='/app/']").click(function (e) {
      e.preventDefault();
      var userInfo = JSON.parse(getCookie('BOSYUNCurrent'));
      if (userInfo != null) {
        if ($(this).attr('target') == '_blank') {
          window.open($(this).attr('href'))
        } else {
          location.href = $(this).attr('href');
        }
      } else {
        location.href = 'https://boardmix.cn/user/login/?response_type=none&redirect_uri=https://boardmix.cn/app/my-space&from=1&product=board&ux_mode=redirect'
      }
    })
    function handleMobileHeaderClick() {
      if (window.innerWidth < 1181) {
        $('.header #collapse1').addClass('collapse')
        $('.header #collapse2').addClass('collapse')
      } else {
        $('.header #collapse1').removeClass('collapse')
        $('.header #collapse2').removeClass('collapse')
      }
    }
    handleMobileHeaderClick()
    $(window).resize(function () {
      handleMobileHeaderClick()
    });
  </script>
  <script>
    var sensors = window["sensors"]
    function track(event, properties) {
      if (sensors != undefined) {
        console.log(event, properties);
        sensors.track(event, properties);
      }
    }
    $(function () {
      var sensors = window["sensors"]
      const SensorsEvent = 'offcialWebsite'
      const sensorsList = {
        0: '所有产品-pixso首页',
        1: '所有产品-Board首页',
        2: '社区资源',
        3: '下载',
        4: '支持-帮助中心',
        5: '支持-反馈中心',
        6: '解决方案-思维导图',
        7: '解决方案-流程图',
        8: '探索-使用技巧',
        9: '探索-最新功能',
        10: '探索-帮助中心',
        11: '关于我们-产品故事',
        12: '关于我们-关于我们',
        13: "产品",
        14: "会员",
        15: "私有化部署"
      }
      const sensorsCreateList = {
        0: '创建白板',
        1: '创建BoardMix白板',
        3: "免费使用",
        4: "登录/注册",
        5: "进入工作台",
        6: "会员-免费使用",
        7: "会员-个人",
        8: "会员-团队",
        9: "立即购买终身",
        10: "立即购买专业",
        11: "抢先体验团队",
        12: "抢先体验企业",
        13: "成为终身会员"
      }

      $('.menu-track').click(function () {
        var _this = $(this)
        var sensorsIndex = _this.attr('data-track')
        if (sensorsIndex == undefined) {
          sensorsIndex = _this.parent('a').attr('data-track')
        }
        if (sensorsIndex != undefined) {
          var sensorsType = sensorsList[sensorsIndex]
          track(SensorsEvent, {
            offcial_website_type: sensorsType
          })
        }
      })

      $('.create-track').click(function () {
        var _this = $(this)
        var sensorsIndex = _this.attr('data-track')
        if (sensorsIndex == undefined) {
          sensorsIndex = _this.parent('a').attr('data-track')
        }
        if (sensorsIndex != undefined) {
          var sensorsType = sensorsCreateList[sensorsIndex]
          track(SensorsEvent, {
            offcial_website_button_type: sensorsType
          })
        }
      })
      var qiDianTimer = setTimeout(function () {
        var qiDianScript = document.createElement('script');
        qiDianScript.id = "qd30091108048337e4e42be68c981d6a0a9f31b09be5"
        qiDianScript.src = "https://wp.qiye.qq.com/qidian/3009110804/8337e4e42be68c981d6a0a9f31b09be5"
        qiDianScript.charset = "utf-8"
        qiDianScript.async = true
        qiDianScript.defer = true
        $('.header').before(qiDianScript)
        qiDianScript = null
        clearTimeout(qiDianTimer)
        qiDianTimer = null
      })
    })
  </script>
  </body>
</html>
`;

async function generate() {
    const mountId = await build();

    const {
        generatePath,
        generateHtmlFilePath,
        styleFilePath,
        generateStylePath,
        previewFilePath,
        jsFilePath,
        generateJsFilePath,
        compPath,
        previewStaticFilePath,
    } = getInfoByParseArgv();

    const comp = resolveModule(compPath);

    const compHtml = await renderToString(createApp(comp));

    const html = `<div id="${mountId}">${compHtml}</div>`;

    fse.mkdirpSync(generatePath);

    fse.outputFileSync(generateHtmlFilePath, html, {
        encoding: 'utf8',
    });

    fse.copySync(styleFilePath, generateStylePath);

    const style = await fs.readFile(generateStylePath, { encoding: 'utf8' });

    const distJS = await fs.readFile(jsFilePath, { encoding: 'utf8' });
    fse.outputFileSync(
        generateJsFilePath,
        distJS.replace('require("vue")', 'Vue'),
        {
            encoding: 'utf8',
        }
    );

    const script = await fs.readFile(generateJsFilePath, { encoding: 'utf8' });

    fse.outputFileSync(
        previewFilePath,
        previewTemplate
            .replace('<!-- generate vue -->', vue)
            .replace('<!-- generate style -->', style)
            .replace('<!-- generate content -->', html)
            .replace('<!-- generate script -->', script)
    );

    fse.outputFileSync(
        previewStaticFilePath,
        previewTemplate
            .replace('<!-- generate style -->', style)
            .replace('<!-- generate content -->', html)
    );
}

generate();
