package Silki::Markdent::Role::WikiLinkResolver;
BEGIN {
  $Silki::Markdent::Role::WikiLinkResolver::VERSION = '0.15';
}

use strict;
use warnings;
use namespace::autoclean;

use List::AllUtils qw( all );
use Silki::I18N qw( loc );

use Moose::Role;

has _wiki => (
    is       => 'ro',
    isa      => 'Silki::Schema::Wiki',
    required => 1,
    init_arg => 'wiki',
);

has _page => (
    is       => 'ro',
    isa      => 'Silki::Schema::Page',
    init_arg => 'page',
);

sub _resolve_page_link {
    my $self         = shift;
    my $link_text    = shift;
    my $display_text = shift;

    my $wiki       = $self->_wiki();
    my $page_title = $link_text;

    if ( $link_text =~ m{^([^/]+)/([^/]+)$} ) {
        $wiki = Silki::Schema::Wiki->new( title => $1 )
            || Silki::Schema::Wiki->new( short_name => $1 );

        return {
            text => loc( '(Link to non-existent wiki - %1)', $link_text ),
            }
            unless $wiki;

        $page_title = $2;
    }

    my $page = $self->_page_for_title( $page_title, $wiki );

    unless ( defined $display_text ) {
        $display_text = $self->_link_text_for_page(
            $wiki,
            ( $page ? $page->title() : $page_title ),
        );
    }

    return {
        page  => $page,
        title => $page_title,
        text  => $display_text,
        wiki  => $wiki,
    };
}

sub _link_text_for_page {
    my $self       = shift;
    my $wiki       = shift;
    my $page_title = shift;

    my $text = $page_title;

    $text .= ' (' . $wiki->title() . ')'
        unless $wiki->wiki_id() == $self->_wiki()->wiki_id();

    return $text;
}

sub _page_for_title {
    my $self  = shift;
    my $title = shift;
    my $wiki  = shift;

    return Silki::Schema::Page->new(
        title   => $title,
        wiki_id => $wiki->wiki_id(),
    ) || undef;
}

sub _resolve_file_link {
    my $self         = shift;
    my $link_text    = shift;
    my $display_text = shift;

    my $wiki = $self->_wiki();

    return unless $link_text =~ m{^(?:([^/]+)/)?(?:([^/]+)/)?([^/]+)$};

    my $filename = $3;

    my $wiki_name;
    my $page_name;

    if ( all {defined} $1, $2, $3 ) {
        $wiki_name = $1;
        $page_name = $2;
    }
    elsif ( all { defined } $1, $3 ) {
        $page_name = $1;
    }

    if ( defined $wiki_name ) {
        $wiki = Silki::Schema::Wiki->new( title => $1 )
            || Silki::Schema::Wiki->new( short_name => $1 );

        return {
            text => loc( '(Link to non-existent wiki - %1)', $link_text ),
            }
            unless $wiki;
    }

    my $page = $self->_page();

    if ( defined $page_name ) {
        $page = Silki::Schema::Page->new(
            title   => $page_name,
            wiki_id => $wiki->wiki_id(),
        );

        return {
            text => loc( '(Link to non-existent page - %1)', $link_text ),
            }
            unless $page;
    }

    die "Cannot resolve file links without a page"
        unless $page;

    my $file = Silki::Schema::File->new(
        page_id  => $page->page_id(),
        filename => $filename,
    );

    unless ( defined $display_text ) {
        $display_text = $self->_link_text_for_file(
            $wiki,
            $file,
            $filename,
        );
    }

    return {
        file => $file,
        text => $display_text,
        wiki => $wiki,
    };
}

sub _link_text_for_file {
    my $self     = shift;
    my $wiki     = shift;
    my $file     = shift;
    my $filename = shift;

    return loc( '(Link to non-existent file - %1)', $filename ) unless $file;

    my $text = $file->filename();

    $text .= ' (' . $wiki->title() . ')'
        unless $wiki->wiki_id() == $self->_wiki()->wiki_id();

    return $text;
}

# These classes may in turn load other classes which use this role, so they
# need to be loaded after the role is defined.
require Silki::Schema::File;
require Silki::Schema::Page;
require Silki::Schema::Wiki;

1;

# ABSTRACT: A role which resolves page/file/image links from wikitext

__END__
=pod

=head1 NAME

Silki::Markdent::Role::WikiLinkResolver - A role which resolves page/file/image links from wikitext

=head1 VERSION

version 0.15

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

