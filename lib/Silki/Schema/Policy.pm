package Silki::Schema::Policy;
BEGIN {
  $Silki::Schema::Policy::VERSION = '0.05';
}

use strict;
use warnings;

use DateTime::Format::Pg;
use Lingua::EN::Inflect qw( PL_N );
use Scalar::Util qw( blessed );

use Fey::ORM::Policy;

transform_all
    matching { $_[0]->name() =~ /_datetime$/ }
    => deflate {
        blessed $_[1] && $_[1]->isa('DateTime')
            ? DateTime::Format::Pg->format_datetime( $_[1] )
            : $_[1];
    }
    => inflate {
        return $_[1] unless defined $_[1];
        my $dt = DateTime::Format::Pg->parse_datetime( $_[1] );
        $dt->set_time_zone('UTC');
        return $dt;
    };

transform_all
    matching { $_[0]->name() =~ /_date$/ } =>
    deflate {
        blessed $_[1] && $_[1]->isa('DateTime')
            ? DateTime::Format::Pg->format_date( $_[1] )
            : $_[1];
    }
    => inflate {
        return $_[1] unless defined $_[1];
        my $dt = DateTime::Format::Pg->parse_date( $_[1] );
        $dt->set_time_zone('UTC');
        return $dt;
    };

has_one_namer {
    my $name = $_[0]->name();
    my @parts = map {lc} ( $name =~ /([A-Z][a-z]+)/g );

    return join q{_}, @parts;
};

has_many_namer {
    my $name = $_[0]->name();
    my @parts = map {lc} ( $name =~ /([A-Z][a-z]+)/g );

    $parts[-1] = PL_N( $parts[-1] );

    return join q{_}, @parts;
};

1;

# ABSTRACT: A Fey::Policy for Silki

__END__
=pod

=head1 NAME

Silki::Schema::Policy - A Fey::Policy for Silki

=head1 VERSION

version 0.05

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut
