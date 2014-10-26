package Silki::Markdent::Event::FileLink;
BEGIN {
  $Silki::Markdent::Event::FileLink::VERSION = '0.03';
}

use strict;
use warnings;
use namespace::autoclean;

use Markdent::Types qw( Str );

use Moose;
use MooseX::StrictConstructor;

has link_text => (
    is       => 'ro',
    isa      => Str,
    required => 1,
);

has display_text => (
    is        => 'ro',
    isa       => Str,
    predicate => 'has_display_text',
);

with 'Markdent::Role::Event';

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: Represents a link to a file

__END__
=pod

=head1 NAME

Silki::Markdent::Event::FileLink - Represents a link to a file

=head1 VERSION

version 0.03

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

