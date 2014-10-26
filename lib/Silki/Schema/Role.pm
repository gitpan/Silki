package Silki::Schema::Role;
BEGIN {
  $Silki::Schema::Role::VERSION = '0.01';
}

use strict;
use warnings;
use namespace::autoclean;

use Silki::Schema;

use Fey::ORM::Table;
use MooseX::ClassAttribute;

has_policy 'Silki::Schema::Policy';

has_table( Silki::Schema->Schema()->table('Role') );

# For i18n purposes:
# loc( 'Guest' )
# loc( 'Authenticated' )
# loc( 'Member' )
# loc( 'Admin' )

for my $role (qw( Guest Authenticated Member Admin )) {
    class_has $role => (
        is      => 'ro',
        isa     => 'Silki::Schema::Role',
        lazy    => 1,
        default => sub { __PACKAGE__->_CreateOrFindRole($role) },
    );
}

sub _CreateOrFindRole {
    my $class = shift;
    my $name  = shift;

    my $role = eval { $class->new( name => $name ) };

    $role ||= $class->insert( name => $name );

    return $role;
}

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: Represents a role

__END__
=pod

=head1 NAME

Silki::Schema::Role - Represents a role

=head1 VERSION

version 0.01

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

