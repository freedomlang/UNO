<?php
/**
 * 修改自Typecho0.9的默认皮肤
 * 
 * 
 * @author blackywkl
 * @version 1.0
 * @link http://freedomlang.com
 */
/** 开启gzip压缩 */  
ob_start('ob_gzhandler');
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
 $this->need('header.php');
 ?>
<?php //ajax方式加载文章列表 ?>
<?php if(isset($_GET['load_type']) and $_GET['load_type'] == 'ajax'):  ?>
	<?php while($this->next()): ?>
    	<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
			<h2 class="post-title" itemprop="name headline"><a itemtype="url" href="<?php $this->permalink() ?>"><?php $this->title() ?></a></h2>
			<ul class="post-meta">
				<span><?php $this->category(','); ?></span>
				<span><time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('n月j日'); ?></time></span>
			</ul>
            <div class="post-content" itemprop="articleBody">
    			<?php $this->summary(); ?>
            </div>
    	</article>
	<?php endwhile; ?>
    <div id="load_more">
        <button class="ajax pure-button">More Articles</button>
    </div>
    <?php return; //完成ajax方式返回，退出此页面?>
<?php endif ?>
<div class="col-mb-12" id="main" role="main">
	<?php while($this->next()): ?>
        <article class="post" itemscope itemtype="http://schema.org/BlogPosting">
			<h2 class="post-title" itemprop="name headline"><a itemtype="url" href="<?php $this->permalink() ?>"><?php $this->title() ?></a></h2>
			<ul class="post-meta">
				<span><?php $this->category(','); ?></span>
				<span><time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('n月j日'); ?></time></span>
			</ul>
            <div class="post-content" itemprop="articleBody">
    			<?php $this->summary(); ?>
            </div>
        </article>
	<?php endwhile; ?>
<div id="load_more">
    <button class="ajax pure-button">More Articles</button>
</div>

</div><!-- end #main-->
<?php $this->need('footer.php'); ?>
