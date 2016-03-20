<?php
/**
 * 留言板
 *
 * @package custom
 */
?>
<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php $this->need('header.php'); ?>

<div class="col-mb-12 col-12" id="main" role="main">
    <article class="post">
        <div class="post-content" itemprop="articleBody">
            <h2><?php $this->content(); ?></h2>
        </div>
    </article>
</div><!-- end #main-->
<?php include('comments.php'); ?>
<?php $this->need('footer.php'); ?>
