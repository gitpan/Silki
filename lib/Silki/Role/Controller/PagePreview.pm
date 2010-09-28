package Silki::Role::Controller::PagePreview;
BEGIN {
  $Silki::Role::Controller::PagePreview::VERSION = '0.21';
}

use strict;
use warnings;
use namespace::autoclean;

use Silki::Formatter::WikiToHTML;

use Moose::Role;

sub _send_preview_html {
    my $self = shift;
    my $c    = shift;

    $self->_require_permission_for_wiki( $c, $c->stash()->{wiki}, 'Read' );

    my $formatter = Silki::Formatter::WikiToHTML->new(
        ( $c->stash()->{page} ? ( page => $c->stash()->{page} ) : () ),
        user        => $c->user(),
        wiki        => $c->stash()->{wiki},
        include_toc => 1,
    );

    my $html = $formatter->wiki_to_html( $c->request()->params()->{content} );

    $self->status_ok(
        $c,
        entity => { html => $html },
    );
}

1;