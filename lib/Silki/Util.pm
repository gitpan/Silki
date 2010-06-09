package Silki::Util;
BEGIN {
  $Silki::Util::VERSION = '0.08';
}

use strict;
use warnings;

use Exporter qw( import );

our @EXPORT_OK = qw( string_is_empty studly_to_calm english_list );

sub string_is_empty {
    return 1 if !defined $_[0] || !length $_[0];
    return 0;
}

sub english_list {
    return $_[0] if @_ <= 1;

    return join ' and ', @_ if @_ == 2;

    my $last = pop @_;

    return ( join ', ', @_ ) . ', and ' . $last;
}

1;

# ABSTRACT: A utility module

__END__
=pod

=head1 NAME

Silki::Util - A utility module

=head1 VERSION

version 0.08

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

