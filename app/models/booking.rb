class Booking < ApplicationRecord
    belongs_to :user
    belongs_to :listing

    validates :start_date, :end_date, :number_of_guests, presence: true
end
