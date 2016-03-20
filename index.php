<?php
/**
 * 修改自Typecho0.9的默认皮肤
 * 
 * 
 * @author blackywkl
 * @version 1.0
 * @link http://freedomlang.com
 */
ob_start('ob_gzhandler');
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
 $this->need('header.php');
 ?>
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
    <?php $this->pageNav('&laquo; 前一页', '后一页 &raquo;'); ?>
</div><!-- end #main-->
<?php $this->need('footer.php'); ?>
