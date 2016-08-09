<?php //ajax方式加载文章列表 ?>
<?php if(isset($_GET['load_type']) and $_GET['load_type'] == 'ajax'):  ?>
    <?php return; //完成ajax方式返回，退出此页面?>
<?php endif ?>
<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<!DOCTYPE HTML>
<html class="no-js">
<head>
    <meta charset="<?php $this->options->charset(); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <title><?php $this->archiveTitle(array(
            'category'  =>  _t('分类 %s 下的文章'),
            'search'    =>  _t('包含关键字 %s 的文章'),
            'tag'       =>  _t('标签 %s 下的文章'),
            'author'    =>  _t('%s 发布的文章')
        ), '', ' - '); ?><?php $this->options->title(); ?></title>

    <!-- 使用url函数转换相关路径 -->

    <link rel="stylesheet" href="<?php $this->options->themeUrl('style.min.css.php'); ?>">
    <link rel="stylesheet" href="http://ccccc-10022761.file.myqcloud.com/pure-min.css">
    <link rel="icon" type="image/ico" href="<?php $this->options->themeUrl('favicon.ico'); ?>">


    <!-- 通过自有函数输出HTML头部信息 -->
    <?php $this->header(); ?>
</head>
<body>
<!--[if lt IE 8]>
    <div class="browsehappy" role="dialog"><?php _e('当前网页 <strong>不支持</strong> 你正在使用的浏览器. 为了正常的访问, 请 <a href="http://browsehappy.com/">升级你的浏览器</a>'); ?>.</div>
<![endif]-->
<div class="loader">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="search">
		<form autocomplete="off" class="sform" action="./" method="post">
<div class="table-center">
			<p>按回车键搜索</p>
    		<input type="text" id="search" autofocus="true" name="s"></div>
		</form>
		<label class="search-close" onclick="hide()"></label>
	</div>
    <header id="header" class="clearfix">
        <!-- The menu -->
        
    <!-- Content area -->
<div class="logo"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 52.7 112.1" enable-background="new 0 0 52.7 112.1" xml:space="preserve" style="position: fixed; left: 20px; fill: rgb(102, 102, 102); height: 50px; top:6px">
<g>
	<path d="M42.3,66.6v-29h7.1c1.8,0,3.3-1.4,3.3-3.3v-0.2c0-1.8-1.5-3.3-3.3-3.3h-7.1V3.3C42.3,1.4,40.7,0,39,0h-0.2
		c-1.8,0-3.3,1.4-3.3,3.3v59.9C37.7,64.3,40,65.5,42.3,66.6z"/>
	<path d="M35.4,65.9v21.8c0,1.8,1.5,3.3,3.3,3.3H39c1.8,0,3.3-1.5,3.3-3.3V69.4C40,68.2,37.7,67,35.4,65.9z"/>
	<path d="M27,68.6h0.2c1.8,0,3.3-1.5,3.3-3.3v-1.9c-2.3-1.2-4.5-2.3-6.8-3.5v5.4C23.7,67.1,25.2,68.6,27,68.6z"/>
	<path d="M30.5,60.6V35.2c0-1.8-1.5-3.3-3.3-3.3H27c-1.8,0-3.3,1.5-3.3,3.3v22C26,58.3,28.3,59.5,30.5,60.6z"/>
	<path d="M19.6,55.1c0-0.9,0-1.8,0-2.7L19.5,28c0-1.9-1.5-3.3-3.3-3.3H16c-1.8,0-3.3,1.4-3.3,3.3l0.1,23.7
		C15.1,52.8,17.3,54,19.6,55.1z"/>
	<path d="M7.3,48.9V36.4c0-1.8-1.6-3.3-3.3-3.3H3.8c-1.8,0-3.3,1.5-3.3,3.3v9.2C2.8,46.7,5.1,47.8,7.3,48.9z"/>
	<path d="M20,70.9c-0.2-0.6-0.6-1.1-1.2-1.5c0.3-3.7,0.6-7.5,0.7-11.6c-2.2-1.1-4.5-2.3-6.7-3.4c-0.1,5.3-0.3,10.4-0.7,15
		c-0.6,5.2-1.4,10.1-2.6,14.8c-2.1,8.2-5.1,15.5-9.1,22.9c-0.9,1.6-0.3,3.5,1.2,4.4l0.1,0.1c0.8,0.4,1.7,0.6,2.6,0.4
		c0.9-0.2,1.5-0.8,2-1.6C11.5,101,15,91.6,17,81.5l9,22.2c0.3,0.8,0.9,1.5,1.7,1.7c0.9,0.5,1.8,0.4,2.7,0c1.6-0.6,2.4-2.5,1.7-4.2
		L20,70.9z"/>
	<path d="M3.8,71.6H4c1.7,0,3.3-1.5,3.3-3.3V51.6c-2.3-1.1-4.5-2.3-6.8-3.4v20C0.5,70.1,2,71.6,3.8,71.6z"/>
</g>
</svg></div>
        <div class="container">
            <div class="row">
                <div class="col-mb-12">
                    <nav id="nav-menu" class="clearfix" role="navigation">
                        <a href="<?php $this->options->siteUrl(); ?>"><?php _e('首页'); ?></a>
                        <?php $this->widget('Widget_Contents_Page_List')->to($pages); ?>
                        <?php while($pages->next()): ?>
                            <a<?php if($this->is('page', $pages->slug)): ?> class="current"<?php endif; ?> href="<?php $pages->permalink(); ?>"><?php $pages->title(); ?></a>
                        <?php endwhile; ?>
<?php if($this->user->hasLogin()):?><?php if (!$this->is('index')):?><?php if($this->user->pass('editor','true')):?><a href="/dieci/write-post.php?cid=<?php echo $this->cid;?>">编辑</a><?php endif;?><?php endif;?><?php endif;?>
<a href="#/" onclick="show()"><i class="fa fa-search"></i></a>
                    </nav>
                </div>
            </div><!-- end .row -->
        </div>
        <div class="description">
            <span class="rword">前路崎嶇，從吾所好，一意孤行！</span>
            <span class="rword">勿忘初心，方得始终！</span>
            <span class="rword">岁月不饶人，我亦未曾饶过岁月！</span>
<span class="rword">图样图森破，上台拿衣服！</span>
<span class="rword">也曾寄望！</span>
        </div>

    </header><!-- end #header -->
    <nav class="menu">
  <input id="menu__button" type="checkbox" checked />
  <a class="menu__item" href="<?php $this->options->siteUrl(); ?>"><?php _e('首页'); ?></a>
  <?php $this->widget('Widget_Contents_Page_List')->to($pages); ?>
            <?php while($pages->next()): ?>
                <a class="menu__item" href="<?php $pages->permalink(); ?>" title="<?php $pages->title(); ?>"><?php $pages->title(); ?></a>
            <?php endwhile; ?>
            <a class="menu__item" href="http://freedomlang.com/resume"><?php _e('关于'); ?></a>
  <label class="menu__close" for="menu__button"></label>
</nav>
<div id="body" style="padding-top: 60px;">
    <div class="container">
        <div class="row">

    
    