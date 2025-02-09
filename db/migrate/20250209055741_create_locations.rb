class CreateLocations < ActiveRecord::Migration[7.1]
  def change
    create_table :locations do |t|
      t.string :country_code
      t.string :country_name

      t.timestamps
    end
  end
end
