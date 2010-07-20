package Silki::Formatter::WikiToHTML;
BEGIN {
  $Silki::Formatter::WikiToHTML::VERSION = '0.10';
}

use strict;
use warnings;
use namespace::autoclean;

use Encode qw( decode );
use Markdent::Handler::HTMLFilter;
use Markdent::Parser;
use Silki::Markdent::Dialect::Silki::BlockParser;
use Silki::Markdent::Dialect::Silki::SpanParser;
use Silki::Markdent::Handler::HTMLStream;

use Moose;
use MooseX::StrictConstructor;

has _user => (
    is       => 'ro',
    isa      => 'Silki::Schema::User',
    required => 1,
    init_arg => 'user',
);

has _page => (
    is       => 'ro',
    isa      => 'Silki::Schema::Page',
    init_arg => 'page',
);

has _wiki => (
    is       => 'ro',
    isa      => 'Silki::Schema::Wiki',
    required => 1,
    init_arg => 'wiki',
);

sub wiki_to_html {
    my $self = shift;
    my $text = shift;

    my $buffer = q{};
    open my $fh, '>:utf8', \$buffer;

    my $html = Silki::Markdent::Handler::HTMLStream->new(
        output => $fh,
        ( $self->_page() ? ( page => $self->_page() ) : () ),
        wiki => $self->_wiki(),
        user => $self->_user()
    );

    my $filter = Markdent::Handler::HTMLFilter->new( handler => $html );

    my $parser = Markdent::Parser->new(
        dialect => 'Silki::Markdent::Dialect::Silki',
        handler => $filter,
    );

    $parser->parse( markdown => $text );

    return decode( 'utf8', $buffer );
}

__PACKAGE__->meta()->make_immutable();

1;

# ABSTRACT: Turns wikitext into HTML


__END__
=pod

=head1 NAME

Silki::Formatter::WikiToHTML - Turns wikitext into HTML

=head1 VERSION

version 0.10

=head1 AUTHOR

  Dave Rolsky <autarch@urth.org>

=head1 COPYRIGHT AND LICENSE

This software is Copyright (c) 2010 by Dave Rolsky.

This is free software, licensed under:

  The GNU Affero General Public License, Version 3, November 2007

=cut

