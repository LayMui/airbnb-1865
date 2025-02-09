class Listing < ApplicationRecord
  has_one_attached :photo
  belongs_to :user
  has_many :availabilities
  belongs_to :location
end
