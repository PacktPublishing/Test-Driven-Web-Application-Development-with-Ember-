$ ember new supercart
$ cd supercart
$ ember install ember-cli-bootstrap-sassy
$ ember install ember-cli-sass
$ ember serve


// app/styles/app.scss
$body-bg: #eee;
$navbar-default-bg: #a33;
$navbar-default-link-color: #fff;
$border-radius-base: 0;
$thumbnail-border: #a33;
$thumbnail-bg: #fff;

@import "bootstrap";


// app/templates/application.hbs
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      {{#link-to 'index' class="navbar-brand"}}Supercart{{/link-to}}
    </div>
  </div><!-- /.container-fluid -->
</nav>
<div class="container">
  <h2>Products</h2>
  <div class="row">
    <div class="col-sm-4 col-md-3">
      <div class="thumbnail">
        <img src="http://via.placeholder.com/250x250" alt="Product">
        <div class="caption">
          <h3>Thumbnail label</h3>
        </div>
      </div>
    </div>
    <div class="col-sm-4 col-md-3">
      <div class="thumbnail">
        <img src="http://via.placeholder.com/250x250" alt="Product">
        <div class="caption">
          <h3>Thumbnail label</h3>
        </div>
      </div>
    </div>
    <div class="col-sm-4 col-md-3">
      <div class="thumbnail">
        <img src="http://via.placeholder.com/250x250" alt="Product">
        <div class="caption">
          <h3>Thumbnail label</h3>
        </div>
      </div>
    </div>
    <div class="col-sm-4 col-md-3">
      <div class="thumbnail">
        <img src="http://via.placeholder.com/250x250" alt="Product">
        <div class="caption">
          <h3>Thumbnail label</h3>
        </div>
      </div>
    </div>
  </div>
</div>