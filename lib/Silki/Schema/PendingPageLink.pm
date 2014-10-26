package Silki::Schema::PendingPageLink;
{
  $Silki::Schema::PendingPageLink::VERSION = '0.28';
}

use strict;
use warnings;
use namespace::autoclean;

use Silki::Schema;

use Fey::ORM::Table;

has_policy 'Silki::Schema::Policy';

has_table( Silki::Schema->Schema()->table('PendingPageLink') );

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: Represents a link to a page which does not yet exist

__END__
=pod

=head1 NAME

Silki::Schema::PendingPageLink - Represents a link to a page which does not yet exist

=head1 VERSION

version 0.28

=head1 AUTHOR

Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2011 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

