class Listing < ApplicationRecord
  has_one_attached :photo
  belongs_to :user
  has_many :availabilities
  belongs_to :location

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
