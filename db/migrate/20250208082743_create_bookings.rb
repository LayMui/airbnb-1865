class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.string :booking_reference
      t.references :user, null: false, foreign_key: true
      t.references :listing, null: false, foreign_key: true
      t.datetime :start_date
      t.datetime :end_date
      t.string :confirmation_status
      t.integer :number_of_guests

      t.timestamps
    end
  end
end
