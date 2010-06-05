package Silki::Markdent::Handler::ExtractWikiLinks;
BEGIN {
  $Silki::Markdent::Handler::ExtractWikiLinks::VERSION = '0.06';
}

use strict;
use warnings;
use namespace::autoclean;

use List::AllUtils qw( any );
use Silki::Types qw( HashRef );

use Moose;
use MooseX::SemiAffordanceAccessor;
use MooseX::StrictConstructor;

with 'Markdent::Role::Handler', 'Silki::Markdent::Role::WikiLinkResolver';

has links => (
    traits   => ['Hash'],
    is       => 'ro',
    isa      => HashRef[HashRef],
    init_arg => undef,
    default  => sub { {} },
    handles  => {
        _add_link => 'set',
    },
);

my @types = map { 'Silki::Markdent::Event::' . $_ } qw( WikiLink FileLink ImageLink );

sub handle_event {
    my $self  = shift;
    my $event = shift;

    return unless any {  $event->isa($_) } @types;

    my $link_data;
    if ( $event->isa('Silki::Markdent::Event::WikiLink') ) {
        $link_data = $self->_resolve_page_link( $event->link_text() );
    }
    else {
        $link_data = $self->_resolve_file_link( $event->link_text() );
    }

    return unless $link_data && $link_data->{wiki};

    $self->_add_link( $event->link_text() => $link_data );

    return;
}

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: Extracts all links from a Silki Markdown document

__END__
=pod

=head1 NAME

Silki::Markdent::Handler::ExtractWikiLinks - Extracts all links from a Silki Markdown document

=head1 VERSION

version 0.06

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

