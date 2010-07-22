package Silki::Help::File;
BEGIN {
  $Silki::Help::File::VERSION = '0.11';
}

use strict;
use warnings;
use namespace::autoclean;

use File::Slurp qw( read_file );
use HTML::Entities qw( encode_entities );
use HTML::Mason::Interp;
use Silki::Types qw( ArrayRef File HashRef Str );

use Moose;
use MooseX::SemiAffordanceAccessor;

has file => (
    is       => 'ro',
    isa      => File,
    required => 1,
);

has locale_code => (
    is       => 'ro',
    isa      => Str,
    required => 1,
);

has content => (
    is       => 'ro',
    isa      => Str,
    init_arg => undef,
    lazy     => 1,
    builder  => '_build_content',
);

sub _build_content {
    my $self = shift;

    my $config = Silki::Config->new();

    my $body   = q{};
    my $interp = HTML::Mason::Interp->new(
        out_method => \$body,
        comp_root  => $self->file()->dir()->stringify(),
        data_dir =>
            $config->cache_dir()
            ->subdir( 'mason', 'help', $self->locale_code() )->stringify(),
        %{ $config->mason_config_for_help() },
    );

    $interp->exec( q{/} . $self->file()->basename() );

    return $body;
}

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: A single help file

__END__
=pod

=head1 NAME

Silki::Help::File - A single help file

=head1 VERSION

version 0.11

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

