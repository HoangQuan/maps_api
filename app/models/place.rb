class Place < ApplicationRecord
  geocoded_by :address
  # after_validation :geocode

  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }

  reverse_geocoded_by :latitude, :longitude

  has_many :green_tees

  accepts_nested_attributes_for :green_tees, reject_if: proc { |attributes| attributes[:longitude].blank? || attributes[:latitude].blank? }, allow_destroy: true
  # reverse_geocoded_by :latitude, :longitude, :address => :full_address

  # reverse_geocoded_by :latitude, :longitude do |obj, results|
  #   if geo = results.first
  #     obj.city    = geo.city
  #     obj.zipcode = geo.postal_code
  #     obj.country = geo.country_code
  #   end
  # end
end
