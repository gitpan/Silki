package Silki::Markdent::Handler::HeaderCount;
BEGIN {
  $Silki::Markdent::Handler::HeaderCount::VERSION = '0.08';
}

use strict;
use warnings;
use namespace::autoclean;

use Silki::Types qw( Int );

use Moose;
use MooseX::SemiAffordanceAccessor;
use MooseX::StrictConstructor;

with 'Markdent::Role::Handler';

has count => (
    traits   => ['Counter'],
    is       => 'ro',
    isa      => Int,
    init_arg => undef,
    default  => 0,
    handles  => {
        _saw_header => 'inc',
    },
);

sub handle_event {
    my $self  = shift;
    my $event = shift;

    return unless $event->isa('Markdent::Event::StartHeader');

    $self->_saw_header if $event->level() <= 4;

    return;
}

__PACKAGE__->meta()->make_immutable();

1;


__END__
=pod

=head1 NAME

Silki::Markdent::Handler::HeaderCount

=head1 VERSION

version 0.08

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

