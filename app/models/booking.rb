class Booking < ApplicationRecord
    belongs_to :user
    belongs_to :listing
    has_one :review, dependent: :destroy

    validates :start_date, :end_date, :number_of_guests, presence: true

    def reviewable?
        end_date < Time.current && !review.present?
    end
end
