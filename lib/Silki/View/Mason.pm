package Silki::View::Mason;
BEGIN {
  $Silki::View::Mason::VERSION = '0.02';
}

use strict;
use warnings;

use base 'Catalyst::View::Mason';

{
    package Silki::Mason::Web;
BEGIN {
  $Silki::Mason::Web::VERSION = '0.02';
}

    use Data::Dumper;
    use HTML::Entities qw( encode_entities );
    use Lingua::EN::Inflect qw( PL_N );
    use Number::Format qw( format_bytes );
    use Silki::I18N qw( loc );
    use Silki::Util qw( string_is_empty english_list );
    use Silki::URI qw( static_uri );
    use URI::Escape qw( uri_escape );
}

# used in templates
use HTML::FillInForm;
use Markdent::Simple::Fragment;
use Path::Class;
use Silki::Config;
use Silki::Web::Form;
use Silki::Web::FormData;
use Silki::Util qw( string_is_empty );

{
    my $config = Silki::Config->new()->mason_config();
    $config->{escape_flags} = { nbsp => \&_nbsp_escape };

    __PACKAGE__->config($config);
}

sub _nbsp_escape {
    ${ $_[0] } =~ s/ /&nbsp;/g;

    return;
}

# sub new
# {
#     my $class = shift;

#     my $self = $class->SUPER::new(@_);

# #    Silki::Util::chown_files_for_server( $self->template()->files_written() );

#     return $self;
# }

sub has_template_for_path {
    my $self = shift;
    my $path = shift;

    return -f file(
        $self->config()->{comp_root},
        ( grep { !string_is_empty($_) } split /\//, $path ),
    );
}

1;

# ABSTRACT: A Mason-based view

__END__
=pod

=head1 NAME

Silki::View::Mason - A Mason-based view

=head1 VERSION

version 0.02

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

