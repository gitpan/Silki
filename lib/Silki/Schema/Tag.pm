package Silki::Schema::Tag;
BEGIN {
  $Silki::Schema::Tag::VERSION = '0.02';
}

use strict;
use warnings;
use namespace::autoclean;

use Silki::Schema;
use URI::Escape qw( uri_escape );

use Fey::ORM::Table;

with 'Silki::Role::Schema::URIMaker';

my $Schema = Silki::Schema->Schema();

{
    has_policy 'Silki::Schema::Policy';

    has_table( $Schema->table('Tag') );

    has_one wiki => (
        table   => $Schema->table('Wiki'),
        handles => ['domain'],
    );
}

sub _base_uri_path {
    my $self = shift;

    return $self->wiki()->_base_uri_path() . '/tag/' . uri_escape( $self->tag() );
}

sub serialize {
    my $self = shift;

    return {
        tag_id => $self->tag_id(),
        tag    => $self->tag(),
        uri    => $self->uri(),
    };
}

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: Represents a tag

__END__
=pod

=head1 NAME

Silki::Schema::Tag - Represents a tag

=head1 VERSION

version 0.02

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

