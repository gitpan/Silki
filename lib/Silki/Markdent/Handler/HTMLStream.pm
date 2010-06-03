package Silki::Markdent::Handler::HTMLStream;
BEGIN {
  $Silki::Markdent::Handler::HTMLStream::VERSION = '0.05';
}

use strict;
use warnings;
use namespace::autoclean;

use MooseX::Params::Validate qw( validated_list );
use Silki::I18N qw( loc );
use Silki::Schema::Page;
use Silki::Schema::Permission;
use Silki::Types qw( Bool Str );

use Moose;
use MooseX::SemiAffordanceAccessor;
use MooseX::StrictConstructor;

extends 'Markdent::Handler::HTMLStream::Fragment';

with 'Silki::Markdent::Role::WikiLinkResolver';

has for_editor => (
    is      => 'ro',
    isa     => Bool,
    default => 0,
);

has _user => (
    is       => 'ro',
    isa      => 'Silki::Schema::User',
    required => 1,
    init_arg => 'user',
);

sub wiki_link {
    my $self = shift;
    my ( $link, $display_text ) = validated_list(
        \@_,
        link_text    => { isa => Str },
        display_text => { isa => Str, optional => 1 },
    );

    my $link_data = $self->_resolve_page_link( $link, $display_text );

    $self->_link_to_page($link_data);

    return;
}

sub _link_to_page {
    my $self = shift;
    my $p    = shift;

    unless ( $p->{page} || $p->{wiki} ) {
        $self->_stream()->text( $p->{text} );
        return;
    }

    my $page = $p->{page};

    if ( $self->for_editor() ) {
        $page ||= Silki::Schema::Page->new(
            page_id     => 0,
            wiki_id     => $p->{wiki}->wiki_id(),
            title       => $p->{title},
            uri_path    => Silki::Schema::Page->TitleToURIPath( $p->{title} ),
            _from_query => 1,
        );
    }

    my $uri
        = $page
        ? $page->uri()
        : $p->{wiki}
        ->uri( view => 'new_page_form', query => { title => $p->{title} } );

    my $class = $page ? 'existing-page' : 'new-page';

    $self->_stream()->tag( a => ( href => $uri, class => $class ) );
    $self->_stream()->text( $p->{text} );
    $self->_stream()->tag('_a');

}

sub file_link {
    my $self = shift;
    my ( $link, $display_text ) = validated_list(
        \@_,
        link_text    => { isa => Str },
        display_text => { isa => Str, optional => 1 },
    );

    my $link_data = $self->_resolve_file_link( $link, $display_text );

    $self->_link_to_file($link_data);

    return;
}

sub image_link {
    my $self = shift;
    my $link = validated_list(
        \@_,
        link_text => { isa => Str },
    );

    my $link_data = $self->_resolve_file_link($link);

    if (   $link_data->{file}
        && $link_data->{file}->is_browser_displayable_image() ) {

        $self->_link_to_file( $link_data, undef, 'as image' );
    }
    else {
        $self->_link_to_file($link_data);
    }

    return;
}

sub _link_to_file {
    my $self         = shift;
    my $p            = shift;
    my $display_text = shift;
    my $as_image     = shift;

    my $file = $p->{file};

    unless ( defined $file ) {
        $self->_stream()->text( $p->{text} );
        return;
    }

    unless (
        $self->_user()->has_permission_in_wiki(
            wiki       => $file->wiki(),
            permission => Silki::Schema::Permission->Read(),
        )
        ) {

        $self->_stream()->text( loc('Inaccessible file') );
        return;
    }

    my $file_uri = $file->uri();

    my $title
        = $file->is_displayable_in_browser()
        ? loc('View this file')
        : loc('Download this file');

    $self->_stream()->tag(
        a => (
            href  => $file_uri,
            title => $title,
        )
    );

    if ($as_image) {
        $self->_stream->tag(
            img => (
                src => $file->uri( view => 'small' ),
                alt => $file->filename(),
            ),
            '/', # XXX - should fix HTML::Stream to not need this
        );
    }
    else {
        $self->_stream()->text( $p->{text} );
    }

    $self->_stream()->tag('_a');
}

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: A subclass of Markdent::Handler::HTMLStream which handles Silki-specific markup

__END__
=pod

=head1 NAME

Silki::Markdent::Handler::HTMLStream - A subclass of Markdent::Handler::HTMLStream which handles Silki-specific markup

=head1 VERSION

version 0.05

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut
