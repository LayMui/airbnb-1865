class AddAddressToListings < ActiveRecord::Migration[7.1]
  def change
    add_column :listings, :address, :text
  end
end
