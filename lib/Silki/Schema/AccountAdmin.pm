package Silki::Schema::AccountAdmin;
BEGIN {
  $Silki::Schema::AccountAdmin::VERSION = '0.06';
}

use strict;
use warnings;
use namespace::autoclean;

use Silki::Schema;

use Fey::ORM::Table;

has_policy 'Silki::Schema::Policy';

my $Schema = Silki::Schema->Schema();

has_table( $Schema->table('AccountAdmin') );

__PACKAGE__->meta()->make_immutable();

1;



=pod

=head1 NAME

Silki::Schema::AccountAdmin

=head1 VERSION

version 0.06

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut


__END__


