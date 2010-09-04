package Silki::Schema::AccountAdmin;
BEGIN {
  $Silki::Schema::AccountAdmin::VERSION = '0.13';
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

__END__


