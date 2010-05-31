package Silki::Schema::PageFileLink;
BEGIN {
  $Silki::Schema::PageFileLink::VERSION = '0.03';
}

use strict;
use warnings;
use namespace::autoclean;

use Silki::Schema;

use Fey::ORM::Table;

has_policy 'Silki::Schema::Policy';

has_table( Silki::Schema->Schema()->table('PageFileLink') );

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: Represents a link from a page to a file

__END__
=pod

=head1 NAME

Silki::Schema::PageFileLink - Represents a link from a page to a file

=head1 VERSION

version 0.03

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

