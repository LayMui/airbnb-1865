class Review < ApplicationRecord
  belongs_to :booking
  belongs_to :user
  
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :comment, presence: true
  validates :booking, uniqueness: true # One review per booking
  validate :booking_completed?
  
  private
  
  def booking_completed?
    if booking && booking.end_date > Time.current
      errors.add(:booking, "can't be reviewed until after check-out")
    end
  end
end
