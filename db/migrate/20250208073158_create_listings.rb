class CreateListings < ActiveRecord::Migration[7.1]
  def change
    create_table :listings do |t|
      t.string :name
      t.text :description
      t.integer :price
      t.boolean :active
      t.integer :capacity

      t.timestamps
    end
  end
end
