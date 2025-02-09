class AddLocationToListings < ActiveRecord::Migration[7.1]
  def change
    add_reference :listings, :location, null: false, foreign_key: true
  end
end
