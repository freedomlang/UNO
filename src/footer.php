<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>

        </div><!-- end .row -->
    </div>
</div><!-- end #body -->

<footer id="footer" role="contentinfo">
    Copyright &copy; 2015-<?php echo date('Y'); ?> <a href="<?php $this->options->siteUrl(); ?>"><?php $this->options->title(); ?></a>.
    <?php _e('由 <a href="http://www.typecho.org">Typecho</a> 强力驱动'); ?>.
</footer><!-- end #footer -->
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="http://ccccc-10022761.cos.myqcloud.com/rotating.js"></script>
    <script src="http://ccccc-10022761.file.myqcloud.com/jquery.goup.min.js"></script>
    <script>
    var current_page = 1;
    var tempHtml="";
    var re = /<div id=\"load_more.+>/g;// a reqular expression to replace the manual load button
    if ($(window).width()>1024) {
        window.addEventListener('scroll', autoLoad);
        $("#load_more").remove();
    }
    function autoLoad(){
        if ($(document).height() - $(window).height() - $(window).scrollTop() < 800){
        current_page ++;
        window.removeEventListener('scroll', autoLoad);
        var load_post_url = window.location.href + "page/" + current_page + "/?load_type=ajax" ;
        $.get(load_post_url,function(html){
            tempHtml = html.split(re)[0];// replace the manual load button
            $('#main').append($(tempHtml));
            // active the codepen's block
            (function () {
                 document.getElementsByClassName||(document.getElementsByClassName=function(e){var n,t,r,a=document,o=[];if(a.querySelectorAll)return a.querySelectorAll("."+e);if(a.evaluate)for(t=".//*[contains(concat(' ', @class, ' '), ' "+e+" ')]",n=a.evaluate(t,a,null,0,null);r=n.iterateNext();)o.push(r);else for(n=a.getElementsByTagName("*"),t=new RegExp("(^|\\s)"+e+"(\\s|$)"),r=0;r<n.length;r++)t.test(n[r].className)&&o.push(n[r]);return o}),function(){function e(){function e(){for(var e=document.getElementsByClassName("codepen"),u=e.length-1;u>-1;u--){var i=r(e[u]);if(i=a(i),i.user=n(i,e[u]),t(i)){var c=o(i),s=l(i,c);d(e[u],s)}}}function n(e,n){if("string"==typeof e.user)return e.user;for(var t=0,r=n.children.length;r>t;t++){var a=n.children[t],o=a.href||"",u=o.match(/codepen\.(io|dev)\/(\w+)\/pen\//i);if(u)return u[2]}return"anon"}function t(e){return e["slug-hash"]}function r(e){for(var n={},t=e.attributes,r=0,a=t.length;a>r;r++){var o=t[r].name;0===o.indexOf("data-")&&(n[o.replace("data-","")]=t[r].value)}return n}function a(e){return e.href&&(e["slug-hash"]=e.href),e.type&&(e["default-tab"]=e.type),e.safe&&(e.animations="true"===e.safe?"run":"stop-after-5"),e}function o(e){var n=u(e),t=e.user?e.user:"anon",r="?"+c(e),a=e.preview&&"true"===e.preview?"embed/preview":"embed",o=[n,t,a,e["slug-hash"]+r].join("/");return o.replace(/\/\//g,"//")}function u(e){return e.host?i(e.host):"file:"===document.location.protocol?"http://codepen.io":"//codepen.io"}function i(e){return e.match(/^\/\//)||!e.match(/http:/)?document.location.protocol+"//"+e:e}function c(e){var n="";for(var t in e)""!==n&&(n+="&"),n+=t+"="+encodeURIComponent(e[t]);return n}function l(e,n){var t={id:"cp_embed_"+e["slug-hash"].replace("/","_"),src:n,scrolling:"no",frameborder:"0",height:s(e),allowTransparency:"true",allowfullscreen:"true",name:"CodePen Embed",title:"CodePen Embed","class":"cp_embed_iframe "+(e["class"]?e["class"]:""),style:"width: "+m+"; overflow: hidden;"},r="<iframe ";for(var a in t)r+=a+'="'+t[a]+'" ';return r+="></iframe>"}function s(e){return e.height?e.height:300}function d(e,n){if(e.parentNode){var t=document.createElement("div");t.innerHTML=n,e.parentNode.replaceChild(t,e)}else e.innerHTML=n}function f(){return 0;var e,n,t}var m="100%";e(),f()}function n(e){/in/.test(document.readyState)?setTimeout("window.__cp_domReady("+e+")",9):e()}window.__cp_domReady=n,window.__CPEmbed=e,n(function(){new __CPEmbed})}(); 
            })();
            window.addEventListener('scroll', autoLoad);
        })
        }
    }

    function manualLoad(){
        current_page ++;
        // var $newButton = $("#load_more").clone();
        var load_post_url = window.location.href + "page/" + current_page + "/?load_type=ajax" ;
        $.get(load_post_url,function(html){
            $("#load_more").remove();
            $('#main').append($(html));
            $('#load_more').click(manualLoad);
        });
    }

    $('#load_more').click(manualLoad);
</script>

    <!--[if lt IE 9]>
    <script src="http://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="http://cdn.staticfile.org/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="http://cdn.staticfile.org/normalize/2.1.3/normalize.min.css">
    <link rel="stylesheet" href="http://ccccc-10022761.file.myqcloud.com/grid.css">
    <link rel="stylesheet" href="http://ccccc-10022761.file.myqcloud.com/rt.css">
    <link rel="stylesheet" href="http://libs.useso.com/js/font-awesome/4.2.0/css/font-awesome.min.css">
    <script type="text/javascript">
    $(document).ready(function(){
    $.goup({
    containerSize: 35
    });
    });
    </script>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
<script src="//cdn.sassmeister.com/js/embed.js" async></script>
<?php $this->footer(); ?>
</body>
</html>
